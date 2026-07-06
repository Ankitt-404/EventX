import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api.js";
import "./src/pages/eventDetails.css";
import { useNavigate } from "react-router-dom";
function EventDetails() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState(1);
const navigate = useNavigate()
  useEffect(() => {
    const fetchEvent = async () => {
      const res = await api.get(`/events/${eventId}`);
      setEvent(res.data.data);
    };

    fetchEvent();
  }, [eventId]);

 const handleBook = async () => {
  
  try {
    const res = await api.post(`/booking/book/${eventId}`, {
      tickets: Number(tickets),
    });

    navigate("/booking-confirmed", {
      state: {
        booking: res.data.data,
        event,
      },
    });
  } catch (error) {
    console.error(error.response?.data || error);
    alert(error.response?.data?.message || "Booking failed");
  }
};

  if (!event) {
    return <p className="loading">Loading event...</p>;
  }

  const seatsLeft = event.totalSeats - event.bookedSeats;
  const totalAmount = event.ticketPrice * tickets;

  

  return (
    <main className="eventDetailsPage">
      <img
        className="detailsBanner"
        src={event.banner?.url}
        alt={event.title}
      />

      <section className="detailsContent">
        <div className="detailsLeft">
          <span className="category">{event.category}</span>

          <h1>{event.title}</h1>

          <p className="description">{event.description}</p>

          <div className="infoGrid">
            <div>
              <strong>Venue</strong>
              <p>{event.venue}</p>
            </div>

            <div>
              <strong>Date</strong>
              <p>{new Date(event.startDate).toLocaleString()}</p>
            </div>

            <div>
              <strong>Organiser</strong>
              <p>{event.organiser?.username}</p>
            </div>

            <div>
              <strong>Seats Left</strong>
              <p>{seatsLeft}</p>
            </div>
          </div>
        </div>

        <div className="bookingBox">
          <h2>Book Tickets</h2>

          <p className="price">₹{event.ticketPrice} / ticket</p>

          <label>Tickets</label>
          <input
            type="number"
            min="1"
            max={seatsLeft}
            value={tickets}
            onChange={(e) => setTickets(e.target.value)}
          />

          <div className="bill">
            <span>Total</span>
            <strong>₹{totalAmount}</strong>
          </div>

          <button onClick={handleBook} disabled={seatsLeft <= 0}>
            {seatsLeft <= 0 ? "Sold Out" : "Book Now"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default EventDetails;