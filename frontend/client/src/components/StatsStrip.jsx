export default function StatsStrip() {
  const stats = [
    { label: "HỌC VIÊN", value: "150+" },
    { label: "VÉ GIỚI HẠN", value: "100" },
    { label: "THỜI LƯỢNG", value: "1 NGÀY" },
  ];

  return (
    <section className="bg-[#F8FAFC] py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-3 gap-8 px-8">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl bg-white py-10 text-center shadow-[0_20px_40px_rgba(15,23,42,0.08)]"
          >
            <p className="text-2xl font-semibold text-[#C9A227]">
              {item.value}
            </p>
            <p className="mt-2 text-xs tracking-widest text-slate-500">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
