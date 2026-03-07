import { MoveRight } from "lucide-react";
import LightRays from "../components/LightRays";

export default function Hero() {
    return (
        <section className="min-h-screen bg-navy flex flex-col items-center justify-center relative overflow-hidden px-6 pt-[120px] pb-20 selection:bg-accent/20">
            {/* Interactive Light Rays Background */}
            <div className="absolute inset-0 pointer-events-auto">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#ffffff"
                    raysSpeed={1}
                    lightSpread={0.5}
                    rayLength={3}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0}
                    distortion={0}
                    className="opacity-60"
                    pulsating={false}
                    fadeDistance={1}
                    saturation={1}
                />
            </div>

            {/* Premium Grid Background Overlay */}
            <div className="absolute inset-0 opacity-[0.04] bg-[size:40px_40px] pointer-events-none"
                style={{ backgroundImage: "linear-gradient(#d4e0ed 1px, transparent 1px), linear-gradient(90deg, #d4e0ed 1px, transparent 1px)" }}
            />

            {/* Subtle Vignette for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#23203e_100%)] pointer-events-none opacity-80" />

            {/* Content Container (z-indexed above the background) */}
            <div className="relative z-10 flex flex-col items-center w-full pointer-events-none">
                {/* Eyebrow */}
                <div className="font-mono text-[11px] tracking-[0.25em] text-accent mb-7 uppercase flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-accent/50"></span>
                    Audiovisual Excellence
                    <span className="w-8 h-[1px] bg-accent/50"></span>
                </div>

                {/* Headline */}
                <h1 className="font-serif text-5xl md:text-8xl lg:text-[130px] text-white text-center leading-[0.9] tracking-[-0.04em] mb-8">
                    Impact<br />
                    <span className="text-accent italic relative inline-block">
                        Vision
                        <div className="absolute -right-6 -top-2 w-4 h-4 rounded-full bg-accent animate-ping opacity-75"></div>
                        <div className="absolute -right-6 -top-2 w-4 h-4 rounded-full bg-accent shadow-[0_0_15px_#d4e0ed]"></div>
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="font-sans text-lg md:text-[22px] text-white/60 max-w-[600px] text-center leading-[1.6] mb-12">
                    Crafting unforgettable technical productions and immersive stages across the MENA region.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-5 items-center pointer-events-auto">
                    <button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                        data-cursor="EXPLORE"
                        className="group flex items-center gap-3 bg-accent text-navy py-4 px-8 rounded-full font-sans text-[15px] font-bold tracking-[0.02em] shadow-[0_10px_30px_rgba(212,224,237,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(212,224,237,0.4)]"
                    >
                        Explore Production
                        <MoveRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                        data-cursor="CONTACT"
                        className="bg-transparent text-white border border-white/20 py-4 px-8 rounded-full font-sans text-[15px] font-medium transition-all duration-300 hover:border-accent hover:text-accent hover:bg-white/5"
                    >Get in Touch</button>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-accent font-mono text-[10px] tracking-[0.2em] animate-fade-up [animation-delay:1000ms] pointer-events-none">
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-accent to-transparent animate-pulse" />
                SCROLL
            </div>
        </section>
    );
}
