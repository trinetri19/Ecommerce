const Product = require('../models/productModel');
const ErrorHandler = require('../utils/ErrorHandler')
const WrapAsync = require('../middlerware/catchAsyncError');
const ApiFeature = require('../utils/apiFeature');
// create product --admin

exports.createProduct = WrapAsync(async (req, res, next) => {
      req.body.user = req.user;
      const product = await Product.create(req.body);
      res.status(201).json({
            success: true,
            product,
      })

})
// get all products
exports.getAllProducts = WrapAsync(async (req, res) => {
      const resultPerPage = 5;
      const productCount = await Product.countDocuments();
      const apiFeature = new ApiFeature(Product.find(), req.query).search().filter().pagination(resultPerPage)
      const products = await apiFeature.query;
      res.status(200).json({
            success: true,
            products,
            productCount
      })
})
// get product details

exports.getProductsDetails = WrapAsync(async (req, res, next) => {
      let product = await Product.findById(req.params.id);
      if (!product) {
            return next(new ErrorHandler(404, "Product Not found"))
      }
      res.status(200).json({
            success: true,
            product

      })
})

// update route
exports.updateProduct = WrapAsync(async (req, res, next) => {
      let product = await Product.findById(req.params.id);
      if (!product) {
            return next(new ErrorHandler(404, "Product Not found"))
      }
      product = await Product.findByIdAndUpdate(req.params.id, req.body,
            {
                  new: true,
                  runValidators: true,
                  useFindAndModify: false

            })
      res.status(200).json({
            success: true,
            product
      })

})
// delete Product
exports.deleteProduct = WrapAsync(async (req, res, next) => {
      let product = await Product.findByIdAndDelete(req.params.id, req.body, {
            runValidators: true,
            new: true,
            useFindAndModify: false
      })
      res.status(200).json({
            success: true,
            message: "Deleted Product",
            product
      })
})
// create review
exports.createProductReview = WrapAsync(async (req, res) => {
      const { rating, comment, productId } = req.body

      const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            Comments: comment,
      }

      const product = await Product.findById(productId);
      const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString());

      if (isReviewed) {
            product.reviews.forEach(rev => {
                  if (rev.user.toString() === req.user._id.toString()) {
                        (rev.rating = rating),
                              (rev.Comments = comment)
                  }
            })
      } else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length
      }
      let avg = 0;
      product.reviews.forEach(rev => {
            avg += rev.rating
      })
      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false })
      res.status(200).json({
            success: true,
      })
})
// get all Review
exports.getAllReviews = WrapAsync(async (req, res, next) => {

      const product = await Product.findById(req.query.id);

      if (!product) {
            return next(new ErrorHandler(`Product not found`, 404))
      }
   console.log(product)
      res.status(200).json({
            success: true,
            reviews: product.reviews
      })
})
// delete Review
exports.deleteReview = WrapAsync(async (req, res,next) => {
      const product = await Product.findById(req.query.productId);

      if (!product) {
            return next(new ErrorHandler(`Product not found`, 404))
      }

      const reviews = product.reviews.filter(
            (rev) => rev._id.toString() !== req.query.id.toString()
      )
      let avg = 0;

      reviews.forEach(rev => {
            avg += rev.rating
      })
      const ratings = avg / product.reviews.length;

      const numOfReviews = reviews.length;

      await Product.findByIdAndUpdate(req.query.productId,{
            reviews,
            ratings,
            numOfReviews,
      },
            {
                  new:true,
                  runValidators:true,
                  userFindAndModify:false,

            }
      )
      res.status(200).json({
            success: true,
      })
}) 
