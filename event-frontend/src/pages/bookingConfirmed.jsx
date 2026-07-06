import { Link, useLocation } from "react-router-dom";
import "./bookingConfirmed.css";

function BookingConfirmed() {
  const { state } = useLocation();

  const booking = state?.booking;
  const event = state?.event;

  return (
    <main className="confirmedPage">
      <section className="confirmedCard">
        <div className="successIcon">✓</div>

        <p className="tag">BOOKING CONFIRMED</p>

        <h1>{event?.title || "Your Event"}</h1>

        <div className="billBox">
          <div>
            <span>Tickets</span>
            <strong>{booking?.tickets || 1}</strong>
          </div>

          <div>
            <span>Price / Ticket</span>
            <strong>₹{event?.ticketPrice || 0}</strong>
          </div>

          <div>
            <span>Venue</span>
            <strong>{event?.venue || "N/A"}</strong>
          </div>

          <div>
            <span>Date</span>
            <strong>
              {event?.startDate
                ? new Date(event.startDate).toLocaleDateString()
                : "N/A"}
            </strong>
          </div>

          <div className="total">
            <span>Total Paid</span>
            <strong>₹{booking?.totalAmount || 0}</strong>
          </div>
        </div>

        <div className="confirmedActions">
          <Link to="/events" className="outlineBtn">
            Browse More Events
          </Link>

          <Link to="/my-bookings" className="primaryBtn">
            View My Bookings
          </Link>
          
        </div>
      </section>
    </main>
  );
}

export default BookingConfirmed;