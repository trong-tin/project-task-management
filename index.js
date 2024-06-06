const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const database = require("./config/database");
const cors = require("cors");

require("dotenv").config();

const routesApiVer1 = require("./api/v1/routes/indexRoute");

const app = express();
const port = process.env.PORT;

database.connect();

// CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Cookie-Parser
app.use(cookieParser());

// parse application/json
app.use(bodyParser.json());

//Routes Version 1
routesApiVer1(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
