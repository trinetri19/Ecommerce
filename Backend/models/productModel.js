const { kMaxLength } = require('buffer');
const mongoose  = require('mongoose')
const Schema =  mongoose.Schema;
const User = require('./userModel')
const productSchema = new Schema({
  name:{
    type:String,
    required:[true,"Please give product name"]
  },
  description:{
    type:String,
    required:[true, 'please give product description']
  },
  price:{
    type:Number,
    required:[true, 'please give product Price'],
    maxLength:[6]
  },
  ratings:{
    type:Number,
    default:0
  },
  image:[{
    public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
  }],
  stock:{
    type:Number,
    required:[true,'Please enter porduct Stock'],
    default:1,
    maxLength:[4]
  },
  category:{
    type:String,
    required:[true,"Please enter product category"]
  },
  numOfReviews:{
    type:Number,
    default:0
  },
  reviews:[{
    user:{
      type:mongoose.Schema.ObjectId,
      ref:"User",
      required:true,
   },
    name:{
        type:String,
        // required:true
    },
    rating:{
        type:Number,
        required:true
    },
    Comments:{
        type:String,
        required:true
    }
  }],
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
 },
  createdAt:{
    type:Date,
    default:Date.now()
  }
})

const product = mongoose.model("product",productSchema);
module.exports = product
