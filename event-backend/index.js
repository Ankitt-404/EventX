import dotenv from "dotenv";
dotenv.config({
    path : "./.env"
});
console.log(process.env.SMTP_EMAIL);

import express from "express";

import cors from "cors";
import mongoose from "mongoose";
import Router from "./src/routes/user.routes.js";
import eventRouter from "./src/routes/event.routes.js";
import bookingRouter from "./src/routes/booking.routes.js";


mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB is connected")).catch((err)=> console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("EventX backend is running")
})
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})
app.use(express.json());
app.use("/api/v1/users", Router)
app.use("/api/v1/events", eventRouter)
app.use("/api/v1/booking",bookingRouter)
