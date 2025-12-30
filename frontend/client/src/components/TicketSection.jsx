import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/motion";
import instance from "../api/axios";

export default function TicketSection() {
  const [qty, setQty] = useState(1);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLatestEvent = async () => {
      try {
        const res = await instance.get("/events/latest");
        setEvent(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestEvent();
  }, []);

  const bookTicket = async () => {
    if (!token) {
      alert("Vui lòng đăng nhập để đặt vé.");
      return;
    }

    try {
      setLoading(true);

      const bookingRes = await instance.post(
        "/bookings",
        {
          eventId: event._id,
          quantity: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const checkout = await instance.post(
        "/payments/create-checkout",
        { bookingId: bookingRes.data._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.href = checkout.data.url;

    } catch (error) {
      console.error("Error booking ticket:", error);
    }
  };

  if (!event) return null;
  return (
    <section className="bg-[#F8FAFC] py-32">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mx-auto max-w-3xl rounded-3xl bg-white px-12 py-16 shadow-[0_40px_80px_rgba(15,23,42,0.15)]"
      >
        <h2 className="text-center text-2xl font-semibold text-slate-900">
          Đăng ký {event.title}
        </h2>

        <h3 className="mt-4 text-center text-xl text-slate-800">
          Địa điểm: {event.location}
        </h3>

        <p className="mt-4 text-center text-sm text-slate-500">
          Vé còn lại: <span className="text-[#C9A227]">{event.availableTickets}</span>
        </p>

        <div className="mt-12 flex items-center justify-center gap-10">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="text-xl"
            disabled={qty <= 1}
          >
            -
          </button>
          <span className="text-3xl font-light">{qty}</span>
          <button
            onClick={() =>
              setQty(Math.min(event.availableTickets, qty + 1))
            }
            className="text-xl"
            disabled={qty >= event.availableTickets}
          >
            +
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          Tổng tiền:
          <span className="ml-2 text-lg text-[#C9A227]">
            {(qty * event.price).toLocaleString()} VNĐ
          </span>
        </p>

        <button onClick={bookTicket} disabled={loading} className="mt-14 w-full rounded-xl bg-[#C9A227] py-4 text-sm tracking-widest text-white hover:opacity-90 transition">
          {loading ? "Đang xử lý..." : "Đặt vé"}
        </button>
      </motion.div>
    </section>
  );
}
