const Task = require("../models/taskModel");

//[GET] /api/v1/tasks
module.exports.index = async (req, res) => {
  const task = await Task.find({
    deleted: false,
  });
  res.json(task);
};

//[GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
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
};
