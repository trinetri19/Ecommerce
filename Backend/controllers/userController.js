const User = require('../models/userModel');
const ErrorHandler = require('../utils/ErrorHandler')
const WrapAsync = require('../middlerware/catchAsyncError');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail.js')
const crypto = require('crypto')


// register user
exports.registerUser = WrapAsync(async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await User.create({
        username, email, password, avatar: {
            public_id: "Sample id",
            url: "SampleUrl"
        }
    })
    sendToken(user, 201, res);
})

// login user

exports.loginUser = WrapAsync(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorHandler(400, "Please Enter Email & password"))
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler(401, "Invalid Email or Password"))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler(401, "Invalid Email or Password"))
    }
    sendToken(user, 200, res);
})

exports.logout = WrapAsync(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(201).json({
        success: true,
        message: "Logged out"
    })
})

exports.forgetPassword = WrapAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(new ErrorHandler(404, `User not found`))
    }

    // get reset password Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Your Password reset token is : \n\n ${resetPasswordUrl} \n\n If you are not requested this please ignore it.`;


    try {
        await sendEmail({
            email: user.email,
            subject: "QuickBuy Password Recovery",
            message
        })

        res.status(200).json({
            success: true,
            message: `Email send to ${user.email} successfully`
        })


    } catch (error) {
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(500, error.message));
    }

})


// reset Password
exports.resetPassword = WrapAsync(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } })

    if (!user) {
        return next(new ErrorHandler(400, `Reset password token is invalid or has been  Expired`))
    }

    if (req.body.password != req.body.ConfirmPassword) {
        return next(new ErrorHandler(400, `Password does not Matched`))
    }
    user.password = req.body.password;

    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();

    sendToken(user, 200, res);

})

// get user Details
exports.getUserDetails = WrapAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
})


// Update Password
exports.updatePassword = WrapAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler(400, "Old password is Incorret"))
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler(400, "Password Doesn't Matched"))
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res)
})

// update Profile

exports.updateProfile = WrapAsync(async (req, res, next) => {
    const newUserData = {
        username: req.body.username,
        email: req.body.email,
        

    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})


// get all user (admin)

exports.getAllUser = WrapAsync(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})


// get single user (admin)
exports.getSingleUser = WrapAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(400, `User does not exists with id:${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// update User Role --admin

exports.updateUserRole = WrapAsync(async (req, res, next) => {
    const newUserData = {
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })


    if (!user) {
        return next(new ErrorHandler(400, `User does not exists with id:${req.params.id}`))
    }


    res.status(200).json({
        success: true,
        user
    })
})


// delete User --Admin

exports.deleteUser = WrapAsync(async (req, res, next) => {

    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler(404, `User doesn't exist with Id:${req.params.id}`))
    }

    let deletedUser = await User.findByIdAndDelete(req.params.id, req.body, {
        runValidators: true,
        new: true,
        useFindAndModify: false
    })

   


    res.status(200).json({
        success: true,
       message:"User deleted"
    })
})