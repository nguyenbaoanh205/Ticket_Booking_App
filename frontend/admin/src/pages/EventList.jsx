import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../api/axios";

export default function EventList() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const res = await instance.get("/events");
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa sự kiện này?")) return;
    await instance.delete(`/events/${id}`);
    fetchEvents();
  };

  return (
    <div>
      <h2>Quản lý sự kiện</h2>
      <Link to="/events/create">➕ Thêm sự kiện</Link>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Tên</th>
            <th>Địa điểm</th>
            <th>Ngày</th>
            <th>Giá</th>
            <th>Vé</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {events.map(e => (
            <tr key={e._id}>
              <td>{e.title}</td>
              <td>{e.location}</td>
              <td>{new Date(e.date).toLocaleDateString()}</td>
              <td>{e.price}</td>
              <td>{e.availableTickets}/{e.totalTickets}</td>
              <td>
                <Link to={`/events/edit/${e._id}`}>✏️</Link>
                {" | "}
                <button onClick={() => handleDelete(e._id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
