require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

const sequelize = require("./db");
const models = require("./models/models");
const router = require("./routes/router");
const ErrorMiddleware = require("./middleware/ErrorHandlingMiddleware");

const app = express();
const PORT = process.env.API_PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);
app.use(ErrorMiddleware);

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`SERVER STARTED ON PORT: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

startServer();
