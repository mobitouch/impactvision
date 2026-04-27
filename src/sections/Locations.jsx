import { useState, useEffect } from "react";
import { LOCATIONS } from "../data";
import { m, AnimatePresence } from "framer-motion";

export default function Locations() {
  const [selectedLoc, setSelectedLoc] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedLoc(null);
      }
    };

    if (selectedLoc) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedLoc]);
  return (
    <section
      id="locations"
      className="bg-navy py-[120px] px-6 md:px-12 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.04] bg-[size:40px_40px]"
        style={{
          backgroundImage:
            "linear-gradient(#d4e0ed 1px, transparent 1px), linear-gradient(90deg, #d4e0ed 1px, transparent 1px)",
        }}
      />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-[72px]"
        >
          <div className="font-mono text-[11px] text-accent tracking-[0.2em] mb-4">
            02 — LOCATIONS
          </div>
          <h2 className="font-serif text-[clamp(36px,5vw,64px)] text-white leading-[1.05] tracking-[-0.02em]">
            Where we <em className="text-accent not-italic">operate</em>
          </h2>
        </m.div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {LOCATIONS.map((loc, i) => (
            <m.div
              key={loc.city}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setSelectedLoc(loc)}
              className="p-[32px_28px] border border-accent/20 rounded-[10px] bg-white/5 transition-all duration-300 hover:border-accent/60 hover:bg-accent/5 cursor-pointer"
            >
              <div className="text-[28px] mb-3">{loc.flag}</div>
              <div className="font-serif text-[22px] text-white mb-1">
                {loc.city}
              </div>
              <div className="font-mono text-[11px] text-accent tracking-[0.08em]">
                {loc.country}
              </div>
            </m.div>
          ))}
        </div>

        {/* Mission / Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[64px]">
          {[
            {
              label: "Our Mission",
              text: "We deliver innovative audiovisual solutions that create memorable experiences.",
            },
            {
              label: "Our Vision",
              text: "To be the premier leading audiovisual partner in the MENA region and beyond.",
            },
          ].map((mv, i) => (
            <m.div
              key={mv.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="p-9 border border-accent/20 rounded-[10px] bg-white/5"
            >
              <div className="font-mono text-[10px] text-accent tracking-[0.15em] mb-3.5 uppercase">
                {mv.label}
              </div>
              <div className="font-serif text-[20px] text-white leading-[1.5]">
                {mv.text}
              </div>
            </m.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedLoc && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLoc(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#020610]/80 backdrop-blur-sm"
          >
            <m.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#23203e] border border-accent/20 rounded-[12px] p-8 max-w-[400px] w-full relative shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            >
              <button
                onClick={() => setSelectedLoc(null)}
                className="absolute top-4 right-4 text-[#6a8ab0] hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
              >
                ✕
              </button>
              
              <div className="text-[40px] mb-4">{selectedLoc.flag}</div>
              <h3 className="font-serif text-[28px] text-white mb-1">
                {selectedLoc.city}
              </h3>
              <div className="font-mono text-[12px] text-accent tracking-[0.08em] mb-8">
                {selectedLoc.country}
              </div>
              
              <div className="space-y-5">
                {selectedLoc.phones && selectedLoc.phones.length > 0 && selectedLoc.phones[0] !== "Contact via form" && (
                  <div>
                    <div className="font-mono text-[10px] text-[#6a8ab0] uppercase tracking-wider mb-2">
                      Phone
                    </div>
                    {selectedLoc.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p.replace(/\s+/g, '')}`}
                        className="block font-sans text-[15px] text-white hover:text-accent transition-colors mb-1"
                      >
                        {p}
                      </a>
                    ))}
                  </div>
                )}
                
                {selectedLoc.email && (
                  <div>
                    <div className="font-mono text-[10px] text-[#6a8ab0] uppercase tracking-wider mb-2">
                      Email
                    </div>
                    <a
                      href={`mailto:${selectedLoc.email}`}
                      className="block font-sans text-[15px] text-white hover:text-accent transition-colors"
                    >
                      {selectedLoc.email}
                    </a>
                  </div>
                )}
                
                {selectedLoc.link && (
                  <div>
                    <div className="font-mono text-[10px] text-[#6a8ab0] uppercase tracking-wider mb-2">
                      Location
                    </div>
                    <a
                      href={selectedLoc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block font-sans text-[15px] text-white hover:text-accent transition-colors underline decoration-accent/30 underline-offset-4"
                    >
                      View on Map
                    </a>
                  </div>
                )}
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
