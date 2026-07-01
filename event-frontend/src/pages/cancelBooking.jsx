import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./CancelBooking.css";

function CancelBooking() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const handleCancel = async () => {
    try {
      await api.delete(`/booking/cancel/${bookingId}`);

      alert("Booking cancelled successfully");
      navigate("/my-bookings");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Cancellation failed");
    }
  };

  return (
    <main className="cancelPage">
      <section className="cancelCard">
        <h1>Cancel Booking?</h1>

        <p>
          Are you sure you want to cancel this ticket? This action may not be
          reversible.
        </p>

        <div className="cancelActions">
          <button onClick={() => navigate("/my-bookings")} className="backBtn">
            Go Back
          </button>

          <button onClick={handleCancel} className="confirmCancelBtn">
            Confirm Cancel
          </button>
        </div>
      </section>
    </main>
  );
}

export default CancelBooking;