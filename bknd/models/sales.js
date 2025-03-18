const mongoose = require("mongoose");
const addsaleschema = new mongoose.Schema({
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
    customername: {
        type: String,
        required: true,
    },
    customeremail: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unitprice: {
        type: Number,
        required: true,
    },
    totalamount: {
        type: Number,
        required: true,
    },

}, { timestamps: true });

const Addsale = new mongoose.model("Sales", addsaleschema);
module.exports = Addsale;