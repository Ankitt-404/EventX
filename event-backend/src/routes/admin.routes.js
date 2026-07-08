import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

import {
  getAdminOverview,
  getRevenueChart,
  getPendingEvents,
  approveEvent,
  rejectEvent
} from "../controllers/admin.controller.js";
import { getEventAttendees, UpdateEventStatus } from "../controllers/eventController.js";

const adminRouter = Router();

adminRouter.use(verifyJWT);
adminRouter.use(verifyAdmin);
adminRouter.get("/overview", getAdminOverview);
adminRouter.get("/revenue-chart", getRevenueChart);
adminRouter.get("/events/pending-events", getPendingEvents);
adminRouter.patch("/events/:eventId/approve", approveEvent);
adminRouter.patch("/events/:eventId/reject", rejectEvent);
adminRouter.patch("/events/:eventId/status", UpdateEventStatus);
adminRouter.get("/event/:eventId/attendees",verifyJWT,getEventAttendees);
export default adminRouter;