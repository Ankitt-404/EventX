import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

import {
  getAdminOverview,
  getRevenueChart,
  getPendingEvents,
  approveEvent,
  rejectEvent,
} from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.use(verifyJWT);
adminRouter.use(verifyAdmin);
adminRouter.get("/overview", getAdminOverview);
adminRouter.get("/revenue-chart", getRevenueChart);
adminRouter.get("/events/pending", getPendingEvents);
adminRouter.patch("/events/:eventId/approve", approveEvent);
adminRouter.patch("/events/:eventId/reject", rejectEvent);

export default adminRouter;