import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../services/event.service";
import "./events.css";

const getEventPrice = (event) => {
  const price = event.price || event.ticketPrice || event.amount;
  return price ? `Rs ${price}` : "Free";
};

const getEventLocation = (event) => event.location || event.venue || "Location not set";

function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Unable to load events. Please check that the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <main className="events-page">
      <nav className="events-navbar">
        <h1 className="events-logo">
          Event<span>X</span>
        </h1>
        <div className="events-nav-links">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/admin">Admin</Link>
        </div>
      </nav>

      <section className="events-header">
        <p>EVENTS</p>
        <h2>Explore Events</h2>
      </section>

      {loading && <p className="events-status">Loading events...</p>}
      {error && <p className="events-status error">{error}</p>}
      {!loading && !error && events.length === 0 && (
        <p className="events-status">No events found.</p>
      )}

      <section className="events-grid">
        {events.map((event) => (
          <article className="event-card" key={event._id || event.id}>
            <div>
              <p className="event-category">{event.category || "General"}</p>
              <h3>{event.title || event.name || "Untitled event"}</h3>
              <p className="event-description">
                {event.description || "Event details will be available soon."}
              </p>
            </div>

            <div className="event-meta">
              <span>{getEventLocation(event)}</span>
              <strong>{getEventPrice(event)}</strong>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default EventsPage;
