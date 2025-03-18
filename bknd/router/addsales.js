const express = require("express");
const app = express.Router();
const { add, getfive } = require("../controller/addsale");

app.route("/add").post(add);
app.route("/getfivesale").get(getfive);

module.exports = app;