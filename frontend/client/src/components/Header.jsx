import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        <Link to="/" className="flex items-center gap-4">
          <img
            src="https://thumbs.dreamstime.com/b/glitch-tech-banner-futuristic-geometric-modern-technology-cyberpunk-style-hi-badge-289981863.jpg"
            alt="Logo"
            className="h-10 w-10 rounded-lg object-cover"
          />
          <span className="text-sm font-semibold tracking-[0.35em] text-slate-900">
            WORKSHOP 2025
          </span>
        </Link>

        <nav className="hidden md:flex gap-10 text-sm text-slate-600">
          <button
            onClick={() =>
              document
                .getElementById("noi-dung")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-[#C9A227] transition cursor-pointer"
          >
            Nội dung
          </button>

          <button
            onClick={() =>
              document
                .getElementById("quy-trinh")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:text-[#C9A227] transition cursor-pointer"
          >
            Quy trình
          </button>

          <button
            onClick={() => document.getElementById("ve").scrollIntoView({ behavior: "smooth" })}
            className="hover:text-[#C9A227] transition cursor-pointer"
          >
            Đặt vé
          </button>
        </nav>


        {!user ? (
          <Link
            to="/login"
            className="rounded-md border border-[#C9A227] px-6 py-2 text-xs tracking-widest text-[#C9A227] hover:bg-[#C9A227] hover:text-white transition"
          >
            ĐĂNG NHẬP
          </Link>
        ) : (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer"
            >
              {user.name}
              <span className="text-xs">▼</span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-lg bg-white border border-slate-200 shadow-xl">
                <Link
                  to="/my-tickets"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition"
                >
                  🎫 Vé của tôi
                </Link>

                <div className="h-px bg-slate-100" />

                <button
                  onClick={logout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                  🚪 Đăng xuất
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
