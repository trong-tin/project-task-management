const express = require("express");
const database = require("./config/database");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
database.connect();
const Task = require("./models/taskModel");
app.get("/tasks", async (req, res) => {
  const task = await Task.find({
    deleted: false,
  });
  res.json(task);
});

app.get("/tasks/detail/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOne({
      _id: id,
      deleted: false,
    });
    res.json(task);
  } catch (error) {
    res.json("Không tìm thấy");
  }
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
