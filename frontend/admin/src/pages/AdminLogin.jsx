import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/auth/login", {
        email,
        password
      });

      // ❗ CHỈ CHO ADMIN
      if (res.data.user.role !== "admin") {
        setError("❌ Bạn không có quyền admin");
        setLoading(false);
        return;
      }

      // Lưu token riêng cho admin
      localStorage.setItem("admin_token", res.data.token);

      navigate("/scan");
    } catch (err) {
      setError(
        err.response?.data?.message || "❌ Đăng nhập thất bại"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2>🔐 Admin Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: 20 }}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
