import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mysql from "mysql";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import httpErrors from "http-errors";

import indexRoute from "./routes/index.js";
import userRoute from "./routes/user.js";

let database;
// creating connection with mysql
database = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
});

//trying to connect to database
database.connect((err) => {
    if (err) {
        throw err;
    }
    console.log(`Connected to database ${process.env.DB_NAME}`);
    //making database as global variable to use in other modules
    global.database = database;
});

const app = express();
//it helps to parse incoming JSON data from HTTP requests
app.use(express.json());
// It parses incoming requests with URL-encoded payloads and is based on a body parser
app.use(
    express.urlencoded({
        extended: false,
    })
);
//helps to parse cookies attached to the client request
app.use(cookieParser());
//handling request from origins
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
//adding middleware to log all the requests using morgan module
app.use(morgan("dev"));
//routes configured with their prefix
app.use("/", indexRoute);
app.use("/user", userRoute);

// catch 404 and forward to error handler --> http-errors
app.use(function (req, res, next) {
    next(httpErrors(404));
});
const PORT = process.env.PORT || 3000;
//starting listening server using express
app.listen(PORT, () => {
    console.log(`Server started at ${PORT} in ${process.env.ENV} environment`)
});

export default app; 