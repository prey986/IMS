const addstock = require("../models/addstock");
const product = require("../models/product");
const purchasestock = async (productid, purchasequantity) => {
    try {
        const mydata = await product.findOne({_id:productid});
        let mystock = parseInt(mydata.stock) + parseInt(purchasequantity);
        const Purchasestock = await product.findByIdAndUpdate(
            productid, {
            stock: mystock,
        },
            {
                new: true
            }
        );
        console.log(Purchasestock);
    } catch (error) {
        console.log("error in assing product stock", error);
    }
}

module.exports = purchasestock;