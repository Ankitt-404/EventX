import { useEffect, useState } from "react";
import { getOrganiserEvents } from "../services/event.service.js";
import "./myEvents.css";
import { Link } from "react-router-dom";
function MyEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getOrganiserEvents();
        setEvents(data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="myEventsPage">
      <div className="myEventsHeader">
        <p>ORGANISER PANEL</p>
        <h1>My Events</h1>
      </div>

      <div className="myEventsGrid">
        {events.map((event) => (
          <div className="myEventCard" key={event._id}>
            <img
              src={event.banner?.url}
              alt={event.title}
              className="myEventBanner"
            />

            <div className="myEventContent">
              <span className="eventStatus">{event.status}</span>
              <h2>{event.title}</h2>
              <p>{event.description}</p>

              <div className="eventMeta">
                <span>{event.category}</span>
                <span>{event.venue}</span>
                <span>₹{event.ticketPrice}</span>
              </div>
              <Link to={`/organiser/events/${event._id}/attendees`} className="attendeesBtn">
  View Attendees
</Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default MyEvents;