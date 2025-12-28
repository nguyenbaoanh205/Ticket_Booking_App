export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <div className="flex items-center gap-4">
          <img
            src="https://thumbs.dreamstime.com/b/glitch-tech-banner-futuristic-geometric-modern-technology-cyberpunk-style-hi-badge-289981863.jpg"
            alt="Logo"
            className="h-10 w-10 rounded-lg object-cover"
          />
          <span className="text-sm font-semibold tracking-[0.35em] text-slate-900">
            WORKSHOP 2025
          </span>
        </div>

        <nav className="hidden md:flex gap-10 text-sm text-slate-600">
          <a className="hover:text-[#C9A227] transition">Nội dung</a>
          <a className="hover:text-[#C9A227] transition">Quy trình</a>
          <a className="hover:text-[#C9A227] transition">Đặt vé</a>
        </nav>

        <button className="rounded-md border border-[#C9A227] px-6 py-2 text-xs tracking-widest text-[#C9A227] hover:bg-[#C9A227] hover:text-white transition">
          ĐĂNG NHẬP
        </button>
      </div>
    </header>
  );
}
