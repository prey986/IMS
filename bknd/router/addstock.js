const express = require("express");
const app = express.Router();
const { add, getfive } = require("../controller/addstock");
app.route("/add").post(add);
app.route("/getfiveaddstock").get(getfive);

module.exports = app;