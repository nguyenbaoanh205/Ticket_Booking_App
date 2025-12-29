// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getEventDetail } from "../api/event.api";
// import axios from "../api/axios";

// function EventDetail() {
//   const token = localStorage.getItem("token");
//   const { id } = useParams();
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     getEventDetail(id).then((res) => setEvent(res.data));
//   }, [id]);

//   const bookTicket = async () => {
//     setLoading(true);

//     // 1. Tạo booking
//     const bookingRes = await axios.post(
//       "/bookings",
//       { eventId: id, quantity },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     // 2. Tạo checkout
//     const checkout = await axios.post(
//       "/payments/create-checkout",
//       {
//         bookingId: bookingRes.data._id
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//     );

//     window.location.href = checkout.data.url;
//   };

//   if (!event) return null;

//   return (
//     <div>
//       <h1>{event.title}</h1>
//       <p>{event.location}</p>
//       <p>Giá: {event.price} VND</p>
//       <label>Số lượng vé:</label>
//       <input
//         type="number"
//         min={1}
//         value={quantity}
//         onChange={(e) => setQuantity(Number(e.target.value))}
//         style={{ width: 60, marginLeft: 10 }}
//       />

//       <button onClick={bookTicket} disabled={loading}>
//         {loading ? "Đang xử lý..." : "Đặt vé"}
//       </button>
//     </div>
//   );
// }

// export default EventDetail;

export default function EventDetail() {
  return (
    <div>
      <h1>Events Page</h1>
    </div>
  );
}