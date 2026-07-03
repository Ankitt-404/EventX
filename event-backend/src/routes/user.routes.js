import { User } from "../models/user.model.js";
import { loginUser, registerUser , sendOTP,verifyOTP} from "../controllers/authController.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getProfile } from "../controllers/authController.js";

const router = Router()

router.post("/register",registerUser);
router.route("/login").post(loginUser)
router.post("/send-otp",sendOTP);
router.post("/verify-otp",verifyOTP);
router.get("/profile", verifyJWT, getProfile);
export default router

