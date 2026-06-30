import { User } from "../models/user.model.js";
import { loginUser, registerUser , sendOTP,verifyOTP} from "../controllers/authController.js";
import { Router } from "express";
const router = Router()

router.post("/register",registerUser);
router.route("/login").post(loginUser)
router.post("/send-otp",sendOTP);
router.post("/verify-otp",verifyOTP);
export default router