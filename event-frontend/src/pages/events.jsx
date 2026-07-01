import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./Events.css";

function Events() {
 const [events, setEvents] = useState([]);

useEffect(() => {
  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");

      console.log("EVENTS RESPONSE:", res.data);

      const eventList = Array.isArray(res.data.data)
        ? res.data.data
        : Array.isArray(res.data)
        ? res.data
        : [];

      setEvents(eventList);
    } catch (error) {
      console.error(error);
      setEvents([]);
    }
  };

  fetchEvents();
}, []);

  return (
    <main className="eventsPage">
      <nav className="eventsNav">
        <Link to="/" className="eventsLogo">EventX</Link>
        <Link to="/auth" className="eventsLogin">Login</Link>
      </nav>

      <section className="eventsHero">
        <p>EXPLORE EVENTS</p>
        <h1>Find your next experience.</h1>
      </section>

      <section className="eventsGrid">
        {events.length === 0 ? (
          <p className="emptyText">No events available right now.</p>
        ) : (
          events.map((event) => (
            <Link
              to={`/events/${event._id}`}
              className="eventCard"
              key={event._id}
            >
              <img
                src={event.banner?.url || event.banner}
                alt={event.title}
              />

              <div className="eventInfo">
                <span>{event.category}</span>
                <h2>{event.title}</h2>
                <p>{event.venue}</p>

                <div className="eventMeta">
                  <strong>₹{event.ticketPrice}</strong>
                  <small>
                    {new Date(event.startDate).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </Link>
          ))
        )}
      </section>
    </main>
  );
}

export default Events;