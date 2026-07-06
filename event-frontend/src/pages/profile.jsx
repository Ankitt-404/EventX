import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./src/pages/profile.css";
import { FaRegUserCircle, FaEdit } from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [fullname, setFullname] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/v1/users/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        setUser(data.data);

        const savedName = localStorage.getItem("fullname");

        if (savedName) {
          setFullname(savedName);
        } else {
          setFullname(data.data.fullname);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("role");
    localStorage.removeItem("fullname");

    navigate("/auth");
  };

  return (
    <div className="profilePage">
      <div className="profileCard">
        <div className="profileAvatar">
          <FaRegUserCircle size={75} className="profileIcon" />
        </div>

        <div className="nameSection">
          {editing ? (
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="nameInput"
            />
          ) : (
            <h1>{fullname}</h1>
          )}

          <FaEdit
            className="editIcon"
            onClick={() => {
              if (editing) {
                localStorage.setItem("fullname", fullname);
              }
              setEditing(!editing);
            }}
          />
        </div>

        <p className="email">{user?.email}</p>

        <span className="roleBadge">
          {user?.role?.toUpperCase()}
        </span>

        <div className="buttonGroup">
          <button
            className="bookingBtn"
            onClick={() => navigate("/my-bookings")}
          >
            My Bookings
          </button>
          {localStorage.getItem("role") === "organiser" && (
  <button
    className="addBtn"
    onClick={() => navigate("/create-event")}
  >
    Add Event
  </button>
)}


          <button
            className="logoutBtn"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;