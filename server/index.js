const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();
const mongoose = require("./config/mongoConnect.js");

const userModel = require("./models/userModel.js");
const todoModel = require("./models/todoModel.js");

app.use(express.json(), cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Server funguje!" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const check = await userModel.findOne({
      username: username,
      password: password,
    });

    if (check) {
      res.json({ userId: check._id });
    } else {
      res.json("notexist");
    }
  } catch (error) {
    res.json("error");
  }
});

app.post("/register", async (req, res) => {
  const { email, password, username } = req.body;

  const data = {
    email: email,
    password: password,
    username: username,
  };

  try {
    const check = await userModel.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await userModel.insertMany([data]);
    }
  } catch {
    res.json("notexist");
  }
});

app.post("/todos", async (req, res, next) => {
  const { text, completed, userId } = req.body;

  const data = {
    text: text,
    completed: completed,
    userId: userId,
  };

  try {
    const todo = await todoModel.create(data);
    res.status(201).json(todo);
  } catch (err) {
    next({ status: 400, message: "Nepodarilo se vytvoriť ToDo položku" });
  }
});

app.get("/todos", async (req, res, next) => {
  try {
    const { completed } = req.query;

    let todos;
    if (completed === "true") {
      todos = await todoModel.find({ completed: true });
    } else if (completed === "false") {
      todos = await todoModel.find({ completed: false });
    } else {
      todos = await todoModel.find();
    }

    res.status(200).json(todos);
  } catch (err) {
    next({ status: 500, message: "Nepodarilo sa načítať ToDo položky" });
  }
});

app.delete("/todos/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await todoModel.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (err) {
    next({ status: 500, message: "Nepodarilo sa odstrániť ToDo položku" });
  }
});

app.put("/todos/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedTodo = req.body;
    await todoModel.findByIdAndUpdate(id, updatedTodo);
    res.sendStatus(204);
  } catch (err) {
    next({ status: 500, message: "Nepodarilo sa aktualizovať ToDo položku" });
  }
});

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "Niečo sa nepodarilo...",
  });
});

app.listen(PORT, () => {
  console.log(`Server beží na porte ${PORT}`);
});
