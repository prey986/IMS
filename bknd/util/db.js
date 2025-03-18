const mongoose= require("mongoose");

const URI = "mongodb://127.0.0.1:27017/IMS"
//mongoose.connect(URI);

const connectdb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("db connected successfully");
    } catch (error) {
        console.error("db connection fail");
        process.exit(0);      
    }
}


module.exports = connectdb;