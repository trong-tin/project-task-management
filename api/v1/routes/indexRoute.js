const taskRoute = require("./taskRoute");

module.exports = (app) => {
  const version = "/api/v1";
  app.use(version + "/tasks", taskRoute);
};
