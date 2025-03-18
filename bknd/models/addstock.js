const mongoose = require("mongoose");
const addstockschema = new mongoose.Schema({
    productid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    unitprice: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    totalamount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Addstock = new mongoose.model("addstock", addstockschema);
module.exports = Addstock;