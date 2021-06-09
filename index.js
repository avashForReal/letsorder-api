const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");

//FS import
const dbConn = require("./utils/dbConn");
const userRoutes = require("./routes/userRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");

//dotenv config module
dotenv.config();

//init env vars
const { PORT } = process.env;


// main async iffe
(async() => {
    //connect to db
    await dbConn();

    //initialize the app
    const app = express();

    // Express Middlewares for Body-Parser, JSON, and Logging
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan('dev'));


    //route forwarding
    app.use('/api/user/', userRoutes);
    app.use('/api/menu/', menuRoutes);
    app.use('/api/order/', orderRoutes);

    //listen to requests 
    app.listen(PORT || 8080, () => {
        console.log(`server running on port ${PORT}`);
    });

})();