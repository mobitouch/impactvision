import { useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react';

const DEFAULT_IMAGES = [
    {
        src: '/gallery/1000060620_cd46f130f6f4181e3ca191796759d9d7-1_1_2024, 1_59_46 PM_20250827_134740_0000.webp',
        alt: 'Stage Setup',
    },
    {
        src: '/gallery/1000060670_eb8900016d3bfc5f3dd6459a47659434-1_1_2024, 1_51_02 PM_20250827_135707_0000.webp',
        alt: 'Lighting Design',
    },
    {
        src: '/gallery/1000060870_ee61a640d1fdf37c22887fbeb4e8e2c9-1_3_2024, 1_15_47 PM_20250827_135304_0000.webp',
        alt: 'Rigging Trusses',
    },
    {
        src: '/gallery/1000061251_04b5b4be81e937a5225bc2e8b6e69d18-1_6_2024, 2_13_45 PM_20250827_134730_0000.webp',
        alt: 'Concert Sound',
    },
    {
        src: '/gallery/1000062334_9587f5da3412ebb9132551f11d43a420-1_14_2024, 4_53_25 PM_20250827_135849_0000.webp',
        alt: 'LED Systems',
    },
    {
        src: '/gallery/1000066044_bcc5e0b6cf0055c901ceffbb821393ce-2_17_2024, 2_26_36 PM_20250827_135720_0000.webp',
        alt: 'Stage Production',
    },
];

/* ── Layout constants ───────────────────────────────────────────────── */
const GAP = 16;
const MAIN_W = 280;
const MAIN_H = 420;
const SIDE_W = 210;
const SIDE_H = 290;
const CONTAINER_H = 440;
const SIDE_COUNT = 3;
const INTERVAL = 3500;
const DURATION = 800;

/* Shared img style */
const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    borderRadius: 0,
    border: 'none',
    boxShadow: 'none',
};

const ease = 'cubic-bezier(0.45, 0.05, 0.15, 0.95)';

/* ── Component ──────────────────────────────────────────────────────── */
const EditorialCarousel = ({ images }) => {
    const items = images && images.length > 0 ? images : DEFAULT_IMAGES;

    const [queue, setQueue] = useState(() => items.map((_, i) => i));
    const [phase, setPhase] = useState('idle');
    const incomingRef = useRef(null);
    const outgoingRef = useRef(null);

    const sideX = (slot) => MAIN_W + GAP + slot * (SIDE_W + GAP);

    /* ── Trigger swap cycle ─────────────────────────────────────────── */
    const triggerSwap = useCallback(() => {
        if (phase !== 'idle') return;
        setPhase('start');
    }, [phase]);

    useEffect(() => {
        const id = setInterval(triggerSwap, INTERVAL);
        return () => clearInterval(id);
    }, [triggerSwap]);

    /* ── Two-phase animation ────────────────────────────────────────── */
    useLayoutEffect(() => {
        if (phase === 'start') {
            incomingRef.current?.getBoundingClientRect();
            outgoingRef.current?.getBoundingClientRect();
            requestAnimationFrame(() => {
                setPhase('animating');
            });
        }
    }, [phase]);

    useEffect(() => {
        if (phase !== 'animating') return;
        const timeout = setTimeout(() => {
            setQueue((prev) => [...prev.slice(1), prev[0]]);
            setPhase('idle');
        }, DURATION);
        return () => clearTimeout(timeout);
    }, [phase]);

    /* ── Derive current display ─────────────────────────────────────── */
    const mainIndex = queue[0];
    const sideQueue = queue.slice(1, 1 + SIDE_COUNT);
    const nextMainIndex = queue[1];

    const trans = (props = 'left, width, height, opacity, transform') =>
        props
            .split(',')
            .map((p) => `${p.trim()} ${DURATION}ms ${ease}`)
            .join(', ');

    return (
        <div
            style={{
                position: 'relative',
                overflow: 'hidden',
                height: CONTAINER_H,
                width: '100%',
            }}
        >
            {/* ── MAIN IMAGE (outgoing — fades to the LEFT) ───────────── */}
            <div
                ref={outgoingRef}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    transition: phase === 'animating' ? trans() : 'none',
                    zIndex: 2,
                    ...(phase === 'animating'
                        ? {
                            left: -MAIN_W - 30,          // slide OFF-SCREEN to the LEFT
                            width: MAIN_W,
                            height: MAIN_H,
                            opacity: 0,
                            transform: 'scale(1)',
                        }
                        : {
                            left: 0,
                            width: MAIN_W,
                            height: MAIN_H,
                            opacity: 1,
                            transform: 'scale(1)',
                        }),
                }}
            >
                <img src={items[mainIndex].src} alt={items[mainIndex].alt} style={imgStyle} />
            </div>

            {/* ── INCOMING IMAGE (first side → main) ──────────────────── */}
            {phase !== 'idle' && (
                <div
                    ref={incomingRef}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        transition: phase === 'animating' ? trans() : 'none',
                        zIndex: 3,
                        ...(phase === 'start'
                            ? {
                                left: sideX(0),
                                width: SIDE_W,
                                height: SIDE_H,
                                opacity: 1,
                                transform: 'scale(1)',
                            }
                            : {
                                left: 0,
                                width: MAIN_W,
                                height: MAIN_H,
                                opacity: 1,
                                transform: 'scale(1)',
                            }),
                    }}
                >
                    <img src={items[nextMainIndex].src} alt={items[nextMainIndex].alt} style={imgStyle} />
                </div>
            )}

            {/* ── SIDE IMAGES ─────────────────────────────────────────── */}
            {sideQueue.map((imgIdx, slot) => {
                let left = sideX(slot);
                let opacity = 1;

                if (phase === 'animating') {
                    if (slot === 0) {
                        opacity = 0;
                    } else {
                        left = sideX(slot - 1);
                    }
                }

                return (
                    <div
                        key={`side-${imgIdx}`}
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left,
                            width: SIDE_W,
                            height: SIDE_H,
                            opacity,
                            transition: phase === 'animating' ? trans('left, opacity') : 'none',
                            zIndex: 1,
                        }}
                    >
                        <img src={items[imgIdx].src} alt={items[imgIdx].alt} style={imgStyle} />
                    </div>
                );
            })}

            {/* ── ENTERING SIDE IMAGE (from the right) ────────────────── */}
            {phase !== 'idle' && queue.length > 1 + SIDE_COUNT && (() => {
                const enteringIdx = queue[1 + SIDE_COUNT];
                return (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            transition: phase === 'animating' ? trans('left, opacity') : 'none',
                            zIndex: 1,
                            ...(phase === 'start'
                                ? {
                                    left: sideX(SIDE_COUNT),
                                    width: SIDE_W,
                                    height: SIDE_H,
                                    opacity: 0,
                                }
                                : {
                                    left: sideX(SIDE_COUNT - 1),
                                    width: SIDE_W,
                                    height: SIDE_H,
                                    opacity: 1,
                                }),
                        }}
                    >
                        <img src={items[enteringIdx].src} alt={items[enteringIdx].alt} style={imgStyle} />
                    </div>
                );
            })()}
        </div>
    );
};

export default EditorialCarousel;
