import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getEventDetail } from "../api/event.api";
import axios from "../api/axios";

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getEventDetail(id).then((res) => setEvent(res.data));
  }, [id]);

  const bookTicket = async () => {
    setLoading(true);

    // 1. Tạo booking
    const bookingRes = await axios.post("/bookings", {
      eventId: id
    });

    // 2. Tạo checkout
    const checkout = await axios.post("/payments/create-checkout", {
      bookingId: bookingRes.data._id
    });

    window.location.href = checkout.data.url;
  };

  if (!event) return null;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.location}</p>
      <p>Giá: {event.price} VND</p>

      <button onClick={bookTicket} disabled={loading}>
        {loading ? "Đang xử lý..." : "Đặt vé"}
      </button>
    </div>
  );
}

export default EventDetail;
