// require('dotenv').config({path : './env'})
// import dotenv from "dotenv"
import {} from 'dotenv/config'
import mongoose from 'mongoose'
// import { DB_NAME } from './constants'
import connectDB from './db/index.js'
import {app} from "./app.js";  
// dotenv.config({
//     path: './env'
// })
import express from 'express'

// const app = express()

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 7000,()=>{
        console.log(`server is running at port :${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log('Mongodb connection failed !!',err)
})


// (async ()=>{
//     try {
//         await mongoose.connect(`{process.env.MONGODB_URL}/${DB_NAME}`)
//         app.on(process.env.PORT,()=>{
//             console.log(`App is listening on ${process.env.PORT}`)
//         })

//     }
//     catch(error){
//         console.log("error", error)
//     }
// })()