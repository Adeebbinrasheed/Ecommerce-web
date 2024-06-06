const express = require("express");
const connectDb = require("./Db/connectDb");
const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
const app = express();
require("dotenv").config({ path: "Config/.env" });

app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));

//error handling
const ErrorMiddleware = require("./middlewares/error");
app.use(ErrorMiddleware);

//routes
const userRoutes = require("./routes/user");

app.use("/api/user", userRoutes);

//mongodb database
connectDb();

//server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is listening on port ${port}`));
