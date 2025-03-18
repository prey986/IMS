const express = require("express");
const app = express.Router();
const { product, getAllProduct, update, deleteproduct } = require("../controller/product");

app.route("/add").post(product);
app.route("/getallproduct").get(getAllProduct);
app.route("/update/:id").put(update);
app.route("/delete/:id").get(deleteproduct);

module.exports = app;