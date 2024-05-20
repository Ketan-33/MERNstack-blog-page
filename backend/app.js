import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { dbConnection } from './database/dbConnection.js'; 
import { errorMiddleware } from './middlewares/error.js';
import userRouter from './routes/userRouter.js';

const app=express();
dotenv.config({path: "./config/config.env"});

app.use(cors({
    origin:[],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extented:true}));

// app.use("/api/v1",userRouter);
dbConnection();

app.get("/error", (req, res, next) => {
  next(new ErrorHandler("This is a custom error", 400));
});
app.use((req, res, next) => {
  next(new ErrorHandler("Not Found", 404));
});
app.use(errorMiddleware);

export default app;