import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import listRouter from './routes/list.route.js'
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

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
app.use('/api/user', userRouter)
app.use('/api/listing', listRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error!';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});