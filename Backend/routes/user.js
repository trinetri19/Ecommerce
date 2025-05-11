const express = require('express');
const { registerUser, loginUser, logout,resetPassword, forgetPassword, getUserDetails, updatePassword ,updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController');
const {isAuthenticated ,authorizedRoles}= require('../middlerware/authen');
const router  = express.Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)

router.route("/password/forget").post(forgetPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/password/update').put(isAuthenticated,updatePassword)


router.route('/me').get(isAuthenticated,getUserDetails)
router.route('/me/update').put(isAuthenticated,updateProfile)

router.route('/admin/users').get(isAuthenticated,authorizedRoles("admin"),getAllUser)

router.route('/admin/user/:id')
.get(isAuthenticated,authorizedRoles("admin"),getSingleUser)
.put(isAuthenticated,authorizedRoles("admin"),updateUserRole)
.delete(isAuthenticated,authorizedRoles("admin"),deleteUser)

module.exports = router