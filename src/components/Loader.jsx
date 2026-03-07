import { useState, useEffect } from "react";
import { clsx } from "clsx";

export default function Loader({ onDone }) {
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.floor(Math.random() * 8) + 3;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count >= 100) {
      setTimeout(() => {
        setExit(true);
        setTimeout(onDone, 700);
      }, 400);
    }
  }, [count, onDone]);

  return (
    <div
      className={clsx(
        "fixed inset-0 bg-navy z-[10000] flex flex-col items-center justify-center transition-all duration-700 ease-in-out",
        exit
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100 pointer-events-auto",
      )}
    >
      <div className="relative mb-12">
        <div className="text-[clamp(32px,6vw,64px)] font-serif text-white tracking-tight leading-none">
          Impact Vision
        </div>
        <div
          className="absolute -bottom-2 left-0 h-[2px] bg-accent transition-all duration-100 ease-out shadow-[0_0_12px_#d4e0ed]"
          style={{ width: `${Math.min(count, 100)}%` }}
        />
      </div>
      <div className="text-white/30 font-mono text-[13px] tracking-widest">
        {String(Math.min(count, 100)).padStart(3, "0")}%
      </div>
    </div>
  );
}
