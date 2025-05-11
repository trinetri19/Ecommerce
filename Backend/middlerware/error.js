const ErrorHandler = require("../utils/ErrorHandler")

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"

    // Dupicate key Error
    if (err.code === 11000) {
        const message = `Dublicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(400, message);
    }
    // Wrong Mondodb Id Error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(400, message);
    }
    // json Web token
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is Invalid,Try Again`;
        err = new ErrorHandler(400, message);
    }


    // Jwt Expire Error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired ,Try Again`;
        err = new ErrorHandler(400, message);
    }
    
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })

}