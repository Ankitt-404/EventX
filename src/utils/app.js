import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { router } from "../routes/user.routes";

const app = express();
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}));

// app.use(express.json());

// app.use("/api/v1/auth",router);

