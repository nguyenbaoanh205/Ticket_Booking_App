import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../api/axios";

export default function EventForm() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    date: "",
    price: "",
    totalTickets: ""
  });

  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      instance.get(`/events/${id}`).then(res => {
        setForm({
          ...res.data,
          date: res.data.date.slice(0, 10)
        });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await instance.put(`/events/${id}`, form);
      alert("Cập nhật thành công");
    } else {
      await instance.post("/events", form);
      alert("Tạo sự kiện thành công");
    }

    navigate("/events");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Cập nhật sự kiện" : "Thêm sự kiện"}</h2>

      <input name="title" placeholder="Tên sự kiện"
        value={form.title} onChange={handleChange} />

      <input name="location" placeholder="Địa điểm"
        value={form.location} onChange={handleChange} />

      <input type="date" name="date"
        value={form.date} onChange={handleChange} />

      <input type="number" name="price" placeholder="Giá"
        value={form.price} onChange={handleChange} />

      <input type="number" name="totalTickets" placeholder="Tổng vé"
        value={form.totalTickets} onChange={handleChange} />

      <button type="submit">💾 Lưu</button>
    </form>
  );
}
