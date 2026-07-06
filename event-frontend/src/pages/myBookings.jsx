import { useEffect, useState } from "react";
import api from "../services/api.js";
import "./myBookings.css";
import { Link } from "react-router-dom";
function MyBookings() {
    console.log("page loaded")
  const [bookings, setBookings] = useState([]);

 useEffect(() => {
  const fetchBookings = async () => {
    try {
      const res = await api.get("/booking/my-bookings");

      setBookings(res.data.data || []);
    } catch (err) {
      console.error("BOOKINGS ERROR:", err.response?.data || err);
    }
  };

  fetchBookings();
}, []);

  

  return (
    <main className="bookingsPage">
      <div className="bookingsHeader">
        <h1>My Bookings</h1>
        <p>Your upcoming and previous events.</p>
      </div>

      <div className="bookingsGrid">
        {bookings.map((booking) => (
          <div className="bookingCard" key={booking._id}>
            <img
              src={booking.event?.banner?.url}
              alt={booking.event?.title}
            />

            <div className="bookingContent">
             <span className={`status ${booking.status === "Cancelled" ? "cancelled" : "Booked"}`}>
  {booking.status || "Booked"}
</span>

              <h2>{booking.event.title}</h2>

              <p>{booking.event.description}</p>

              <div className="bookingInfo">
                <div>
                  <small>Date</small>
                  <strong>
                    {new Date(
                      booking.event.startDate
                    ).toLocaleDateString()}
                  </strong>
                </div>

                <div>
                  <small>Venue</small>
                  <strong>{booking.event.venue}</strong>
                </div>

                <div>
                  <small>Tickets</small>
                  <strong>{booking.tickets}</strong>
                </div>

                <div>
                  <small>Paid</small>
                  <strong>₹{booking.totalAmount}</strong>
                </div>
              </div>

              <div className="bookingButtons">
                <Link to={`/my-ticket/${booking._id}`} className="ticketBtn">
                    View Ticket
                </Link>

                {booking.status !== "Cancelled" && (
  <Link to={`/cancel-booking/${booking._id}`} className="cancelBtn">
    Cancel Booking
  </Link>
)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default MyBookings;