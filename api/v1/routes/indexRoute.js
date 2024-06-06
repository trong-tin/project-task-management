const taskRoute = require("./taskRoute");
const userRoute = require("./userRoute");
module.exports = (app) => {
  const version = "/api/v1";
  app.use(version + "/tasks", taskRoute);
  app.use(version + "/users", userRoute);
};
