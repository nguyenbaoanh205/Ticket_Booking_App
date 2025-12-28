export default function About() {
  const items = [
    "Nội dung thực chiến",
    "Diễn giả kinh nghiệm",
    "Vé QR cá nhân",
  ];

  return (
    <section className="bg-[#F8FAFC] py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-8 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-2xl bg-white p-10 shadow-[0_20px_40px_rgba(15,23,42,0.08)] hover:-translate-y-1 transition"
          >
            <h3 className="text-sm font-semibold text-slate-900">
              {item}
            </h3>
            <p className="mt-4 text-sm text-slate-500 leading-relaxed">
              Xây dựng theo luồng sản phẩm thật, xử lý đầy đủ nghiệp vụ & edge-case.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
