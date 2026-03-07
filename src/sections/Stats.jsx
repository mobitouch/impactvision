import { useState, useEffect, useRef } from "react";
import { STATS } from "../data";

function AnimCounter({ value, suffix }) {
    const [display, setDisplay] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !started.current) {
                started.current = true;
                let start = 0;
                const step = () => {
                    start += Math.ceil(value / 60);
                    if (start >= value) { setDisplay(value); return; }
                    setDisplay(start);
                    requestAnimationFrame(step);
                };
                requestAnimationFrame(step);
            }
        }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [value]);

    return <span ref={ref}>{display}{suffix}</span>;
}

export default function Stats() {
    return (
        <section className="bg-white border-b border-[#e8eef8] py-[60px] px-12 flex justify-center">
            <div className="flex gap-[80px] flex-wrap justify-center items-center">
                {STATS.map(s => (
                    <div key={s.label} className="text-center group">
                        <div className="font-serif text-[clamp(40px,5vw,64px)] text-navy leading-none transition-all duration-300 group-hover:-translate-y-1">
                            <AnimCounter value={s.value} suffix={s.suffix} />
                        </div>
                        <div className="font-sans text-[13px] text-[#6a7a9a] mt-2 tracking-[0.05em] uppercase font-medium">
                            {s.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
