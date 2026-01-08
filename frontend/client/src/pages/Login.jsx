import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate("/");
    } catch {
      setError("Email hoặc mật khẩu không đúng");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-white px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-100">

        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
        >
          ← Quay lại
        </button>

        <div className="mb-6 text-center mt-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            Đăng nhập
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Đăng nhập để mua vé & quản lý workshop
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-gray-100 border border-gray-200 px-4 py-2 text-sm text-gray-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white
                       hover:bg-gray-800 transition
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-6 flex justify-between text-sm text-gray-500">
          <a href="/forgot-password" className="hover:text-gray-900">
            Quên mật khẩu?
          </a>
          <a href="/register" className="hover:text-gray-900">
            Tạo tài khoản
          </a>
        </div>


        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-200" />
          <span className="mx-3 text-xs text-gray-400">
            Hoặc đăng nhập nhanh
          </span>
          <div className="flex-1 border-t border-gray-200" />
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            aria-label="Login with Google"
            className="flex h-11 w-11 items-center justify-center rounded-full
               border border-gray-300 hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="h-5 w-5"
            />
          </button>

          <button
            type="button"
            aria-label="Login with Facebook"
            className="flex h-11 w-11 items-center justify-center rounded-full
               border border-gray-300 hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475647/facebook-color.svg"
              alt="Facebook"
              className="h-5 w-5"
            />
          </button>

          <button
            type="button"
            aria-label="Login with GitHub"
            className="flex h-11 w-11 items-center justify-center rounded-full
               border border-gray-300 hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              alt="GitHub"
              className="h-5 w-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
