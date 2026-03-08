import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { clsx } from "clsx";

export default function GalleryCanvas({ items, fullPage = false }) {
    const [search, setSearch] = useState("");
    const canvasRef = useRef(null);
    const offset = useRef({ x: 0, y: 0 });
    const targetOffset = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const startPos = useRef({ x: 0, y: 0 });
    const startOffset = useRef({ x: 0, y: 0 });
    const velRef = useRef({ x: 0, y: 0 });
    const lastPos = useRef({ x: 0, y: 0 });
    const [, forceRender] = useState(0);

    const filtered = search.trim()
        ? items.filter(
            (i) =>
                i.tags.some((t) => t.includes(search.toLowerCase())) ||
                i.label.toLowerCase().includes(search.toLowerCase()),
        )
        : items;

    // Smooth drag loop
    useEffect(() => {
        let animationId;
        const tick = () => {
            if (!isDragging.current) {
                // Apply inertia
                velRef.current.x *= 0.94;
                velRef.current.y *= 0.94;
                targetOffset.current.x += velRef.current.x;
                targetOffset.current.y += velRef.current.y;
            }

            // Lerp physical offset to target offset for buttery smoothness
            offset.current.x += (targetOffset.current.x - offset.current.x) * 0.15;
            offset.current.y += (targetOffset.current.y - offset.current.y) * 0.15;

            // Avoid re-rendering unnecessarily if nothing is moving
            const moving =
                Math.abs(targetOffset.current.x - offset.current.x) > 0.05 ||
                Math.abs(targetOffset.current.y - offset.current.y) > 0.05 ||
                Math.abs(velRef.current.x) > 0.05 ||
                Math.abs(velRef.current.y) > 0.05;

            if (moving || isDragging.current) {
                forceRender((n) => n + 1);
            }
            animationId = requestAnimationFrame(tick);
        };
        animationId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animationId);
    }, []);

    const COLS = fullPage ? 5 : 4;
    const CARD_W = fullPage ? 300 : 280;
    const GAP = 24;
    const colHeights = new Array(COLS).fill(0);
    const predefinedHeights = [280, 180, 360, 240, 400, 200, 320];

    const layout = filtered.map((item, i) => {
        const height =
            predefinedHeights[(item.id + i * 3) % predefinedHeights.length];

        let minCol = 0;
        let minH = colHeights[0];
        for (let c = 1; c < COLS; c++) {
            if (colHeights[c] < minH) {
                minCol = c;
                minH = colHeights[c];
            }
        }

        const x = minCol * (CARD_W + GAP);
        const y = minH;

        colHeights[minCol] += height + GAP;

        return { ...item, x, y, width: CARD_W, height };
    });

    const onMouseDown = (e) => {
        if (e.target.closest("button") || e.target.closest("input")) return;
        isDragging.current = true;
        startPos.current = { x: e.clientX, y: e.clientY };
        lastPos.current = { x: e.clientX, y: e.clientY };
        startOffset.current = { ...targetOffset.current };
        velRef.current = { x: 0, y: 0 };
    };

    const onMouseMove = (e) => {
        if (!isDragging.current) return;
        velRef.current = {
            x: e.clientX - lastPos.current.x,
            y: e.clientY - lastPos.current.y,
        };
        lastPos.current = { x: e.clientX, y: e.clientY };
        targetOffset.current = {
            x: startOffset.current.x + (e.clientX - startPos.current.x),
            y: startOffset.current.y + (e.clientY - startPos.current.y),
        };
    };

    const onTouchStart = (e) => {
        if (e.target.closest("button") || e.target.closest("input")) return;
        isDragging.current = true;
        startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        startOffset.current = { ...targetOffset.current };
        velRef.current = { x: 0, y: 0 };
    };

    const onTouchMove = (e) => {
        if (!isDragging.current) return;
        const clientX = e.touches[0].clientX;
        const clientY = e.touches[0].clientY;
        velRef.current = {
            x: clientX - lastPos.current.x,
            y: clientY - lastPos.current.y,
        };
        lastPos.current = { x: clientX, y: clientY };
        targetOffset.current = {
            x: startOffset.current.x + (clientX - startPos.current.x),
            y: startOffset.current.y + (clientY - startPos.current.y),
        };
    };

    const onMouseUp = () => {
        isDragging.current = false;
    };

    return (
        <div>
            {/* Search */}
            <div className="flex justify-center mb-9">
                <div className="relative w-full max-w-[360px]">
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by tag: concert, led, rigging..."
                        className="w-full py-[14px] pr-5 pl-12 rounded-lg border-[1.5px] border-[#e0e8f8] bg-[#f7f9ff] font-sans text-[14px] text-navy outline-none box-border transition-colors duration-200 focus:border-accent"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent w-4 h-4" />
                </div>
            </div>

            {/* Tags */}
            <div className="flex gap-2 justify-center mb-8 flex-wrap">
                {[
                    "concert",
                    "led",
                    "lighting",
                    "rigging",
                    "stage",
                    "laser",
                    "festival",
                    "ceremony",
                ].map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setSearch(search === tag ? "" : tag)}
                        className={clsx(
                            "px-6 py-2 rounded-full font-mono text-[12px] uppercase tracking-wider transition-all duration-300 whitespace-nowrap border cursor-pointer",
                            search === tag
                                ? "border-accent bg-accent text-navy font-bold shadow-[0_0_15px_rgba(212,224,237,0.3)]"
                                : "border-[#d0daf0] bg-transparent text-[#4a5a7a] hover:border-accent hover:text-accent",
                        )}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Infinite Canvas */}
            <div
                ref={canvasRef}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onMouseUp}
                className={clsx(
                    "w-full overflow-hidden relative rounded-xl bg-white border border-[#e8eef8] select-none touch-none",
                    fullPage ? "h-[calc(100vh-200px)] min-h-[500px]" : "h-[600px]",
                    isDragging.current ? "cursor-grabbing" : "cursor-grab",
                )}
                data-cursor="DRAG"
            >
                <div
                    className="absolute"
                    style={{
                        transform: `translate(${offset.current.x + 40}px, ${offset.current.y + 40}px)`,
                    }}
                >
                    {layout.map((item) => (
                        <div
                            key={item.id}
                            className="absolute rounded-[12px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(212,224,237,0.15)] group"
                            style={{
                                left: item.x,
                                top: item.y,
                                width: item.width,
                                height: item.height,
                                background: item.color,
                            }}
                        >
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: `linear-gradient(135deg, ${item.color} 0%, rgba(212,224,237,0.1) 100%)`,
                                }}
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="absolute bottom-4 left-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                <div className="text-white text-[15px] font-serif mb-2 leading-tight">
                                    {item.label}
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {item.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="px-2 py-0.5 rounded-[4px] bg-[#d4e0ed]/10 text-[#d4e0ed] text-[10px] font-mono uppercase tracking-wider"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    {layout.length === 0 && (
                        <div className="text-[#4a5a7a] font-sans text-[16px] p-10">
                            No results for "{search}"
                        </div>
                    )}
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#e0e8f8] text-[#8899bb] font-mono text-[10px] tracking-[0.08em] pointer-events-none shadow-sm">
                    DRAG TO EXPLORE
                </div>
            </div>
        </div>
    );
}
