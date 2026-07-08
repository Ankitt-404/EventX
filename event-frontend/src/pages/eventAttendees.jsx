import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventAttendees } from "../services/event.service.js";
import "./eventAttendees.css";

function EventAttendees() {
  const { eventId } = useParams();
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        setLoading(true);
        const data = await getEventAttendees(eventId);
        setAttendees(data || []);
      } catch (error) {
        console.error(error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendees();
  }, [eventId]);

  return (
    <main className="attendeesPage">
      <div className="attendeesHeader">
        <p>ORGANISER PANEL</p>
        <h1>Event Attendees</h1>
      </div>

      {loading ? (
        <p className="emptyText">Loading attendees...</p>
      ) : attendees.length === 0 ? (
        <p className="emptyText">No bookings found for this event.</p>
      ) : (
        <div className="attendeesTable">
          <div className="tableHead">
            <span>User</span>
            <span>Email</span>
            <span>Tickets</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Booked On</span>
          </div>

          {attendees.map((booking) => (
            <div className="tableRow" key={booking._id}>
              <span>{booking.user?.username || "N/A"}</span>
              <span>{booking.user?.email || "N/A"}</span>
              <span>{booking.tickets}</span>
              <span>₹{booking.totalAmount}</span>
              <span>{booking.status}</span>
              <span>{new Date(booking.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default EventAttendees;