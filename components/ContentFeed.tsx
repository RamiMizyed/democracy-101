"use client";

import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
    useCallback,
} from "react";
import { Button } from "@/components/ui/button";
import {
    ThumbsUp,
    ThumbsDown,
    Play,
    Volume2,
    VolumeX,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { ContentItem } from "@/lib/data";
import { useVoteStore } from "@/lib/stores/useVoteStore";
import { useShallow } from "zustand/react/shallow";

interface ContentFeedProps {
    title: string;
    items: ContentItem[];
}

type VoteType = "up" | "down";

export default function ContentFeed({ title, items }: ContentFeedProps) {
    const { counts, userVotes, pending, toggleVote, hydrate } = useVoteStore(
        useShallow((s) => ({
            counts: s.counts,
            userVotes: s.userVotes,
            pending: s.pending,
            toggleVote: s.toggleVote,
            hydrate: s.hydrate,
        })),
    );

    // Reel UX state
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
    const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [activeId, setActiveId] = useState<string | null>(null);
    const [muted, setMuted] = useState(true);

    // Desktop nav state
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(true);

    // Tap vs scroll detection
    const pointerRef = useRef({
        x: 0,
        y: 0,
        moved: false,
        lastTap: 0,
    });

    // Toast
    const toastTimer = useRef<number | null>(null);
    const [toast, setToast] = useState<{ show: boolean; text: string }>({
        show: false,
        text: "",
    });

    const fireToast = (text: string) => {
        setToast({ show: true, text });
        if (toastTimer.current) window.clearTimeout(toastTimer.current);
        toastTimer.current = window.setTimeout(() => {
            setToast({ show: false, text: "" });
        }, 1500);
    };

    const ids = useMemo(() => items.map((i) => i.id), [items]);
    const idsKey = useMemo(() => ids.join(","), [ids]);

    // Hydrate votes
    useEffect(() => {
        if (!ids.length) return;
        hydrate(ids);
    }, [hydrate, idsKey, ids.length]);

    // Update scroll edges
    const updateScrollEdges = useCallback(() => {
        const el = scrollerRef.current;
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        const left = el.scrollLeft;
        setCanLeft(left > 10);
        setCanRight(left < max - 10);
    }, []);

    useEffect(() => {
        updateScrollEdges();
        const el = scrollerRef.current;
        if (!el) return;
        const onScroll = () => updateScrollEdges();
        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, [updateScrollEdges, idsKey]);

    // Detect active card via Intersection Observer
    useEffect(() => {
        if (!scrollerRef.current) return;
        const root = scrollerRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                const best = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

                if (best?.target) {
                    const id = (best.target as HTMLElement).dataset.id;
                    if (id) setActiveId(id);
                }
            },
            { root, threshold: 0.7 } 
        );

        const nodes = root.querySelectorAll("[data-reel]");
        nodes.forEach((n) => observer.observe(n));
        return () => observer.disconnect();
    }, [idsKey]);

    // Autoplay active video, pause others
    useEffect(() => {
        for (const [id, vid] of Object.entries(videoRefs.current)) {
            if (!vid) continue;
            vid.muted = muted;
            if (id === activeId) {
                const p = vid.play();
                if (p && typeof p.catch === "function") p.catch(() => {});
            } else {
                vid.pause();
            }
        }
    }, [activeId, muted]);

    const haptic = () => {
        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
            navigator.vibrate?.(10);
        }
    };

    const scrollToId = (id: string) => {
        const node = cardRefs.current[id];
        if (!node) return;
        node.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    };

    const activeIndex = useMemo(() => {
        if (!activeId) return 0;
        const idx = ids.indexOf(activeId);
        return idx >= 0 ? idx : 0;
    }, [activeId, ids]);

    const goPrev = () => scrollToId(ids[Math.max(0, activeIndex - 1)]);
    const goNext = () => scrollToId(ids[Math.min(ids.length - 1, activeIndex + 1)]);

    // Tap vs scroll logic
    const onPointerDown = (e: React.PointerEvent) => {
        pointerRef.current.x = e.clientX;
        pointerRef.current.y = e.clientY;
        pointerRef.current.moved = false;
    };

    const onPointerMove = (e: React.PointerEvent) => {
        const dx = Math.abs(e.clientX - pointerRef.current.x);
        const dy = Math.abs(e.clientY - pointerRef.current.y);
        if (dx > 10 || dy > 10) pointerRef.current.moved = true;
    };

    const onMediaPointerUp = (item: ContentItem) => {
        if (pointerRef.current.moved) return;

        const now = Date.now();
        const delta = now - pointerRef.current.lastTap;
        pointerRef.current.lastTap = now;

        // Double tap = Upvote
        if (delta < 300) {
            haptic();
            const before = userVotes[item.id] ?? null;
            const message = before === "up" ? "Removed 👍" : before ? "Switched to 👍" : "Saved 👍";
            fireToast(message);
            toggleVote(item.id, "up");
            return;
        }

        // Single tap = Play/Pause
        if (item.type === "video") {
            const vid = videoRefs.current[item.id];
            if (!vid) return;
            if (vid.paused) vid.play().catch(() => {});
            else vid.pause();
        }
    };

    const voteAction = (id: string, vote: VoteType) => {
        haptic();
        const before = userVotes[id] ?? null;
        let message = "";
        if (before === vote) message = vote === "up" ? "Removed 👍" : "Removed 👎";
        else if (before) message = vote === "up" ? "Switched to 👍" : "Switched to 👎";
        else message = vote === "up" ? "Saved 👍" : "Saved 👎";

        fireToast(message);
        toggleVote(id, vote);
    };

    if (items.length === 0) return null;

    // Shared editorial button style (stamp)
    const stampBtn =
        "inline-flex items-center gap-2.5 px-3 py-2 border-2 border-black bg-white " +
        "shadow-[4px_4px_0_0_rgba(0,0,0,1)] text-black font-black uppercase tracking-tight " +
        "transition-all duration-200 " +
        "hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] " +
        "active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

    return (
        <section className="w-full py-6 scroll-mt-28">
            
            {/* Header: Label & Global Navigation (aligned to px-8) */}
            <div className="flex items-center justify-between px-8 md:px-0 mb-8">
                <div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <span className="inline-block w-2 h-2 bg-[#FF4E02]" />
                    <h2 className="text-xs md:text-sm font-black uppercase tracking-[0.18em] text-black">
                        {title}
                    </h2>
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <span className="text-xs font-black uppercase tracking-widest text-black/40 mr-4">
                        {activeIndex + 1} / {items.length}
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={!canLeft}
                        onClick={goPrev}
                        className="rounded-none w-10 h-10 border-2 border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        disabled={!canRight}
                        onClick={goNext}
                        className="rounded-none w-10 h-10 border-2 border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Global Toast */}
            <div
                aria-live="polite"
                className={`
                    fixed top-24 left-1/2 -translate-x-1/2 z-[100] transition-all duration-200
                    ${toast.show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"}
                `}>
                <div className="border-2 border-black bg-[#FF4E02] px-4 py-2 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
                    <div className="text-sm font-black uppercase tracking-widest text-black">
                        {toast.text}
                    </div>
                </div>
            </div>

            {/* The Horizontal Slider (No peeking padding) */}
            <div
                ref={scrollerRef}
                className="
                    flex overflow-x-auto gap-8 
                    snap-x snap-mandatory 
                    pb-10 pt-4
                    no-scrollbar
                    scroll-smooth
                ">
                {items.map((item) => {
                    const itemCounts = counts[item.id] ?? { up: 0, down: 0 };
                    const myVote = userVotes[item.id] ?? null;
                    const isPending = pending[item.id] ?? false;
                    const isActive = activeId === item.id;

                    return (
                        <div
                            key={item.id}
                            ref={(el) => { cardRefs.current[item.id] = el; }}
                            data-reel
                            data-id={item.id}
                            className="
                                snap-center shrink-0 w-[390px]
                                flex flex-col group
                                border-2 border-black bg-white
                                shadow-[12px_12px_0_0_rgba(0,0,0,1)]
                                p-5
                                transition-transform duration-300
                                hover:-translate-y-1
                            ">
                            
                            {/* Media Box: Absolute 9:16 (Borders applied inside) */}
                            <div className="relative aspect-[9/16] border-2 border-black bg-zinc-900 overflow-hidden mb-5">
                                <div
                                    className="absolute inset-0 cursor-pointer"
                                    onPointerDown={onPointerDown}
                                    onPointerMove={onPointerMove}
                                    onPointerUp={() => onMediaPointerUp(item)}>
                                    {item.type === "video" ? (
                                        <video
                                            ref={(el) => { videoRefs.current[item.id] = el; }}
                                            src={item.src}
                                            className={`w-full h-full object-cover transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-80'}`}
                                            playsInline loop muted={muted} preload="metadata"
                                        />
                                    ) : (
                                        <img
                                            src={item.src}
                                            alt={item.title}
                                            className={`w-full h-full object-cover transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-80'}`}
                                        />
                                    )}
                                </div>

                                {/* Sound toggle - floating inside video */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setMuted((m) => !m);
                                        haptic();
                                    }}
                                    className="absolute top-3 right-3 z-20 border-2 border-black bg-white/70 backdrop-blur-sm p-1.5 shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-white transition-colors">
                                    {muted ? <VolumeX className="w-4 h-4 text-black" /> : <Volume2 className="w-4 h-4 text-black" />}
                                </button>
                                
                                {/* Status Icon Overlay (Play indication) */}
                                {item.type === "video" && videoRefs.current[item.id]?.paused && (
                                    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-40">
                                        <div className="border-4 border-black bg-white/60 p-3 rounded-full">
                                            <Play className="w-10 h-10 text-black ml-1" fill="currentColor" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Info Area: SOLID TEXT, NOT OVER VIDEO */}
                            <div className="flex-1 flex flex-col pointer-events-auto">
                                <h3 className="text-2xl font-black uppercase tracking-tight text-black line-clamp-2 leading-none">
                                    {item.title}
                                </h3>
                                
                                <p className="mt-2 text-sm font-semibold text-black/70 leading-relaxed line-clamp-2">
                                    Double tap the media above to mark as helpful practice for your civic loop.
                                </p>

                                {/* Dashed Divider */}
                                <div className="mt-5 border-t-2 border-dashed border-black pt-5" />

                                {/* Action Row: Category & Both Buttons show horizontally */}
                                <div className="flex items-center justify-between gap-4 mt-auto">
                                    <div className="flex items-center gap-2">
                                        <div className="inline-block bg-[#FF4E02] text-black px-2 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] mr-1">
                                            {item.category}
                                        </div>
                                        {isActive && item.type === "video" && <Play className="w-4 h-4 text-black/40" /> }
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        {/* 👍 Like stamp */}
                                        <button
                                            disabled={isPending}
                                            onClick={(e) => { e.stopPropagation(); voteAction(item.id, "up"); }}
                                            className={`${stampBtn} ${myVote === "up" ? 'border-[#FF4E02] bg-white' : 'border-black bg-white'}`}>
                                            <ThumbsUp className={`w-4 h-4 ${myVote === "up" ? 'text-[#FF4E02]' : 'text-black'}`} fill={myVote === "up" ? 'currentColor' : 'none'} />
                                            <span className={`text-xs ${myVote === "up" ? 'text-[#FF4E02]' : 'text-black'}`}>{itemCounts.up}</span>
                                        </button>

                                        {/* 👎 Dislike stamp */}
                                        <button
                                            disabled={isPending}
                                            onClick={(e) => { e.stopPropagation(); voteAction(item.id, "down"); }}
                                            className={`${stampBtn} ${myVote === "down" ? 'border-zinc-900 bg-zinc-900' : 'border-black bg-white'}`}>
                                            <ThumbsDown className={`w-4 h-4 ${myVote === "down" ? 'text-white' : 'text-black'}`} fill={myVote === "down" ? 'currentColor' : 'none'} />
                                            <span className={`text-xs ${myVote === "down" ? 'text-white' : 'text-black'}`}>{itemCounts.down}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
        </section>
    );
}