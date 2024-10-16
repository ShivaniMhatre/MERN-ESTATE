import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routes/auth.route.js'

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Server running on Port 3000!!");
})

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to MongoDB!!");
    })
    .catch((err) => {
        console.log(err);
    })

app.use('/api/auth', authRouter)