import { useEffect, useState } from "react";
import api from "../services/api";

function MyEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
  const fetchEvents = async () => {
    try {
      const data = await getOrganiserEvents();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchEvents();
}, []);

  return (
    <div>
      <h1>My Events</h1>

      {events.map((event) => (
        <div key={event._id}>
          <h2>{event.title}</h2>
          <p>{event.status}</p>
        </div>
      ))}
    </div>
  );
}

export default MyEvents;