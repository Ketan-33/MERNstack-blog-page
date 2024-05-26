import express from "express";
import {blogPost, deleteBlog} from "../controllers/blogController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, isAuthorized("Author"), blogPost);
router.delete("/delete/:id", isAuthenticated, isAuthorized("Author"), deleteBlog);


export default router;
