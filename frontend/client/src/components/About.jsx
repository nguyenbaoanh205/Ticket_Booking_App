import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations/motion";

export default function About() {
  const items = [
    "Nội dung thực chiến",
    "Diễn giả kinh nghiệm",
    "Vé QR cá nhân",
  ];

  return (
    <section className="bg-[#F8FAFC] py-28">
      <motion.div
        className="mx-auto grid max-w-6xl gap-10 px-8 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {items.map((item) => (
          <motion.div
            key={item}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="rounded-2xl bg-white p-10 shadow-[0_20px_40px_rgba(15,23,42,0.08)]"
          >
            <h3 className="text-sm font-semibold text-slate-900">
              {item}
            </h3>
            <p className="mt-4 text-sm text-slate-500">
              Xây dựng theo nghiệp vụ sản phẩm thật.
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
