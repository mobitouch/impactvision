import { useState, useEffect } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";

export default function FloatingActions() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col gap-3">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        data-cursor="TOP"
        aria-label="Scroll to top"
        className={`flex h-12 w-12 items-center justify-center rounded-full bg-navy border border-white/20 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-accent hover:text-navy hover:border-transparent ${
          showScroll ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        <ArrowUp size={24} />
      </button>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/966533110614"
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="CHAT"
        aria-label="Chat on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(37,211,102,0.4)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(37,211,102,0.6)]"
      >
        <MessageCircle size={30} className="fill-current" />
      </a>
    </div>
  );
}
