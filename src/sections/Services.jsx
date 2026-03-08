import { SERVICES } from "../data";
import { m } from "framer-motion";

export default function Services() {
  return (
    <section id="services" className="bg-white py-[120px] px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-[72px]"
        >
          <div className="font-mono text-[11px] text-navy/70 tracking-[0.2em] mb-4">
            02 — SERVICES
          </div>
          <h2 className="font-serif text-[clamp(36px,5vw,64px)] text-navy leading-[1.05] tracking-[-0.02em] max-w-[560px]">
            From concept to <em className="italic">execution</em>
          </h2>
        </m.div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[16px] md:gap-[20px]">
          {SERVICES.map((s, i) => (
            <m.div
              key={s.id}
              data-cursor="READ MORE"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group h-[170px] md:h-[240px] [perspective:1000px] bg-transparent"
            >
              <div className="relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-[0_4px_20px_rgba(35,32,62,0.05)] hover:shadow-xl rounded-[16px]">
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white p-4 md:p-6 border border-[#e8eef8] rounded-[16px] flex flex-col justify-between text-left">
                  <div>
                    <div className="text-[24px] md:text-[28px] mb-1.5 md:mb-3 text-navy">{s.icon}</div>
                    <div className="font-serif text-[18px] md:text-[22px] text-navy leading-[1.2]">
                      {s.title}
                    </div>
                  </div>
                  <div className="font-mono text-[11px] text-navy/30 tracking-[0.06em]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-navy p-4 md:p-6 border border-navy rounded-[16px] flex flex-col justify-between text-white text-left">
                  <div>
                    <div className="font-serif text-[16px] md:text-[18px] text-white mb-1.5 md:mb-2">
                      {s.title}
                    </div>
                    <div className="font-sans text-[12px] md:text-[13px] text-white/80 leading-[1.4] md:leading-[1.6]">
                      {s.desc}
                    </div>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="w-6 md:w-8 h-[2px] bg-accent"></div>
                    <div className="font-mono text-[11px] text-accent tracking-[0.06em]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
