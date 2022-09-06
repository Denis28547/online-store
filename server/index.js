const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./db");
const models = require("./models/models");

const app = express();
const PORT = process.env.API_PORT || 5000;

app.use(express.json());
app.use(cors);

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
