import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { Menu, X } from "lucide-react";
import logoUrl from "../assets/Impact Vision Logo.webp";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", s);
    return () => window.removeEventListener("scroll", s);
  }, []);

  const scroll = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    ["services", "Services"],
    ["locations", "Locations"],
    ["gallery", "Gallery"],
    ["clients", "Clients"],
  ];

  return (
    <>
      <nav
        className={clsx(
          "fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between transition-all duration-400 ease-in-out",
          scrolled
            ? "py-3 px-6 md:px-12 bg-navy/60 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            : "py-6 px-6 md:px-12 bg-transparent border-b border-transparent backdrop-blur-none",
        )}
      >
        <div
          className="cursor-pointer flex items-center"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img
            src={logoUrl}
            alt="Impact Vision Logo"
            width={180}
            height={65}
            fetchpriority="high"
            decoding="sync"
            className={clsx(
              "h-[50px] md:h-[65px] w-auto object-contain transition-all duration-300",
              scrolled ? "filter invert brightness-0" : "brightness-0 invert",
            )}
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-9 items-center">
          {navLinks.map(([id, label]) => (
            <button
              key={id}
              onClick={() => scroll(id)}
              data-cursor="EXPLORE"
              className="font-sans text-[14px] font-medium tracking-wide transition-colors duration-200 text-white/90 hover:text-white"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scroll("contact")}
            data-cursor="GET IN TOUCH"
            className="bg-accent text-navy px-[22px] py-[10px] rounded-md font-sans text-[13px] font-semibold tracking-wide transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(212,224,237,0.27)]"
          >
            Get in Touch
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
          className="md:hidden p-2 rounded-md text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "fixed inset-0 bg-navy z-[990] flex flex-col items-center justify-center transition-all duration-300 md:hidden",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      >
        <div className="flex flex-col gap-8 items-center">
          {navLinks.map(([id, label]) => (
            <button
              key={id}
              onClick={() => scroll(id)}
              className="text-white text-2xl font-serif tracking-wide"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scroll("contact")}
            className="bg-accent text-navy px-8 py-3 mt-4 rounded-md font-sans text-[16px] font-semibold tracking-wide"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </>
  );
}
