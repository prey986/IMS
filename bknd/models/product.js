const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({

    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },

}, { timestamps: true });

const Product = new mongoose.model("Products", productSchema);
module.exports = Product;