const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const Schema = mongoose.Schema;
const userSchema = new Schema({
username:{
    type:String,
    required:[true,"Enter your name"],
    maxLength:[30,"Cannot not Exceed"],
    minLength:[4,"More than 4 Charactors"]
},
email:{
    type:String,
    required:[true,"Enter your email"],
    unique:true,
    validate:[validator.isEmail,"Please Enter valid Email"]
},password:{
    type:String,
    required:[true,"Enter your Password"],
    maxLength:[20,"Cannot not Exceed"],
    select:false
},
avatar:{
    public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
  },role:{
    type:String,
    default:"user"
  },
  resetPasswordToken:String,
  resetPasswordExpire:Date,
});
  userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
     this.password = await bcrypt.hash(this.password,10)

})

// cookie
userSchema.methods.getJWTToken = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
     expiresIn:process.env.JWT_EXPIRE,
    })
}
// compare password to login
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}
// Reset password
userSchema.methods.getResetPasswordToken = function (){
    // Generating token
    const resetToken = crypto.randomBytes(20).toString("hex");
    // hashing resetToken and adding to user Schema
   this.resetPasswordToken  =  crypto.createHash("sha256").update(resetToken).digest("hex")
   this.resetPasswordExpire = Date.now() *  15 *60 *1000;  //expires in 15 minutes

   return resetToken;
}

module.exports = mongoose.model("User",userSchema);