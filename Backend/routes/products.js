const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductsDetails, createProductReview, getAllReviews, deleteReview } = require('../controllers/productController');
const { isAuthenticated, authorizedRoles } = require('../middlerware/authen');

const router = express.Router();

router.route('/products').get(getAllProducts);

router.route('/admin/product/new').post(isAuthenticated, authorizedRoles("admin"), createProduct);

router.route('/admin/product/:id')
    .put(isAuthenticated, authorizedRoles("admin"), updateProduct)
    .delete(isAuthenticated, authorizedRoles("admin"), deleteProduct)

router.route('/product/:id').get(getProductsDetails)

router.route('/review').put(isAuthenticated, createProductReview)

router.route('/reviews').get(getAllReviews).delete(isAuthenticated,deleteReview)

module.exports = router;