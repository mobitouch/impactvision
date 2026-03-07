import { LOCATIONS } from "../data";
import { motion } from "framer-motion";

export default function Locations() {
    return (
        <section id="locations" className="bg-navy py-[120px] px-6 md:px-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04] bg-[size:40px_40px]"
                style={{ backgroundImage: "linear-gradient(#d4e0ed 1px, transparent 1px), linear-gradient(90deg, #d4e0ed 1px, transparent 1px)" }} />

            <div className="max-w-[1200px] mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-[72px]">
                    <div className="font-mono text-[11px] text-accent tracking-[0.2em] mb-4">03 — LOCATIONS</div>
                    <h2 className="font-serif text-[clamp(36px,5vw,64px)] text-white leading-[1.05] tracking-[-0.02em]">
                        Where we <em className="text-accent not-italic">operate</em>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
                    {LOCATIONS.map((loc, i) => (
                        <motion.div key={loc.city}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="p-[32px_28px] border border-accent/20 rounded-[10px] bg-white/5 transition-all duration-300 hover:border-accent/60 hover:bg-accent/5">
                            <div className="text-[28px] mb-3">{loc.flag}</div>
                            <div className="font-serif text-[22px] text-white mb-1">{loc.city}</div>
                            <div className="font-mono text-[11px] text-accent tracking-[0.08em] mb-4">{loc.country}</div>
                            {loc.phones.map(p => (
                                <div key={p} className="font-sans text-[13px] text-[#6a8ab0] mb-1">{p}</div>
                            ))}
                        </motion.div>
                    ))}
                </div>

                {/* Mission / Vision */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[64px]">
                    {[
                        { label: "Our Mission", text: "We deliver innovative audiovisual solutions that create memorable experiences." },
                        { label: "Our Vision", text: "To be the premier leading audiovisual partner in the MENA region and beyond." },
                    ].map((mv, i) => (
                        <motion.div key={mv.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            className="p-9 border border-accent/20 rounded-[10px] bg-white/5">
                            <div className="font-mono text-[10px] text-accent tracking-[0.15em] mb-3.5 uppercase">{mv.label}</div>
                            <div className="font-serif text-[20px] text-white leading-[1.5]">{mv.text}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
