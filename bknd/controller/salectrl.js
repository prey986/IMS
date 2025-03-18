const product = require("../models/product");
const salectrl = async (productid, salequantity) => {
    try {
        const mydata = await product.findOne({ _id: productid });
        let mystock = parseInt(mydata.stock) - parseInt(salequantity);
        const addsaleproduct = await product.findByIdAndUpdate(
            productid, {
            stock: mystock,
        },
            {
                new: true
            }
        );
    } catch (error) {
        console.log("error while adding sale in product", error);
    }
}

module.exports = salectrl;