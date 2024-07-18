import express from "express";
import { login, register,logout,getMyProfile, getAllAuthors } from "../controllers/userController.js";
import{isAuthenticated, isAuthorized} from "../middlewares/auth.js"
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", isAuthenticated,logout);
router.get("/myprofile",isAuthorized,getMyProfile);
router.get("/authors", getAllAuthors);




export default router;
