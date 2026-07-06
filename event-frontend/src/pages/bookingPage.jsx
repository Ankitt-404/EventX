import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./src/pages/bookingPage.css";

function BookingPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await api.get(`/events/${eventId}`);
      setEvent(res.data.data);
    };

    fetchEvent();
  }, [eventId]);

  const handleBooking = async () => {
  try {
    await api.post(`/booking/book/${eventId}`, {
      tickets: Number(tickets),
    });

    setShowPopup(true);

    setTimeout(() => {
      navigate("/my-bookings");
    }, 2500);

  } catch (error) {
    alert(error.response?.data?.message || "Booking failed");
  }
};

  if (!event) return <div className="bookingLoading">Loading...</div>;

  const seatsLeft = event.totalSeats - event.bookedSeats;
  const totalAmount = Number(event.ticketPrice) * Number(tickets);

  return (
    <main className="bookingPage">
      <section className="bookingCard">
        <div className="bookingImage">
          <img src={event.banner?.url} alt={event.title} />
        </div>

        <div className="bookingInfo">
          <p className="bookingTag">CONFIRM BOOKING</p>

          <h1>{event.title}</h1>

          <p className="bookingDesc">{event.description}</p>

          <div className="bookingDetails">
            <p><span>Venue:</span> {event.venue}</p>
            <p><span>Date:</span> {new Date(event.startDate).toLocaleString()}</p>
            <p><span>Price:</span> ₹{event.ticketPrice} / ticket</p>
            <p><span>Seats Left:</span> {seatsLeft}</p>
          </div>

          <label>Number of tickets</label>
          <input
            type="number"
            min="1"
            max={seatsLeft}
            value={tickets}
            onChange={(e) => setTickets(e.target.value)}
          />

          <div className="billBox">
            <div>
              <p>Tickets</p>
              <strong>{tickets}</strong>
            </div>

            <div>
              <p>Total Amount</p>
              <strong>₹{totalAmount}</strong>
            </div>
          </div>

          <button onClick={handleBooking} disabled={seatsLeft <= 0}>
            {seatsLeft <= 0 ? "Sold Out" : "Confirm Booking"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default BookingPage;