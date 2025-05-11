const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/ErrorHandler')
const WrapAsync = require('../middlerware/catchAsyncError')

// create new Order
exports.newOrder = WrapAsync(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id,
    })

    res.status(200).json({
        success:true,
        order
    })
})

exports.getSingleOrder = WrapAsync(async (req,res,next)=>{
const order = Order.findById(req.params.id).populate("user","name email")

if(!order){
    return next(new ErrorHandler(`Order not found`,400)); 
}
res.status(200).json({
    success:true,
    order
})

})

// get logged in user
exports.myOrder = WrapAsync(async (req,res,next)=>{
    const orders = Order.find({user: req.user._id})
    
    if(!orders){
        return next(new ErrorHandler(`Order not found`,400)); 
    }
    res.status(200).json({
        success:true,
        orders
    })
    
    })
// get All order --Admin
    exports.getAllOrders = WrapAsync(async (req,res,next)=>{
            const orders = await Order.find();
            let totalAmount = 0;
            orders.forEach(order =>{
               totalAmount += order.totalPrice;
            })

            res.status(200).json({
                success:true,
                totalAmount,
                orders,
            })
    });

    // update order status  --Admin
    exports.updateOrder = WrapAsync(async (req,res,next)=>{
        const order = await Order.findById(req.params.id);
        if(!order){
            return next(new ErrorHandler(`Order is not found`,404));
           }
        if(order.orderStatus === "Delivered"){
            return next(new ErrorHandler("You have delivered this order",400))
        }
        order.orderItems.forEach(async (o) =>{
            await updateStock(o.product,o.quantity)
        })
        order.orderStatus = req.body.status;
        if(req.body.status === "Delivered"){
            order.deliveredAt = Date.now();
        }
       
        await order.save({validateBeforeSave:false})
        res.status(200).json({
            success:true,
            order,
        })
});

async function updateStock(id,quantity){
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({validateBeforeSave:false});
}


// delete Order --Admin
exports.deleteOrder = WrapAsync(async (req,res,next)=>{
    const order = await Order.findById(req.params.id);
   if(!order){
    return next(new ErrorHandler(`Order is not found`,404));
   }
   await order.remove()
    res.status(200).json({
        success:true,
        order,
    })
});
