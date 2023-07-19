require("dotenv").config();
const { Router } = require("express");
const todoModel = require("../models/todoModel.js");
const authenticateUser = require("../middleware/authentication.js");

const router = Router();

router.post("/", authenticateUser, async (req, res, next) => {
  const { text, completed, userId } = req.body;

  const data = {
    text: text,
    completed: completed,
    userId: userId,
  };

  try {
    const todo = await todoModel.create(data);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(todo);
  } catch (err) {
    next({ status: 400, message: "Nepodarilo sa vytvoriť ToDo položku" });
  }
});

router.get("/", authenticateUser, async (req, res, next) => {
  const userId = req.user.userId;

  try {
    const { completed } = req.query;

    let todos;
    if (completed === "true") {
      todos = await todoModel.find({ userId: userId, completed: true });
    } else if (completed === "false") {
      todos = await todoModel.find({ userId: userId, completed: false });
    } else {
      todos = await todoModel.find({ userId: userId });
    }

    res.status(200).json(todos);
  } catch (err) {
    next({ status: 500, message: "Nepodarilo sa načítať ToDo položky" });
  }
});

router.delete("/:id", authenticateUser, async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user.userId;

  try {
    await todoModel.findOneAndDelete({ _id: id, userId: userId });
    res.sendStatus(204);
  } catch (err) {
    next({ status: 500, message: "Nepodarilo sa odstrániť ToDo položku" });
  }
});

router.put("/:id", authenticateUser, async (req, res, next) => {
  const id = req.params.id;
  const updatedTodo = req.body;
  const userId = req.user.userId;

  try {
    await todoModel.findOneAndUpdate({ _id: id, userId: userId }, updatedTodo);
    res.sendStatus(204);
  } catch (err) {
    next({ status: 500, message: "Nepodarilo sa aktualizovať ToDo položku" });
  }
});

module.exports = router;