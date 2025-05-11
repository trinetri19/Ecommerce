const app = require('./app')
require('dotenv').config({path:"./config/config.env"});
const mongooseDatabase = require('./config/database')



process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`)
    console.log("Server is shutting down due to Uncaugth Error")

    process.exit(1);
})

// dotenv 

//connection with databse
mongooseDatabase();


let server = app.listen(8080,()=>{
    console.log(`server is listening on https://localhost:${process.env.PORT}`);
    // console.log(`server is listening on https://localhost:`+8080);
})

process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`)
    console.log("Server is shutting down due to Unhandled Rejections")

    server.close(()=>{
            process.exit(1);
    })
})