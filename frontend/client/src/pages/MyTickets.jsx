import { useEffect, useState } from "react";
import instance from "../api/axios";
import TicketCard from "../components/TicketCard";
import Header from "../components/Header";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await instance.get("/tickets/my-tickets");
        setTickets(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
      <Header />
      <div className="pt-28 max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">Vé của tôi</h1>

        {loading ? (
          <p>Đang tải vé...</p>
        ) : tickets.length === 0 ? (
          <p>Bạn chưa có vé nào 🎫</p>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tickets.map((ticket) => (
            <TicketCard key={ticket._id} ticket={ticket} />
          ))}
        </div>
      </div>
    </div>
  );
}
