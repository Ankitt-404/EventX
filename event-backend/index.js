import dotenv from "dotenv";
dotenv.config({
    path : "./.env"
});
console.log(process.env.SMTP_EMAIL);
console.log(process.env.MONGO_URI);

import express from "express";

import cors from "cors";
import mongoose from "mongoose";
import Router from "./src/routes/user.routes.js";
import eventRouter from "./src/routes/event.routes.js";
import bookingRouter from "./src/routes/booking.routes.js";
import adminRouter from "./src/routes/admin.routes.js";


mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB is connected")).catch((err)=> console.log(err));

const app = express();

app.use(cors({
    origin : "https://event-x-tau.vercel.app",
    credentials : true
}));
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
app.use("/api/v1/admin", adminRouter)


app.use((err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});