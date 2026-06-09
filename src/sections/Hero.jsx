import { Suspense, lazy, useState, useEffect } from "react";
import { MoveRight } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import EditorialCarousel from "../components/EditorialCarousel";

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

const contentMap = [
  {
    title: "LED SCREENS",
    desc: "High-resolution modular LED panels that enhance stages, exhibitions, and outdoor arenas with striking visual impact.",
    tag: "led",
  },
  {
    title: "LIGHTING",
    desc: "From mood-setting ambiance to high-energy concert shows, our lighting design team blends creativity and precision.",
    tag: "lighting",
  },
  {
    title: "STAGE",
    desc: "We conceptualize and deliver stages that reflect your vision, ensuring aesthetics and functionality go hand in hand.",
    tag: "stage",
  },
];

export default function Hero({ loaded }) {
  const [showRays, setShowRays] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % contentMap.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Hard-defer WebGL context compilation until after Lighthouse LCP paints
  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => setShowRays(true), 500);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  return (
    <section className="min-h-screen bg-navy flex flex-col items-center justify-center relative overflow-hidden px-6 pt-[120px] pb-20 selection:bg-accent/20">
      {/* Interactive Light Rays Background (Lazy Loaded and Hard-Deferred for Performance) */}
      <div className="absolute inset-0 pointer-events-auto">
        {showRays && (
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
              className="opacity-60 transition-opacity duration-1000"
              pulsating={false}
              fadeDistance={1}
              saturation={1}
            />
          </Suspense>
        )}
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

      {/* Two-column layout: Text left, Carousel right */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-center w-full max-w-[1400px] mx-auto gap-8 lg:gap-0">
        {/* Left: Text content */}
        <m.div
          variants={container}
          initial="hidden"
          animate={loaded ? "show" : "hidden"}
          className="flex flex-col items-center lg:items-start w-full lg:w-[50%] pointer-events-none lg:pr-8"
        >
          {/* Eyebrow */}
          <m.div
            variants={item}
            className="font-mono text-[11px] tracking-[0.25em] text-accent mb-7 uppercase flex items-center gap-3"
          >
            <span className="w-8 h-[1px] bg-accent/50"></span>
            WHAT WE OFFER
            <span className="w-8 h-[1px] bg-accent/50"></span>
          </m.div>

          {/* Switching Content */}
          <m.div
            variants={item}
            className="relative w-full h-[200px] sm:h-[220px] lg:h-[240px] mb-4 sm:mb-6"
          >
            <AnimatePresence mode="wait">
              <m.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col items-center lg:items-start"
              >
                <h1 className="font-serif text-[4rem] sm:text-6xl md:text-7xl lg:text-[75px] xl:text-[90px] text-white text-center lg:text-left leading-[1.1] tracking-[-0.04em] mb-4 sm:mb-6 whitespace-nowrap">
                  {contentMap[currentIndex].title}
                </h1>
                <p className="font-sans text-[15px] sm:text-lg md:text-[22px] text-white/80 max-w-[600px] lg:max-w-[480px] text-center lg:text-left leading-[1.6] px-4 sm:px-0">
                  {contentMap[currentIndex].desc}
                </p>
              </m.div>
            </AnimatePresence>
          </m.div>

          {/* CTAs */}
          <m.div
            variants={item}
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center lg:items-start pointer-events-auto w-full sm:w-auto px-6 sm:px-0"
          >
            <button
              onClick={() => {
                navigate(`/gallery?tag=${contentMap[currentIndex].tag}`);
                // if we are already on home page, and we just navigated to gallery, 
                // the app handles it.
              }}
              data-cursor="EXPLORE"
              aria-label={`Explore ${contentMap[currentIndex].title}`}
              className="group flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto bg-accent text-navy py-3 px-6 sm:py-4 sm:px-8 rounded-full font-sans text-sm sm:text-[15px] font-bold tracking-[0.02em] shadow-[0_10px_30px_rgba(212,224,237,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(212,224,237,0.4)]"
            >
              Explore {contentMap[currentIndex].title}
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
          </m.div>
        </m.div>

        {/* Right: Editorial Carousel (desktop only) */}
        <m.div
          initial={{ opacity: 0, x: 60 }}
          animate={loaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
          transition={{ duration: 1.2, delay: 1.4, ease: "easeOut" }}
          className="hidden lg:block w-[50%] relative pointer-events-none"
          style={{
            maskImage: "linear-gradient(to right, black 0%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, black 0%, black 85%, transparent 100%)",
          }}
        >
          <EditorialCarousel />
        </m.div>
      </div>

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
