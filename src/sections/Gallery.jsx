import { GALLERY_ITEMS } from "../data";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { m } from "framer-motion";
import GalleryCanvas from "./GalleryCanvas";

export default function Gallery() {
  return (
    <section id="gallery" className="bg-white py-[120px] px-6 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <div className="font-mono text-[11px] text-navy/70 tracking-[0.2em] mb-4">
            04 — GALLERY
          </div>
          <h2 className="font-serif text-[clamp(36px,5vw,64px)] text-navy leading-[1.05] tracking-[-0.02em]">
            Our <em className="italic">work</em>, up close
          </h2>
          <p className="font-sans text-[#6a7a9a] text-[15px] mt-4 leading-[1.7] max-w-[500px]">
            Drag to explore our infinite canvas. Search or filter by tag to see
            previous setups across MENA.
          </p>
        </m.div>
        <GalleryCanvas items={GALLERY_ITEMS} />

        {/* View Full Gallery Link */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mt-12"
        >
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-navy text-white font-sans text-[14px] font-semibold tracking-wide transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(35,32,62,0.3)]"
          >
            View Full Gallery
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </m.div>
      </div>
    </section>
  );
}
