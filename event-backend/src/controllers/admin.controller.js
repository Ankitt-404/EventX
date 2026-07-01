import { User } from "../models/user.model.js";
import { Event } from "../models/event.model.js";
import { Booking } from "../models/booking.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const getAdminOverview = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments({ role: "user" });
  const totalOrganisers = await User.countDocuments({ role: "organiser" });
  const totalEvents = await Event.countDocuments();
  const pendingEvents = await Event.countDocuments({ status: "pending" });
  const totalBookings = await Booking.countDocuments();

  const revenueData = await Booking.aggregate([
    {
      $match: {
        status: { $ne: "Cancelled" },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalAmount" },
        ticketsSold: { $sum: "$tickets" },
      },
    },
  ]);

  const totalRevenue = revenueData[0]?.totalRevenue || 0;
  const ticketsSold = revenueData[0]?.ticketsSold || 0;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalUsers,
        totalOrganisers,
        totalEvents,
        pendingEvents,
        totalBookings,
        totalRevenue,
        ticketsSold,
      },
      "Admin overview fetched successfully"
    )
  );
});

export const getRevenueChart = asyncHandler(async (req, res) => {
  const revenue = await Booking.aggregate([
    {
      $match: {
        status: { $ne: "Cancelled" },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        revenue: { $sum: "$totalAmount" },
        bookings: { $sum: 1 },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  return res.status(200).json(
    new ApiResponse(200, revenue, "Revenue chart fetched successfully")
  );
});

export const getPendingEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ status: "pending" })
    .populate("organiser", "username email")
    .sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(200, events, "Pending events fetched successfully")
  );
});

export const approveEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  const event = await Event.findByIdAndUpdate(
    eventId,
    { $set: { status: "Approved" } },
    { new: true }
  );

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  return res.status(200).json(
    new ApiResponse(200, event, "Event approved successfully")
  );
});

export const rejectEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  const event = await Event.findByIdAndUpdate(
    eventId,
    { $set: { status: "Rejected" } },
    { new: true }
  );

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  return res.status(200).json(
    new ApiResponse(200, event, "Event rejected successfully")
  );
});