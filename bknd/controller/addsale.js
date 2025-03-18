const sale = require("../models/sales");
const salectrl = require("../controller/salectrl");
const add = async (req, res) => {
    try {
        const addsaledetails = new sale({
            productid: req.body.productid,
            code: req.body.code,
            name: req.body.name,
            customername: req.body.customername,
            customeremail: req.body.customeremail,
            quantity: req.body.quantity,
            unitprice: req.body.unitprice,
            totalamount: req.body.totalamount
        });
        addsaledetails.save().then((result) => {
            salectrl(req.body.productid, req.body.quantity);
            res.status(200).send(result);
        });
    } catch (error) {
        console.log("Error in adding product" + error);
    }
}

const getfive = async (req, res) => {
    try {
        const response = await sale.find().sort({ _id: -1 }).limit(5);
        res.status(200).json(response);
    } catch (error) {
        console.log("Error to get 5 details", error);
    }
}

module.exports = { add, getfive };