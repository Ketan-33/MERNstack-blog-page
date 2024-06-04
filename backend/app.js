import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js";
import blogRouter from "./routes/blogRouter.js";
import fileUpload from "express-fileupload";

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use((req, res, next) => {
  // console.log(`Request received at ${req.url}`);
  // console.log("Method:", req.method);
  // console.log("Headers:", req.headers);
  next();
});

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
