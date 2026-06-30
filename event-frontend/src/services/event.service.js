import api from "./api.js";

export const getAllEvents = async () => {
  const res = await api.get("/events");
  return res.data.data;
};
export const getMyBookings = async () => {
  const res = await api.get("/bookings/my");
  return res.data.data;
};

export const getBookingHistory = async () => {
  const res = await api.get("/bookings/booking-history");
  return res.data.data;
};

export const bookEvent = async (eventId) => {
  const res = await api.post(`/bookings/book/${eventId}`);
  return res.data.data;
};

export const cancelBooking = async (bookingId) => {
  const res = await api.delete(`/bookings/cancel/${bookingId}`);
  return res.data.data;
};
