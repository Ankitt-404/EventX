import { verifyJWT } from "../middlewares/auth.middleware.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";
import { Event } from "../models/event.model.js";
import { bookEvent, cancelTicket, getBookingHistory, getUserBookings ,getBookingById, getEventAttendees} from "../controllers/eventController.js";
import { Router } from "express";
const bookingRouter = Router();


bookingRouter.post("/book/:eventId", verifyJWT, bookEvent);

bookingRouter.get("/my-bookings", verifyJWT, getUserBookings);


bookingRouter.delete("/cancel/:bookingId", verifyJWT, cancelTicket);
bookingRouter.get("/booking-history", verifyJWT, getBookingHistory)
bookingRouter.get("/:bookingId", verifyJWT, getBookingById);

export default bookingRouter