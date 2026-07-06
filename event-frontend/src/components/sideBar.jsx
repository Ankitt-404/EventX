import { Link, useNavigate } from "react-router-dom";
import "./sideBar.css";

function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  return (
    <aside className={`sidebar ${open ? "show" : ""}`}>
      <h2>EventX</h2>

      <Link onClick={() => setOpen(false)} to="/">
        Home
      </Link>

      <Link onClick={() => setOpen(false)} to="/events">
        Events
      </Link>

      {role === "organiser" && (
        <>
          

          <Link onClick={() => setOpen(false)} to="/create-event">
            Create Event
          </Link>

          <Link onClick={() => setOpen(false)} to="/organiser/my-events">
            My Events
          </Link>
        </>
      )}

      {role === "user" && (
        <Link onClick={() => setOpen(false)} to="/my-bookings">
          My Bookings
        </Link>
      )}

      {role === "admin" && (
        <Link onClick={() => setOpen(false)} to="/admin">
          Admin Dashboard
        </Link>
      )}

      <button onClick={logout}>Logout</button>
    </aside>
  );
}

export default Sidebar;