const express = require("express");
const app = express();
const cors = require("cors");
const rout = require("./router/product");
const addstock = require("./router/addstock");
const addsale = require("./router/addsales");
const connectdb = require("./util/db");


app.use(cors());
app.use(express.json());


app.use("/api/product", rout);
app.use("/api/addstock", addstock);
app.use("/api/addsales", addsale);
const PORT = 5510;

connectdb().then(() => {
    app.listen(PORT, () => {
        console.log('serev is running at: ' + PORT);
    });
});