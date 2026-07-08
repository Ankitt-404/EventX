import { useEffect, useState } from "react";
import api from "../services/api.js";
import "./adminPendingEvents.css";

function AdminPendingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingEvents = async () => {
    try {
      setLoading(true);

      const res = await api.get("/admin/events/pending-events");

      console.log("PENDING EVENTS RESPONSE:", res.data);

      const eventList = Array.isArray(res.data.data) ? res.data.data : [];

      setEvents(eventList);
    } catch (error) {
      console.error(error.response?.data || error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  const updateStatus = async (eventId, status) => {
    try {
      await api.patch(`/admin/events/${eventId}/status`, { status });

      setEvents((prev) =>
        prev.map((event) =>
          event._id === eventId ? { ...event, status } : event
        )
      );
    } catch (error) {
      console.error(error.response?.data || error);
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <main className="pendingPage">
      <div className="pendingHeader">
        <p>ADMIN CONTROL</p>
        <h1>Pending Events</h1>
      </div>

      {loading ? (
        <p className="emptyText">Loading events...</p>
      ) : events.length === 0 ? (
        <p className="emptyText">No pending events found.</p>
      ) : (
        <div className="pendingGrid">
          {events.map((event) => (
            <div className="pendingCard" key={event._id}>
              <img src={event.banner?.url} alt={event.title} />

              <div className="pendingContent">
                <span className="category">{event.category}</span>
                <h2>{event.title}</h2>
                <p>{event.description}</p>

                <div className="metaGrid">
                  <div>
                    <small>Venue</small>
                    <strong>{event.venue}</strong>
                  </div>

                  <div>
                    <small>Date</small>
                    <strong>{new Date(event.startDate).toLocaleDateString()}</strong>
                  </div>

                  <div>
                    <small>Organiser</small>
                    <strong>{event.organiser?.username}</strong>
                  </div>

                  <div>
                    <small>Current Status</small>
                    <strong>{event.status}</strong>
                  </div>
                </div>

                <div className="statusActions">
                  <button className="approve" onClick={() => updateStatus(event._id, "Approved")}>
                    Approve
                  </button>

                  <button className="reject" onClick={() => updateStatus(event._id, "Rejected")}>
                    Reject
                  </button>

                  <button className="draft" onClick={() => updateStatus(event._id, "Draft")}>
                    Draft
                  </button>

                  <button className="cancel" onClick={() => updateStatus(event._id, "Cancelled")}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default AdminPendingEvents;