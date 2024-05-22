import express from "express";
import { login, register,logout,getMyProfile } from "../controllers/userController.js";
import{isAuthenticated, isAuthorized} from "../middlewares/auth.js"
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", isAuthenticated,logout);
router.get("/myprofile",isAuthenticated,getMyProfile);



export default router;
