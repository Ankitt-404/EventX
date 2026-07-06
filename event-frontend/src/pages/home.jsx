import { Link } from "react-router-dom";
import "./home.css";
import { FaRegUserCircle } from "react-icons/fa";

function Home() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const isLoggedIn = !!localStorage.getItem("accessToken");
  return (
    <main className="home">
    <nav className="navbar">
        <h1 className="logo">EventX</h1>

    <div className="navLinks">
      <Link to="/">Home</Link>
      <Link to="/events">Events</Link>

      {isLoggedIn ? (
        <Link to="/profile" className="profileBtn">
          <FaRegUserCircle className="navbarProfileIcon" />
        </Link>
      ) : (
      <Link to="/auth">Login</Link>
      )}
    </div>
    </nav>

      <section className="hero">
        <div className="heroText">
          <p className="eyebrow">EVENT MANAGEMENT PLATFORM</p>

          <h1>
            Discover events.
            <br />
            Book experiences.
          </h1>

          <p className="subtitle">
            EventX helps users discover events, book tickets, and organisers
            manage everything from one clean dashboard.
          </p>

          <div className="heroButtons">
            <Link to="/events" className="primaryBtn">
              Explore Events
            </Link>

            <Link to="/auth" className="secondaryBtn">
              Become Organiser
            </Link>
          </div>
        </div>

        <div className="visual">
          <div className="orb"></div>
          <div className="cube">
            <span></span>
          </div>
        </div>
      </section>

      <section className="stats">
        <div>
          <h3>500+</h3>
          <p>Events Hosted</p>
        </div>

        <div>
          <h3>25K+</h3>
          <p>Tickets Booked</p>
        </div>

        <div>
          <h3>150+</h3>
          <p>Organisers</p>
        </div>
      </section>

      <section className="features">
        <div className="featureCard">
          <h3>Book Tickets</h3>
          <p>Simple ticket booking with instant confirmation.</p>
        </div>

        <div className="featureCard">
          <h3>Create Events</h3>
          <p>Organisers can create, update, and manage events.</p>
        </div>

        <div className="featureCard">
          <h3>Track History</h3>
          <p>Users can view booked and cancelled events.</p>
        </div>
      </section>
    </main>
  );
}

export default Home;