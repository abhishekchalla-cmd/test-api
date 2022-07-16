const express = require("express");
const app = express();

const todoRoutes = require("./src/todo-routes");

app.use(express.json());

app.use("/todo", todoRoutes);

app.listen(3000);
