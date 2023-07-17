const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const app = express();

const userModel = require("./models/userModel.js");
const todoModel = require("./models/todoModel.js");
const mongoose = require('./config/mongoConnect.js');

app.use(express.json(), cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "Server funguje!" });
  });

app.post('/login', async(req, res) => {
  const{username, password} = req.body

  try {
    const check = await userModel.findOne({ username: username, password: password})

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
    const check = await userModel.findOne({ email: email})

    if (check) {
      res.json("exist")
    }

    else {
      res.json("notexist")
      await userModel.insertMany([data])
    }
  }

  catch {
    res.json("notexist")
  }
})

app.post('/todos', async(req, res) => {
  const{text, deleted, userId} = req.body

  const todoData = {
    text: text,
    deleted: deleted,
    userId: userId
  }

  try {
    const todoCheck = await todoModel.find( todoData )

    if (todoCheck) {
      res.json("todo-exist")
    }

    else {
      res.json("todo-notexist")
      await todoModel.insertMany([todoData])
    }
  }

  catch {
    res.json("todo-notexist")
  }
})

app.put('/todos/:id', async(req, res) => {
  const{text, deleted, userId} = req.body

  const todoData = {
    text: text,
    deleted: deleted,
    userId: userId
  }

  try {
    const todoCheck = await todoModel.findOne({ text: text})

    if (todoCheck) {
      res.json("exist")
    }

    else {
      res.json("notexist")
      await todoModel.insertMany([todoData])
    }
  }

  catch {
    res.json("notexist")
  }
})

app.listen(PORT, () => {
    console.log(`Server beží na porte ${PORT}`);
})