export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-16">
      <div className="mx-auto max-w-7xl px-8 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            WORKSHOP 2025
          </h3>
          <p className="text-sm text-slate-500 max-w-md">
            Workshop xây dựng hệ thống bán vé thực chiến từ A–Z.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#C9A227] mb-4">
            LIÊN KẾT
          </h4>
          <ul className="space-y-3 text-sm text-slate-500">
            <li>Điều khoản</li>
            <li>Hoàn tiền</li>
            <li>Liên hệ</li>
          </ul>
        </div>

        <div className="text-sm text-slate-400">
          © 2025 Workshop Event
        </div>
      </div>
    </footer>
  );
}
