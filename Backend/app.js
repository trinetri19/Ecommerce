const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser  = require('cookie-parser')
const errorMiddleware = require("./middlerware/error.js")

const corsOptions = {
    origin:"http://localhost:5173",
    methods : "GET,POST,DELETE,PUT",
    credentials:true
}
// parser
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())

// routes import
const product = require('./routes/products.js')
const user = require('./routes/user.js')
const order = require('./routes/order.js')

// api

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);

// middleware
app.use(errorMiddleware);
  

module.exports = app;