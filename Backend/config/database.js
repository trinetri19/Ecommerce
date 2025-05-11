const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({path:'Backend/config/config.env'});


 let database=()=> {
 mongoose.connect(process.env.mongodb_Url).then((data)=>{
    console.log(`database is running on server ${data.connection.host}`)
 }).catch((e)=>console.log(e))   
}

module.exports = database;