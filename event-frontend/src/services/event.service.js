import api from "./api.js";

export const getAllEvents = async () => {
  const res = await api.get("/events");
  return res.data.data;
};
export const getMyBookings = async () => {
  const res = await api.get("/booking/my-bookings");
  return res.data.data;
};

export const getBookingHistory = async () => {
  const res = await api.get("/booking/booking-history");
  return res.data.data;
};

export const bookEvent = async (eventId) => {
  const res = await api.post(`/booking/book/${eventId}`, { tickets: Number(tickets) });
  return res.data.data;
};

export const cancelBooking = async (bookingId) => {
  const res = await api.delete(`/booking/cancel/${bookingId}`);
  return res.data.data;
};
export const getEventAttendees = async (eventId)=>{
  const res = await api.get(`/booking/event/${eventId}/attendees`);
  return res.data.data
}