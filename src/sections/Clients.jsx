import { CLIENTS } from "../data";
import { m } from "framer-motion";

export default function Clients() {
  return (
    <section id="clients" className="bg-white py-[120px] px-6 md:px-12 overflow-hidden">
      <m.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-[1200px] mx-auto mb-32"
      >
        <div className="font-mono text-[11px] text-navy/70 tracking-[0.2em] mb-4">
          06 — CLIENTS
        </div>
        <h2 className="font-serif text-[clamp(36px,5vw,64px)] text-navy leading-[1.05] tracking-[-0.02em]">
          Trusted by the <em className="italic">best</em>
        </h2>
      </m.div>

      {/* Client grid cards */}
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-[2px]">
          {CLIENTS.map((c, i) => (
            <m.div
              key={c}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
              className="p-[32px_24px] border border-[#e8eef8] flex flex-col gap-2 transition-colors duration-200 hover:border-navy/20 hover:bg-[#f6f9fc]"
            >
              <div className="font-mono text-[10px] text-[#c0cce0] tracking-[0.08em]">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-serif text-[18px] text-navy leading-[1.3]">
                {c}
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
