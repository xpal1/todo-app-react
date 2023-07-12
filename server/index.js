const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();

const collection = require("./mongoConnect")

app.use(express.json(), cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "Server funguje!" });
  });

app.post('/login', async(req, res) => {
  const{username, password} = req.body

  try {
    const check = await collection.findOne({ username: username, password: password})

    if (check) {
      res.json("exist")
    }

    else {
      res.json("notexist")
    }
  }

  catch {
    res.json("notexist")
  }
})

app.post('/register', async(req, res) => {
  const{email, password, username} = req.body

  const data = {
    email: email,
    password: password,
    username: username
  }

  try {
    const check = await collection.findOne({ email: email})

    if (check) {
      res.json("exist")
    }

    else {
      res.json("notexist")
      await collection.insertMany([data])
    }
  }

  catch {
    res.json("notexist")
  }
})

app.listen(PORT, () => {
    console.log(`Server beží na porte ${PORT}`);
})