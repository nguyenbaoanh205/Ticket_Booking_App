export default function WorkshopFlow() {
  const steps = [
    { title: "Đặt vé & giữ vé", img: "https://cdn03.qrcodechimp.com/qr/PROD/60be06619aaec3072951b013/fm/use-stickers-for-more-qr-scans.png" },
    { title: "Thanh toán Stripe", img: "https://mir-s3-cdn-cf.behance.net/projects/404/3c843e239671043.Y3JvcCwxOTk5LDE1NjQsMCwyMTc.jpg" },
    { title: "Gửi vé QR Email", img: "https://s3.envato.com/files/450514815/screenshots/screenshot3%20-%20PDF%20File%20Opened.png" },
    { title: "Check-in & Admin", img: "https://tabler.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpreview-dark.c5e80e7c.png&w=3840&q=85" },
  ];

  return (
    <section className="bg-[#F8FAFC] py-32">
      <div className="mx-auto max-w-6xl px-8">
        <h2 className="mb-20 text-center text-3xl font-semibold text-slate-900">
          Bạn sẽ xây dựng được gì?
        </h2>

        <div className="grid gap-12 md:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl bg-white p-8 shadow-[0_30px_60px_rgba(15,23,42,0.12)] hover:-translate-y-2 transition"
            >
              <img
                src={step.img}
                alt={step.title}
                className="mb-6 h-44 w-full rounded-lg object-cover"
              />
              <span className="text-sm font-medium text-[#C9A227]">
                STEP {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-4 text-sm text-slate-500">
                Áp dụng đúng nghiệp vụ và quy trình thực tế.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
