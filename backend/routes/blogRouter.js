import express from "express";
import { blogPost,deleteBlog,getAllBlogs,getMyBlogs,getSingleBlog,} from "../controllers/blogController.js";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, isAuthorized("Author"), blogPost);
router.delete("/delete/:id", isAuthenticated, isAuthorized("Author"), deleteBlog);
router.get("/all", getAllBlogs);
router.get("/singleblog/:id", isAuthenticated, getSingleBlog);
router.get("/myblogs", isAuthenticated, isAuthorized("Author"), getMyBlogs);


export default router;
