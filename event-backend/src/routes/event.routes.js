import { Router } from "express";

import { bookEvent, cancelTicket, createEvent, deleteEvent, getAllEvents, getEventDetails, getOrganizerEvents, getUserBookings, updateEvent } from "../controllers/eventController.js";
import jwt from "jsonwebtoken";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const eventRouter = Router();

eventRouter.post(
  "/create",
  verifyJWT,
  upload.single("banner"),
  createEvent
);
eventRouter.put("/update/:eventId", verifyJWT, updateEvent)
eventRouter.delete("/delete/:eventId",verifyJWT, deleteEvent)
eventRouter.get("/", getAllEvents)
eventRouter.get("/my-events", verifyJWT, getOrganizerEvents)
eventRouter.get("/:eventId", getEventDetails)



export default eventRouter;