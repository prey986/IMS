const addstock = require("../models/addstock");
const purchasestock = require("./purchasestock")
const add = async (req, res) => {
    try {
        const addstockdetails = new addstock({
            productid: req.body.productid,
            code: req.body.code,
            name: req.body.name,
            unitprice: req.body.unitprice,
            quantity: req.body.quantity,
            totalamount: req.body.totalamount
        });
        addstockdetails.save().then((result) => {
            purchasestock(req.body.productid, req.body.quantity);
            res.status(200).send(result);
        }).catch((err) => {
            res.status(401).send(err);
        });
    } catch (error) {
        console.log("Error on adding stock", error);
    }
}

const getfive = async (req, res) => {
    try {
        const response = await addstock.find().sort({ _id: -1 }).limit(5);
        res.status(200).json(response);
    } catch (error) {
        console.log("Error to get 5 details", error);
    }
}

module.exports = { add, getfive };