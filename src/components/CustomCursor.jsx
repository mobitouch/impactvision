import { useEffect, useState, useRef } from "react";

export default function CustomCursor({ color = "#d4e0ed" }) {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const [label, setLabel] = useState("");
  const [expanded, setExpanded] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", move);

    const hover = (e) => {
      const t = e.target.closest("[data-cursor]");
      if (t) {
        setLabel(t.dataset.cursor);
        setExpanded(true);
      } else {
        setLabel("");
        setExpanded(false);
      }
    };
    window.addEventListener("mouseover", hover);

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 6}px, ${pos.current.y - 6}px)`;
      }
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.12;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.12;
      if (followerRef.current) {
        const size = expanded ? 64 : 32;
        followerRef.current.style.transform = `translate(${followerPos.current.x - size / 2}px, ${followerPos.current.y - size / 2}px)`;
        followerRef.current.style.width = `${size}px`;
        followerRef.current.style.height = `${size}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", hover);
      cancelAnimationFrame(rafRef.current);
    };
  }, [expanded]);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none mix-blend-multiply z-[9999]"
        style={{
          background: color,
          transition: "transform 0.05s linear",
        }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 rounded-full border-[1.5px] pointer-events-none flex items-center justify-center font-semibold tracking-wider z-[9998]"
        style={{
          borderColor: color,
          color: color,
          transition: "width 0.3s ease, height 0.3s ease",
          fontSize: "10px",
          backdropFilter: expanded ? "blur(4px)" : "none",
          background: expanded ? "rgba(26,107,255,0.07)" : "transparent",
        }}
      >
        {expanded && label && (
          <span className="whitespace-nowrap text-[9px]">{label}</span>
        )}
      </div>
    </>
  );
}
