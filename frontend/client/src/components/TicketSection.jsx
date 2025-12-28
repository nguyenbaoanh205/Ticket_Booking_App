import { useState } from "react";

export default function TicketSection() {
  const [qty, setQty] = useState(1);

  return (
    <section className="bg-[#F8FAFC] py-32">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white px-12 py-16 shadow-[0_40px_80px_rgba(15,23,42,0.15)]">
        <h2 className="text-center text-2xl font-semibold text-slate-900">
          Đăng ký tham dự
        </h2>

        <p className="mt-4 text-center text-sm text-slate-500">
          Vé còn lại: <span className="text-[#C9A227]">87</span>
        </p>

        <div className="mt-12 flex items-center justify-center gap-10">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-xl">
            −
          </button>
          <span className="text-3xl font-light">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="text-xl">
            +
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          Tổng tiền:
          <span className="ml-2 text-lg text-[#C9A227]">
            {qty * 499000} VNĐ
          </span>
        </p>

        <button className="mt-14 w-full rounded-xl bg-[#C9A227] py-4 text-sm tracking-widest text-white hover:opacity-90 transition">
          TIẾP TỤC
        </button>
      </div>
    </section>
  );
}
