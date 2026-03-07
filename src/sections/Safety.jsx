import { SAFETY } from "../data";
import { motion } from "framer-motion";

export default function Safety() {
  return (
    <section className="bg-[#f7f9ff] py-[100px] px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[80px] items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="font-mono text-[11px] text-navy/70 tracking-[0.2em] mb-4">
            05 — SAFETY
          </div>
          <h2 className="font-serif text-[clamp(32px,4vw,52px)] text-navy leading-[1.1] tracking-[-0.02em] mb-6">
            Safety First,
            <br />
            <em className="italic">Always</em>
          </h2>
          <p className="font-sans text-[#6a7a9a] text-[15px] leading-[1.8] max-w-[420px]">
            At Impact Vision, safety is not an afterthought — it is integral to
            our planning and execution. We prioritize the wellbeing of your team
            and audience through comprehensive safety protocols.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SAFETY.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-5 rounded-lg bg-white border border-[#e8eef8] flex gap-3 items-start transition-all duration-200 hover:border-navy/20 hover:shadow-sm hover:-translate-y-[2px]"
            >
              <div className="w-2 h-2 rounded-full bg-navy/60 mt-[5px] shrink-0" />
              <div className="font-sans text-[13px] text-[#2a3a5a] font-medium">
                {s}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
