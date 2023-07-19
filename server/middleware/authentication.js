require("dotenv").config();
const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(403).json({ code: 403, message: "Chýba token!" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({ code: 401, message: "Neplatný token!" });
  }
  return next();
};

module.exports = authUser;
