const taskRoute = require("./taskRoute");
const userRoute = require("./userRoute");
const authMiddleware = require("../../middlewares/authMiddleware");

module.exports = (app) => {
  const version = "/api/v1";
  app.use(version + "/tasks", authMiddleware.requireAuth, taskRoute);
  app.use(version + "/users", userRoute);
};
