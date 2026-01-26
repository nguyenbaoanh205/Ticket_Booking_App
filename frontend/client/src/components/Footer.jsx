export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-8 py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            WORKSHOP 2025
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed max-w-md">
            Workshop xây dựng hệ thống bán vé thực chiến từ A–Z bằng
            <span className="font-medium text-slate-700">
              {" "}Laravel, React, Stripe
            </span>.
            Hướng dẫn chi tiết từ kiến trúc backend, thanh toán,
            quản trị admin đến deploy thực tế.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#C9A227] mb-4 uppercase">
            Liên kết
          </h4>
          <ul className="space-y-3 text-sm text-slate-500">
            <li className="hover:text-slate-900 cursor-pointer">Điều khoản</li>
            <li className="hover:text-slate-900 cursor-pointer">Chính sách hoàn tiền</li>
            <li className="hover:text-slate-900 cursor-pointer">Câu hỏi thường gặp</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-[#C9A227] mb-4 uppercase">
            Hỗ trợ
          </h4>
          <ul className="space-y-3 text-sm text-slate-500">
            <li>Email: support@workshop.vn</li>
            <li>Hotline: 0909 999 999</li>
            <li>Zalo / Discord</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-8 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-slate-400">
          <span>© 2025 Workshop Event. All rights reserved.</span>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-slate-700 cursor-pointer">Facebook</span>
            <span className="hover:text-slate-700 cursor-pointer">Github</span>
            <span className="hover:text-slate-700 cursor-pointer">Youtube</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
