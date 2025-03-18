const products = require("../models/product");
const product = async (req,res) => {
    try {
        console.log(req.body);
        const {code,name,price} = req.body;

        const productexist = await products.findOne({name});
        if (productexist) {
            return res.status(400).json({msg:"product exist"});
        } 
        await products.create({code,name,stock:0,price});
        res.status(200).json(req.body);
    } catch (error) {
        console.log(error);
        
    }
};

const getAllProduct = async (req,res) => {
    try {
        const getproducts = await products.find();
        res.status(200).json(getproducts);
    } catch (error) {
        console.log(error);
    }
};

const update = async (req,res) => {
    const {id}= req.params
    try {
        const updateresult = await products.findByIdAndUpdate(
            id,
            {code:req.body.code,name:req.body.name,price:req.body.price},
            {new:true}
        );
        res.status(200).json(updateresult);
    } catch (error) {
        console.log(error);
    }
};

const deleteproduct = async (req,res) => {
    try {
        const deletepro = await products.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json(deletepro);
    } catch (error) {
        console.log(error);
    }
};
module.exports = { product,getAllProduct,update,deleteproduct};