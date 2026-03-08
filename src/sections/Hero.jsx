import { Suspense, lazy } from "react";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

const LightRays = lazy(() => import("../components/LightRays"));
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.8 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function Hero({ loaded }) {
  return (
    <section className="min-h-screen bg-navy flex flex-col items-center justify-center relative overflow-hidden px-6 pt-[120px] pb-20 selection:bg-accent/20">
      {/* Interactive Light Rays Background (Lazy Loaded for Performance) */}
      <div className="absolute inset-0 pointer-events-auto">
        <Suspense fallback={null}>
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
        </Suspense>
      </div>

      {/* Premium Grid Background Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] bg-[size:40px_40px] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#d4e0ed 1px, transparent 1px), linear-gradient(90deg, #d4e0ed 1px, transparent 1px)",
        }}
      />

      {/* Subtle Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#23203e_100%)] pointer-events-none opacity-80" />

      {/* Content Container (z-indexed above the background) */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={loaded ? "show" : "hidden"}
        className="relative z-10 flex flex-col items-center w-full pointer-events-none"
      >
        {/* Eyebrow */}
        <motion.div
          variants={item}
          className="font-mono text-[11px] tracking-[0.25em] text-accent mb-7 uppercase flex items-center gap-3"
        >
          <span className="w-8 h-[1px] bg-accent/50"></span>
          Audiovisual Excellence
          <span className="w-8 h-[1px] bg-accent/50"></span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="font-serif text-[4.5rem] leading-[0.85] sm:text-7xl md:text-8xl lg:text-[130px] text-white text-center sm:leading-[0.9] tracking-[-0.04em] mb-6 sm:mb-8"
        >
          Impact
          <br />
          <span className="text-accent italic relative inline-block">
            Vision
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className="font-sans text-[15px] sm:text-lg md:text-[22px] text-white/80 max-w-[600px] text-center leading-[1.6] mb-10 sm:mb-12 px-4 sm:px-0"
        >
          Crafting unforgettable technical productions and immersive stages
          across the MENA region.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center pointer-events-auto w-full sm:w-auto px-6 sm:px-0"
        >
          <button
            onClick={() =>
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-cursor="EXPLORE"
            aria-label="Explore our production services"
            className="group flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto bg-accent text-navy py-3 px-6 sm:py-4 sm:px-8 rounded-full font-sans text-sm sm:text-[15px] font-bold tracking-[0.02em] shadow-[0_10px_30px_rgba(212,224,237,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(212,224,237,0.4)]"
          >
            Explore Production
            <MoveRight
              size={16}
              aria-hidden="true"
              className="sm:w-[18px] sm:h-[18px] transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-cursor="CONTACT"
            aria-label="Get in touch with Impact Vision"
            className="bg-transparent text-white border border-white/20 w-full sm:w-auto py-3 px-6 sm:py-4 sm:px-8 rounded-full font-sans text-sm sm:text-[15px] font-medium transition-all duration-300 hover:border-accent hover:text-accent hover:bg-white/5"
          >
            Get in Touch
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-1 flex flex-col items-center gap-2 sm:gap-3 text-accent font-mono animate-bounce pointer-events-none z-20">
        <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-transparent via-accent to-transparent" />
        <span className="text-[9px] sm:text-[10px] tracking-[0.2em] pl-[0.2em]">
          SCROLL
        </span>
      </div>
    </section>
  );
}
