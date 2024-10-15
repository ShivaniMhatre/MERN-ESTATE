import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.listen(4000,()=>{
    console.log("Server running on Port 4000!!");
})

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Connected to MongoDB!!");
})
.catch((err)=>{
    console.log(err);
})