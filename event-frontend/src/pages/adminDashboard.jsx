import { useEffect, useState } from "react";
import "./admin.css";
import { getAllEvents } from "../services/event.service.js";

const formatEventMeta = (event) => {
  const location = event.location || event.city || "Location not set";
  const category = event.category || "General";
  const price = event.price || event.ticketPrice || event.amount;
  const priceText = price ? `Rs ${price}` : "Free";

  return `${location} - ${category} - ${priceText}`;
};

function AdminDashboard() {
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
        setError("Unable to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const pendingEvents = events.filter(
    (event) => event.status === "pending" || event.isApproved === false
  );
  const approvalEvents = pendingEvents.length > 0 ? pendingEvents : events.slice(0, 3);

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <h1 className="admin-logo">Event<span>X</span></h1>

        <nav>
          <a className="active">Dashboard</a>
          <a>Events</a>
          <a>Bookings</a>
          <a>Users</a>
          <a>Revenue</a>
          <a>Settings</a>
        </nav>
      </aside>

      <section className="admin-main">
        <div className="admin-header">
          <div>
            <p className="admin-tag">ADMIN CONTROL CENTER</p>
            <h2>Dashboard Overview</h2>
          </div>

          <button className="admin-btn">Approve Events</button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <p>Total Events</p>
            <h3>{loading ? "..." : events.length}</h3>
            <span>{error || "From database"}</span>
          </div>

          <div className="stat-card">
            <p>Total Bookings</p>
            <h3>-</h3>
            <span>Needs bookings API</span>
          </div>

          <div className="stat-card">
            <p>Total Users</p>
            <h3>-</h3>
            <span>Needs users API</span>
          </div>

          <div className="stat-card">
            <p>Revenue</p>
            <h3>-</h3>
            <span>Needs revenue API</span>
          </div>
        </div>

        <div className="admin-content">
          <div className="panel">
            <h3>Pending Event Approvals</h3>

            {loading && <p>Loading events...</p>}
            {!loading && approvalEvents.length === 0 && <p>No events found.</p>}
            {!loading &&
              approvalEvents.map((event) => (
                <div className="event-row" key={event._id || event.id}>
                  <div>
                    <h4>{event.title || event.name || "Untitled event"}</h4>
                    <p>{formatEventMeta(event)}</p>
                  </div>
                  <div className="row-actions">
                    <button className="approve">Approve</button>
                    <button className="reject">Reject</button>
                  </div>
                </div>
              ))}
          </div>

          <div className="panel small-panel">
            <h3>Quick Actions</h3>

            <button>View All Events</button>
            <button>Manage Users</button>
            <button>View Bookings</button>
            <button>Revenue Report</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AdminDashboard;
