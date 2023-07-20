require("dotenv").config();
const { Router } = require("express");
const userModel = require("../models/userModel.js");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const router = Router();

const saltRounds = 10;

router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const checkEmail = await userModel.findOne({ email: email });
    const checkUsername = await userModel.findOne({ username: username });

    if (checkEmail || checkUsername) {
      res.status(409).json("exist");
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          res.status(500).json("error");
        } else {
          const data = {
            email: email,
            password: hash,
            username: username,
          };

          const user = await userModel.create(data);

          const token = jwt.sign(
            { user_id: user._id },
            process.env.TOKEN_SECRET,
            {
              expiresIn: "24h",
            }
          );

          const userObject = { ...user.toObject(), token };
          res.json({ userObject, token });
        }
      });
    }
  } catch (error) {
    res.json('error');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findOne({ username: username });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: '24h',
          });

          const userObject = { userId: user._id, token: token };

          return res.status(200).json(userObject);
        } else {
          return res.status(400).json({ message: 'Nesprávne prihlasovacie údaje!' });
        }
      });
    } else {
      return res.status(400).json({ message: 'Nesprávne prihlasovacie údaje!' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Chyba servera...' });
  }
});

module.exports = router;
