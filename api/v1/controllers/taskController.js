const Task = require("../models/taskModel");

//[GET] /api/v1/tasks
module.exports.index = async (req, res) => {
  try {
    const find = {
      deleted: false,
    };
    if (req.query.status) {
      find.status = req.query.status;
    }
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    }
    const task = await Task.find(find).sort(sort);
    res.json(task);
  } catch (error) {
    res.json("Không tìm thấy");
  }
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
