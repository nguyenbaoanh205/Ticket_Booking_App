import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations/motion";

export default function About() {
  const items = [
    {
      title: "Nội dung thực chiến",
      desc: "Học trực tiếp từ dự án thật, bám sát quy trình làm sản phẩm thực tế.",
    },
    {
      title: "Diễn giả kinh nghiệm",
      desc: "Chia sẻ từ những người đã triển khai và vận hành sản phẩm thành công.",
    },
    {
      title: "Vé QR cá nhân",
      desc: "Check-in nhanh chóng, mỗi vé gắn với một người tham dự duy nhất.",
    },
  ];

  return (
    <section
      id="noi-dung"
      className="bg-[#F8FAFC] py-28 scroll-mt-48"
    >
      {/* Heading */}
      <div className="mx-auto max-w-6xl px-8 text-center mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
          Bạn sẽ nhận được gì?
        </h2>
        <p className="mt-4 text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
          Workshop được thiết kế xoay quanh giá trị thực tế, giúp bạn áp dụng
          ngay sau khi tham gia.
        </p>
      </div>

      {/* Content */}
      <motion.div
        className="mx-auto grid max-w-6xl gap-10 px-8 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="rounded-2xl bg-white p-10 shadow-[0_20px_40px_rgba(15,23,42,0.08)] transition"
          >
            <h3 className="text-base font-semibold text-slate-900">
              {item.title}
            </h3>
            <p className="mt-4 text-sm text-slate-500 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
