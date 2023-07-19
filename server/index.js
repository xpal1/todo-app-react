require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const { log } = require("mercedlogger");
const cors = require("cors");
const { PORT = 3000 } = process.env;
const app = express();
const userRouter = require("./controllers/userController.js");
const todoRouter = require("./controllers/todoController.js");
const mongoose = require("./config/mongoConnect.js");

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json(), cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ message: "Server funguje!" });
});

app.use("/user", userRouter);
app.use("/todos", todoRouter);

app.listen(PORT, () =>
  log.green("STAV SERVERA", `Server beží na porte ${PORT}`)
);
