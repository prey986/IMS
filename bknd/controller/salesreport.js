const sale = require("../models/sales");
const getsalereport = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const response = await sale.find({
            createdAt: {
                $gte: start,
                $lte: end
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log("Error in getting sales report", error);
    }
}

module.exports = { getsalereport };