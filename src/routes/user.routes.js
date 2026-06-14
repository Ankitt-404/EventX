import { User } from "../models/user.model.js";
import { loginUser, registerUser } from "../controllers/authController.js";
import { Router } from "express";
const router = Router()

router.post("/register",registerUser);
router.route("/login").post(loginUser)

export default router