const ErrorHandler = require("../utils/ErrorHandler");
const WrapAsync = require("./catchAsyncError");
const jwt = require('jsonwebtoken')
const User = require("../models/userModel")

exports.isAuthenticated = WrapAsync(async (req, res, next) => {
        const { token } = req.cookies;
       
        if (!token) {
                return next(new ErrorHandler(401, "please login into this to access this"))
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET)
        
        req.user = await User.findById(decodedData.id)
        next();
})


exports.authorizedRoles = (...roles) => {
        return (req, res, next) => {
                if (!roles.includes(req.user.role)) {
                        return next(new ErrorHandler(403, `Role:${req.user.role} is not allowed to access this role`)
                        )}
                next();
        }
}
