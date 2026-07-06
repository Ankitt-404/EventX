import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import api from "../services/api";
import "./myTickets.css";

function MyTicket() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await api.get(`/booking/${bookingId}`);
        setBooking(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTicket();
  }, [bookingId]);

  if (!booking) {
    return <div className="ticketPage">Loading ticket...</div>;
  }

  const event = booking.event;

  const qrData = JSON.stringify({
    bookingId: booking._id,
    eventId: event?._id,
    userId: booking.user,
    tickets: booking.tickets,
  });

  return (
    <main className="ticketPage">
      <section className="ticketCard">
        <div className="ticketLeft">
          <img
            src={event?.banner?.url}
            alt={event?.title}
            className="ticketBanner"
          />

          <div className="ticketInfo">
            <p className="ticketTag">EVENTX TICKET</p>

            <h1>{event?.title}</h1>

            <p className="ticketDesc">{event?.description}</p>

            <div className="ticketGrid">
              <div>
                <span>Venue</span>
                <strong>{event?.venue}</strong>
              </div>

              <div>
                <span>Date</span>
                <strong>
                  {new Date(event?.startDate).toLocaleDateString()}
                </strong>
              </div>

              <div>
                <span>Time</span>
                <strong>
                  {new Date(event?.startDate).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </strong>
              </div>

              <div>
                <span>Tickets</span>
                <strong>{booking.tickets}</strong>
              </div>

              <div>
                <span>Total Paid</span>
                <strong>₹{booking.totalAmount}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{booking.status || "Booked"}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="ticketRight">
          <h2>Scan QR</h2>

          <div className="qrBox">
            <QRCodeCanvas
              value={qrData}
              size={190}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
            />
          </div>

          <p className="bookingId">
            Booking ID
            <br />
            <span>{booking._id}</span>
          </p>

          <button onClick={() => window.print()}>
            Download / Print Ticket
          </button>
        </div>
      </section>
    </main>
  );
}

export default MyTicket;