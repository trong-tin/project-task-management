const express = require("express");
const router = express.Router();
const Task = require("../../../models/taskModel");

router.get("/", async (req, res) => {
  const task = await Task.find({
    deleted: false,
  });
  res.json(task);
});

router.get("/detail/:id", async (req, res) => {
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

module.exports = router;
