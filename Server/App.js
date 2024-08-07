const express = require("express");
const connectDb = require("./Db/connectDb");
const cookieParser = require("cookie-parser");
const cors=require('cors')
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config({ path: "Config/.env" });

app.use(express.json());
app.use(cors())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


//routes
const userRoutes = require("./routes/user");
const productRoutes=require('./routes/product')
const cartRoutes=require('./routes/cart')
const addressRoute=require('./routes/address')
const orderRouter=require('./routes/order')
app.use('/uploads',express.static('uploads'))


app.use("/api/user", userRoutes);
app.use('/api/product',productRoutes)
app.use('/api/cart',cartRoutes)
app.use('/api/address',addressRoute)
app.use("/api/order",orderRouter)

//mongodb database
connectDb();

//server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is listening on port ${port}`));
