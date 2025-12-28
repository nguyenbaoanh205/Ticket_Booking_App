export default function Hero() {
  return (
    <section className="flex min-h-screen items-center bg-[#F8FAFC] pt-32">
      <div className="mx-auto max-w-4xl px-8 text-center">
        <p className="mb-6 text-xs tracking-[0.4em] text-[#C9A227]">
          EXCLUSIVE WORKSHOP
        </p>

        <h1 className="text-4xl md:text-6xl font-light text-slate-900 leading-tight">
          Tự tay xây dựng hệ thống <br />
          <span className="font-semibold">Bán vé như sản phẩm thật</span>
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-sm text-slate-500">
          Triển khai từ đặt vé – thanh toán – gửi QR – check-in admin như hệ thống doanh nghiệp.
        </p>
      </div>
    </section>
  );
}
