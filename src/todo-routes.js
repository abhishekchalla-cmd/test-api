const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const fileUrl = path.resolve(__dirname, "./data/todo-data.json");
const getTodoData = () =>
  JSON.parse(fs.readFileSync(fileUrl, "utf-8").trim() || "[]");

// Fetch
router.get("/", (req, res) => {
  const todoData = getTodoData();
  res.send(todoData);
});

// Create
router.post("/", (req, res) => {
  const todoData = getTodoData();

  const payload = req.body;

  const newId =
    (todoData
      .map((t) => Number(t.id))
      .sort()
      .reverse()[0] || 0) + 1;
  const newTodo = { id: newId, ...payload };
  todoData.push(newTodo);

  fs.writeFileSync(fileUrl, JSON.stringify(todoData, null, 2));

  res.json({ success: true, data: newTodo });
});

// Update
router.put("/", (req, res) => {
  const todoData = getTodoData();

  const payload = req.body;

  const todo = todoData.find((t) => t.id === payload.id);
  if (todo) {
    Object.assign(todo, payload);

    fs.writeFileSync(fileUrl, JSON.stringify(todoData, null, 2));

    res.json({ success: true, data: todo });
  } else {
    res.json({ success: false, error: "Record doesn't exist" });
  }
});

// Delete
router.delete("/:todoId", (req, res) => {
  const { todoId } = req.params;

  const todoData = getTodoData();
  const todo = todoData.find((t) => t.id + "" === todoId);
  if (todo) {
    const index = todoData.indexOf(todo);

    todoData.splice(index, 1);

    fs.writeFileSync(fileUrl, JSON.stringify(todoData, null, 2));

    res.json({ success: true });
  } else {
    res.json({ success: false, error: "Record doesn't exist" });
  }
});

module.exports = router;
