import { SERVICES } from "../data";

export default function Services() {
    return (
        <section id="services" className="bg-white py-[120px] px-6 md:px-12">
            <div className="max-w-[1200px] mx-auto">
                <div className="mb-[72px]">
                    <div className="font-mono text-[11px] text-navy/70 tracking-[0.2em] mb-4">02 — SERVICES</div>
                    <h2 className="font-serif text-[clamp(36px,5vw,64px)] text-navy leading-[1.05] tracking-[-0.02em] max-w-[560px]">
                        From concept to <em className="italic">execution</em>
                    </h2>
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[24px]">
                    {SERVICES.map((s, i) => (
                        <div key={s.id} data-cursor="READ MORE"
                            className="group relative h-[320px] [perspective:1000px] bg-transparent">

                            <div className="absolute inset-0 w-full h-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-[0_4px_20px_rgba(35,32,62,0.05)] hover:shadow-xl rounded-[16px]">

                                {/* Front Face */}
                                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-white p-[40px_32px] border border-[#e8eef8] rounded-[16px] flex flex-col justify-between">
                                    <div>
                                        <div className="text-[32px] mb-6 text-navy">{s.icon}</div>
                                        <div className="font-serif text-[24px] text-navy leading-[1.2]">{s.title}</div>
                                    </div>
                                    <div className="font-mono text-[11px] text-navy/30 tracking-[0.06em]">
                                        {String(i + 1).padStart(2, "0")}
                                    </div>
                                </div>

                                {/* Back Face */}
                                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-navy p-[40px_32px] border border-navy rounded-[16px] flex flex-col justify-between text-white">
                                    <div>
                                        <div className="font-serif text-[20px] text-white mb-4">{s.title}</div>
                                        <div className="font-sans text-[14px] text-white/80 leading-[1.7]">
                                            {s.desc}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="w-8 h-[2px] bg-accent"></div>
                                        <div className="font-mono text-[11px] text-accent tracking-[0.06em]">
                                            {String(i + 1).padStart(2, "0")}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
