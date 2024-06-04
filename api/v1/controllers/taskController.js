const Task = require("../models/taskModel");
const paginationHelper = require("../../../helpers/paginationHelper");

//[GET] /api/v1/tasks
module.exports.index = async (req, res) => {
  try {
    // FIND
    const find = {
      deleted: false,
    };
    if (req.query.status) {
      find.status = req.query.status;
    }
    //END FIND

    // PAGINATION
    let initPagination = {
      currentPage: 1,
      limitItems: 1,
    };
    const countTasks = await Task.countDocuments(find);
    const objectPagination = paginationHelper(
      initPagination,
      req.query,
      countTasks
    );
    // END PAGINATION

    // SORT
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    }
    // END SORT

    const task = await Task.find(find)
      .sort(sort)
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip);
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
