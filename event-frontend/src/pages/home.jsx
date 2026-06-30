import { Link } from "react-router-dom";
import "./home.css";

function Home() {
  return (
    <div className="home">
      <div className="overlay" />

      <nav className="navbar">
        <h1 className="logo">
          Event<span>X</span>
        </h1>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/about">About</Link>
          <Link to="/features">Features</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="nav-actions">
          <input type="text" placeholder="Search events..." />
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/register" className="register-btn">Register</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="badge">🚀 Discover. Book. Experience.</div>

        <h2>
          Experience Events <br />
          Like <span>Never Before</span>
        </h2>

        <p>
          EventX is your ultimate platform to discover amazing events,
          book tickets seamlessly, and create unforgettable memories.
        </p>

        <div className="hero-buttons">
          <Link to="/events" className="primary-btn">
            Explore Events →
          </Link>

          <Link to="/create-event" className="secondary-btn">
            Create Event 🗓
          </Link>
        </div>

        <div className="stats">
          <div>
            <strong>10K+</strong>
            <p>Happy Users</p>
          </div>
          <div>
            <strong>500+</strong>
            <p>Events Hosted</p>
          </div>
          <div>
            <strong>25K+</strong>
            <p>Tickets Booked</p>
          </div>
          <div>
            <strong>4.8/5</strong>
            <p>User Rating</p>
          </div>
        </div>
      </section>

      <section className="features">
        <p className="section-label">WHY EVENTX?</p>
        <h3>
          Everything You Need for <span>Events</span>
        </h3>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="icon">🎟</div>
            <h4>Discover Events</h4>
            <p>Find exciting events around you across all categories.</p>
          </div>

          <div className="feature-card blue">
            <div className="icon">💳</div>
            <h4>Book Tickets</h4>
            <p>Book tickets instantly and securely in just a few clicks.</p>
          </div>

          <div className="feature-card">
            <div className="icon">📅</div>
            <h4>Manage Events</h4>
            <p>Create, update, and manage your events with analytics.</p>
          </div>

          <div className="feature-card blue">
            <div className="icon">🕘</div>
            <h4>Booking History</h4>
            <p>View your booked and cancelled events anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
