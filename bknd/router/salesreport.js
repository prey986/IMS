const express = require("express");
const app = express.Router();
const { getsalereport } = require("../controller/salesreport");

app.route("/salesreport").get(getsalereport);

module.exports = app;