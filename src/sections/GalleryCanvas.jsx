import { useState, useRef, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import { clsx } from "clsx";

export default function GalleryCanvas({ items, fullPage = false }) {
    const [search, setSearch] = useState(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            return params.get("tag") || "";
        }
        return "";
    });

    const canvasRef = useRef(null);
    const offset = useRef({ x: 0, y: 0 });
    const targetOffset = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);
    const startPos = useRef({ x: 0, y: 0 });
    const startOffset = useRef({ x: 0, y: 0 });
    const velRef = useRef({ x: 0, y: 0 });
    const lastPos = useRef({ x: 0, y: 0 });

    // Caches the list of active tile DOM elements and layout coordinates
    const activeTiles = useRef([]);

    const filtered = search.trim()
        ? items.filter(
            (i) =>
                i.tags.some((t) => t.includes(search.toLowerCase())) ||
                i.label.toLowerCase().includes(search.toLowerCase()),
        )
        : items;

    const COLS = fullPage ? 5 : 4;
    const CARD_W = fullPage ? 300 : 280;
    const GAP = 24;
    const colHeights = new Array(COLS).fill(0);
    const predefinedHeights = [280, 180, 360, 240, 400, 200, 320];

    // Ensure we have a decent number of items
    const displayItems = filtered.length > 0 && filtered.length < 12
        ? Array.from({ length: Math.ceil(12 / filtered.length) }, () => filtered).flat().map((i, idx) => ({ ...i, uniqueId: i.id + '-' + idx }))
        : filtered.map(i => ({ ...i, uniqueId: i.id.toString() }));

    const layout = displayItems.map((item, i) => {
        const height = predefinedHeights[(item.id + i * 3) % predefinedHeights.length];

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

        return { ...item, x, y, width: CARD_W, height, colIndex: minCol };
    });

    const blockWidth = COLS * (CARD_W + GAP);
    const numCopies = fullPage ? 4 : 3; // 3x3 repeats for standard, 4x4 for fullPage to support ultra-wide screens
    const totalWidth = numCopies * blockWidth;

    // High performance direct DOM positioning function
    const updateTilePositions = useCallback(() => {
        const tiles = activeTiles.current;
        if (!tiles || tiles.length === 0) return;

        const currentX = offset.current.x;
        const currentY = offset.current.y;

        for (let i = 0; i < tiles.length; i++) {
            const tile = tiles[i];
            const totalHeight = numCopies * tile.colHeight;

            const diffX = tile.baseX - (-currentX);
            const diffY = tile.baseY - (-currentY);

            // Wrap coordinates mathematically around total width & height
            const wrappedDiffX = ((diffX + totalWidth / 2) % totalWidth + totalWidth) % totalWidth - totalWidth / 2;
            const wrappedDiffY = ((diffY + totalHeight / 2) % totalHeight + totalHeight) % totalHeight - totalHeight / 2;

            // Apply hardware-accelerated 3D translation directly to the DOM element
            tile.el.style.transform = `translate3d(${wrappedDiffX}px, ${wrappedDiffY}px, 0)`;
        }
    }, [totalWidth, numCopies]);

    // Handle initial drag start on mouse down
    const onMouseDown = (e) => {
        if (e.target.closest("button") || e.target.closest("input")) return;
        isDragging.current = true;
        if (canvasRef.current) {
            canvasRef.current.style.cursor = "grabbing";
        }
        startPos.current = { x: e.clientX, y: e.clientY };
        lastPos.current = { x: e.clientX, y: e.clientY };
        startOffset.current = { ...targetOffset.current };
        velRef.current = { x: 0, y: 0 };
    };

    // Handle initial drag start on touch start
    const onTouchStart = (e) => {
        if (e.target.closest("button") || e.target.closest("input")) return;
        isDragging.current = true;
        startPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        lastPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        startOffset.current = { ...targetOffset.current };
        velRef.current = { x: 0, y: 0 };
    };

    // Bind dragging mouse/touch event move & end listeners to window for robust tracking
    useEffect(() => {
        const handleMouseMove = (e) => {
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

        const handleMouseUp = () => {
            if (isDragging.current) {
                isDragging.current = false;
                if (canvasRef.current) {
                    canvasRef.current.style.cursor = "grab";
                }
            }
        };

        const handleTouchMove = (e) => {
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

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("mouseup", handleMouseUp, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        window.addEventListener("touchend", handleMouseUp, { passive: true });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleMouseUp);
        };
    }, []);

    // Cache DOM tile references and position metadata whenever display items or page mode changes
    useEffect(() => {
        if (!canvasRef.current) return;
        const elements = canvasRef.current.querySelectorAll("[data-gallery-tile]");
        const list = [];
        elements.forEach((el) => {
            list.push({
                el,
                baseX: parseFloat(el.getAttribute("data-base-x")),
                baseY: parseFloat(el.getAttribute("data-base-y")),
                colHeight: parseFloat(el.getAttribute("data-col-height")),
            });
        });
        activeTiles.current = list;

        // Position items correctly at current offsets immediately
        updateTilePositions();
    }, [displayItems, fullPage, updateTilePositions]);

    // High performance animation loop using requestAnimationFrame
    useEffect(() => {
        let animationId;
        const tick = () => {
            if (!isDragging.current) {
                // Apply inertia decay
                velRef.current.x *= 0.94;
                velRef.current.y *= 0.94;
                targetOffset.current.x += velRef.current.x;
                targetOffset.current.y += velRef.current.y;
            }

            // Lerp physical offset to target offset (creates a smooth spring transition)
            offset.current.x += (targetOffset.current.x - offset.current.x) * 0.15;
            offset.current.y += (targetOffset.current.y - offset.current.y) * 0.15;

            // Only update CSS transforms if moving or dragging to conserve CPU cycles
            const moving =
                Math.abs(targetOffset.current.x - offset.current.x) > 0.01 ||
                Math.abs(targetOffset.current.y - offset.current.y) > 0.01 ||
                Math.abs(velRef.current.x) > 0.01 ||
                Math.abs(velRef.current.y) > 0.01;

            if (moving || isDragging.current) {
                updateTilePositions();
            }

            animationId = requestAnimationFrame(tick);
        };
        animationId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animationId);
    }, [updateTilePositions]);

    // Render static grid template where positions are updated dynamically in JS
    const renderTiles = () => {
        if (layout.length === 0) {
            return (
                <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-[#4a5a7a] font-sans text-[16px] p-10">
                    No results for "{search}"
                </div>
            );
        }

        const elements = [];

        for (let tx = 0; tx < numCopies; tx++) {
            for (let ty = 0; ty < numCopies; ty++) {
                layout.forEach((item) => {
                    const colHeight = colHeights[item.colIndex];
                    const totalHeight = numCopies * colHeight;

                    // Base nominal positions for this grid copy
                    const baseX = item.x + tx * blockWidth;
                    const baseY = item.y + ty * colHeight;

                    // Calculate initial wrapped position for offset = 0
                    const diffX = baseX;
                    const diffY = baseY;
                    const wrappedDiffX = ((diffX + totalWidth / 2) % totalWidth + totalWidth) % totalWidth - totalWidth / 2;
                    const wrappedDiffY = ((diffY + totalHeight / 2) % totalHeight + totalHeight) % totalHeight - totalHeight / 2;

                    elements.push(
                        <div
                            key={`tile-${tx}-${ty}-${item.uniqueId}`}
                            data-gallery-tile
                            data-base-x={baseX}
                            data-base-y={baseY}
                            data-col-height={colHeight}
                            className="absolute pointer-events-auto"
                            style={{
                                width: item.width,
                                height: item.height,
                                transform: `translate3d(${wrappedDiffX}px, ${wrappedDiffY}px, 0)`,
                                willChange: "transform",
                            }}
                        >
                            {/* Inner Container: Handles transitions, shadow, background, scale on hover */}
                            <div
                                className="w-full h-full rounded-[12px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-[transform,box-shadow] duration-300 hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(212,224,237,0.15)] group bg-navy relative"
                                style={{
                                    background: item.image ? "transparent" : item.color,
                                }}
                            >
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.label}
                                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: `linear-gradient(135deg, ${item.color} 0%, rgba(212,224,237,0.1) 100%)`,
                                        }}
                                    />
                                )}

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

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
                        </div>
                    );
                });
            }
        }
        return elements;
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
                onTouchStart={onTouchStart}
                className={clsx(
                    "w-full overflow-hidden relative rounded-xl bg-white border border-[#e8eef8] select-none touch-none cursor-grab",
                    fullPage ? "h-[calc(100vh-200px)] min-h-[500px]" : "h-[600px]",
                )}
                data-cursor="DRAG"
            >
                <div className="absolute w-full h-full">
                    <div className="absolute left-[50%] top-[50%]">
                        {renderTiles()}
                    </div>
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#e0e8f8] text-[#8899bb] font-mono text-[10px] tracking-[0.08em] pointer-events-none shadow-sm">
                    DRAG TO EXPLORE
                </div>
            </div>
        </div>
    );
}
