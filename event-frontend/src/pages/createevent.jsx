import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./createvent.css";
import api from "../services/api.js";
// const API = "http://localhost:5000/api/v1/events/create";

function CreateEvent() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Music");
  const [venue, setVenue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [status, setStatus] = useState("Approved");
  const [banner, setBanner] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!banner) {
      alert("Please select a banner image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("venue", venue);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("ticketPrice", ticketPrice);
      formData.append("totalSeats", totalSeats);
      formData.append("status", status);
      formData.append("banner", banner);

      const token = localStorage.getItem("accessToken");
        const api = import.meta.env.VITE_RENDER_URL

      // const res = await axios.post(process.env.RENDER_URL, formData, {
      const res = await axios.post(`${api}/events/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message || "Event Created Successfully");

      navigate("/events");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="createEventPage">

      <div className="createEventCard">

        <h1>Create Event</h1>

        <form onSubmit={handleSubmit}>

          <label>Banner</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBanner(e.target.files[0])}
          />

          <label>Title</label>

          <input
            type="text"
            placeholder="Music Fest"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description</label>

          <textarea
            rows="4"
            placeholder="Biggest music festival..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Category</label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Music</option>
            <option>Education</option>
            <option>Sports</option>
            <option>Bussiness</option>
            <option>Tech</option>
            <option>Comedy</option>
          </select>

          <label>Venue</label>

          <input
            type="text"
            placeholder="Kolkata"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />

          <label>Start Date & Time</label>

          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <label>End Date & Time</label>

          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <label>Ticket Price</label>

          <input
            type="number"
            placeholder="199"
            value={ticketPrice}
            onChange={(e) => setTicketPrice(e.target.value)}
          />

          <label>Total Seats</label>

          <input
            type="number"
            placeholder="500"
            value={totalSeats}
            onChange={(e) => setTotalSeats(e.target.value)}
          />

          <label>Status</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Approved</option>
            <option>pending</option>
            <option>draft</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Event"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateEvent;