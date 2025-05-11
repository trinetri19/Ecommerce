const express = require('express');
const { newOrder, getSingleOrder, myOrder, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { isAuthenticated, authorizedRoles } = require('../middlerware/authen');
const router = express.Router()

router.route('/order/new').post(isAuthenticated, newOrder)

router.route("/order/:id").get(isAuthenticated, authorizedRoles("admin"), getSingleOrder)

router.route("/orders/me").get(isAuthenticated, myOrder)
router.route("/admin/orders").get(isAuthenticated, authorizedRoles("admin"), getAllOrders);

router.route("/admin/order/:id").put(isAuthenticated, authorizedRoles("admin"), updateOrder).delete(isAuthenticated, authorizedRoles("admin"), deleteOrder)

module.exports = router