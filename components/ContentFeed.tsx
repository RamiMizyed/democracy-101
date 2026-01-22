"use client";

import React, {
	useEffect,
	useMemo,
	useRef,
	useState,
	useCallback,
} from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	ThumbsUp,
	ThumbsDown,
	Play,
	Volume2,
	VolumeX,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
	const [canRight, setCanRight] = useState(false);

	// Tap vs scroll detection (prevents tap layer killing scroll)
	const pointerRef = useRef({
		x: 0,
		y: 0,
		moved: false,
		lastTap: 0,
	});

	// ✅ Toast
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
		}, 1050);
	};

	const ids = useMemo(() => items.map((i) => i.id), [items]);
	const idsKey = useMemo(() => ids.join(","), [ids]);

	// ✅ hydrate votes on page load
	useEffect(() => {
		if (!ids.length) return;
		hydrate(ids);
	}, [hydrate, idsKey, ids.length]);

	// ✅ update desktop scroll availability
	const updateScrollEdges = useCallback(() => {
		const el = scrollerRef.current;
		if (!el) return;

		const max = el.scrollWidth - el.clientWidth;
		const left = el.scrollLeft;

		setCanLeft(left > 8);
		setCanRight(left < max - 8);
	}, []);

	useEffect(() => {
		updateScrollEdges();
		const el = scrollerRef.current;
		if (!el) return;

		const onScroll = () => updateScrollEdges();
		el.addEventListener("scroll", onScroll, { passive: true });

		return () => el.removeEventListener("scroll", onScroll);
	}, [updateScrollEdges, idsKey]);

	// ✅ Detect which card is active (in view)
	useEffect(() => {
		if (!scrollerRef.current) return;

		const root = scrollerRef.current;

		const observer = new IntersectionObserver(
			(entries) => {
				const best = entries
					.filter((e) => e.isIntersecting)
					.sort(
						(a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
					)[0];

				if (best?.target) {
					const id = (best.target as HTMLElement).dataset.id;
					if (id) setActiveId(id);
				}
			},
			{
				root,
				threshold: [0.55, 0.7, 0.85],
			},
		);

		const nodes = root.querySelectorAll("[data-reel]");
		nodes.forEach((n) => observer.observe(n));

		return () => observer.disconnect();
	}, [idsKey]);

	// ✅ Autoplay only active video
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
			// @ts-ignore
			navigator.vibrate?.(10);
		}
	};

	const scrollToId = (id: string) => {
		const node = cardRefs.current[id];
		if (!node) return;

		node.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
			inline: "center",
		});
	};

	const activeIndex = useMemo(() => {
		if (!activeId) return 0;
		const idx = ids.indexOf(activeId);
		return idx >= 0 ? idx : 0;
	}, [activeId, ids]);

	const goPrev = () => {
		const prev = Math.max(0, activeIndex - 1);
		scrollToId(ids[prev]);
	};

	const goNext = () => {
		const next = Math.min(ids.length - 1, activeIndex + 1);
		scrollToId(ids[next]);
	};

	// ✅ Desktop: wheel scroll horizontally
	const onDesktopWheel = (e: React.WheelEvent<HTMLDivElement>) => {
		const el = scrollerRef.current;
		if (!el) return;
		if (window.innerWidth < 768) return;

		if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
			e.preventDefault();
			el.scrollLeft += e.deltaY;
		}
	};

	// ✅ Tap vs scroll safe handlers
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

		// ✅ double tap = helpful
		if (delta < 260) {
			haptic();

			const before = userVotes[item.id] ?? null;
			// helpful press
			const message =
				before === "up" ? "Removed 👍" : before ? "Switched to 👍" : "Saved 👍";
			fireToast(message);

			toggleVote(item.id, "up");
			return;
		}

		// ✅ single tap = pause/play video
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
		const message =
			before === vote
				? vote === "up"
					? "Removed 👍"
					: "Removed 👎"
				: before
					? vote === "up"
						? "Switched to 👍"
						: "Switched to 👎"
					: vote === "up"
						? "Saved 👍"
						: "Saved 👎";

		fireToast(message);
		toggleVote(id, vote);
	};

	if (items.length === 0) return null;

	return (
		<section className="w-full py-8">
			{/* Header row */}
			<div className="flex items-center justify-between mb-4 px-4 md:px-0">
				<div className="flex items-center gap-3">
					<h2 className="text-2xl font-extrabold text-zinc-900">{title}</h2>
					<span className="hidden md:inline-flex text-xs font-semibold text-zinc-500">
						{activeIndex + 1} / {items.length}
					</span>
				</div>

				<div className="hidden md:flex items-center gap-2">
					<span className="text-xs text-zinc-500">
						Wheel to scroll • Double tap = Helpful
					</span>

					<Button
						variant="outline"
						size="icon"
						disabled={!canLeft}
						onClick={goPrev}
						className="rounded-full">
						<ChevronLeft className="w-4 h-4" />
					</Button>

					<Button
						variant="outline"
						size="icon"
						disabled={!canRight}
						onClick={goNext}
						className="rounded-full">
						<ChevronRight className="w-4 h-4" />
					</Button>
				</div>
			</div>

			{/* Scroller wrapper */}
			<div className="relative">
				{/* Desktop floating arrows */}
				<div className="hidden md:block pointer-events-none">
					<div className="pointer-events-auto absolute left-2 top-1/2 -translate-y-1/2 z-30">
						<Button
							variant="secondary"
							size="icon"
							disabled={!canLeft}
							onClick={goPrev}
							className="
                rounded-full shadow-md
                bg-white/70 backdrop-blur-md
                border border-black/10
              ">
							<ChevronLeft className="w-5 h-5" />
						</Button>
					</div>

					<div className="pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2 z-30">
						<Button
							variant="secondary"
							size="icon"
							disabled={!canRight}
							onClick={goNext}
							className="
                rounded-full shadow-md
                bg-white/70 backdrop-blur-md
                border border-black/10
              ">
							<ChevronRight className="w-5 h-5" />
						</Button>
					</div>
				</div>

				{/* ✅ Mobile Next Button (Reels style) */}
				<div className="md:hidden pointer-events-none">
					<div className="pointer-events-auto fixed right-4 z-50 bottom-[max(1.25rem,env(safe-area-inset-bottom))]">
						<Button
							onClick={goNext}
							disabled={activeIndex >= items.length - 1}
							className="
                rounded-full
                px-4 py-5
                h-auto
                shadow-[0_18px_50px_rgba(0,0,0,0.35)]
                bg-[#FF4E02] text-[#141414] font-extrabold
                hover:bg-[#FF4E02]/90
                active:scale-[0.98]
                transition
              ">
							<span className="mr-2">Next</span>
							<ChevronUp className="w-4 h-4 rotate-90" />
						</Button>
					</div>
				</div>

				{/* ✅ Toast (glass) */}
				<div
					aria-live="polite"
					className={`
            fixed left-1/2 -translate-x-1/2 z-[60]
            bottom-[calc(env(safe-area-inset-bottom)+1.25rem)]
            transition-all duration-250
            ${toast.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
          `}>
					<div
						className="
              px-4 py-2 rounded-full
              bg-white/70 backdrop-blur-xl
              border border-black/10
              shadow-md
              text-sm font-semibold text-zinc-900
            ">
						{toast.text}
					</div>
				</div>

				{/* Scroller */}
				<div
					ref={scrollerRef}
					onWheel={onDesktopWheel}
					style={{ touchAction: "pan-y" }}
					className="
            relative
            flex flex-col
            h-[82svh] w-full overflow-y-auto
            snap-y snap-proximity
            gap-6 px-4
            no-scrollbar

            md:flex-row md:h-auto
            md:overflow-x-auto md:overflow-y-hidden
            md:snap-x md:snap-proximity
            md:pb-8 md:gap-5 md:px-0
          ">
					{items.map((item) => {
						const itemCounts = counts[item.id] ?? { up: 0, down: 0 };
						const myVote = userVotes[item.id] ?? null;
						const isPending = pending[item.id] ?? false;
						const isActive = activeId === item.id;

						return (
							<div
								key={item.id}
								ref={(el) => {
									cardRefs.current[item.id] = el;
								}}
								data-reel
								data-id={item.id}
								className="
                  snap-center shrink-0
                  w-full h-[82svh]
                  md:w-[380px] md:h-[660px]
                ">
								<Card
									className={`
    relative overflow-hidden rounded-3xl
    border bg-black
    h-full w-full
    transition-all duration-300
    ${isActive ? "ring-2 ring-[#FF4E02]/35 border-white/15" : "opacity-95 border-white/10"}
  `}>
									{/* MEDIA */}
									<div
										className="absolute inset-0"
										onPointerDown={onPointerDown}
										onPointerMove={onPointerMove}
										onPointerUp={() => onMediaPointerUp(item)}
										role="button"
										aria-label="Media">
										{item.type === "video" ? (
											<>
												<video
													ref={(el) => {
														videoRefs.current[item.id] = el;
													}}
													src={item.src}
													className="h-full w-full object-cover"
													playsInline
													loop
													muted={muted}
													preload="metadata"
												/>
												<div className="absolute inset-0 bg-black/10" />
											</>
										) : (
											<>
												<img
													src={item.src}
													alt={item.title}
													className="h-full w-full object-cover"
												/>
												<div className="absolute inset-0 bg-black/10" />
											</>
										)}
									</div>

									{/* TOP */}
									<div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-start justify-between">
										<div className="flex flex-col gap-2">
											<Badge className="bg-white/12 text-white border-white/20 backdrop-blur-md">
												{item.category}
											</Badge>

											{isActive && (
												<span className="text-[11px] text-white/70">
													{item.type === "video"
														? "Tap = pause • Double tap = Helpful"
														: "Double tap = Helpful"}
												</span>
											)}
										</div>

										<button
											onClick={(e) => {
												e.stopPropagation();
												setMuted((m) => !m);
												haptic();
											}}
											className="
                        rounded-full p-2
                        bg-white/10 border border-white/15
                        text-white/90 backdrop-blur-md
                        hover:bg-white/15 transition
                      "
											aria-label={muted ? "Unmute" : "Mute"}>
											{muted ? (
												<VolumeX className="w-4 h-4" />
											) : (
												<Volume2 className="w-4 h-4" />
											)}
										</button>
									</div>

									{/* Stronger gradient */}
									<div className="absolute inset-x-0 bottom-0 z-10 h-[66%] bg-gradient-to-t from-black via-black/50 to-transparent" />

									{/* ✅ TikTok-style title blur pill */}
									<div
										className="
                      absolute bottom-0 left-0 right-0 z-20
                      p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]
                    ">
										<div className="flex items-end gap-4">
											<div className="flex-1 min-w-0">
												<div
													className="
                            inline-block
                            rounded-2xl
                            bg-black/35 backdrop-blur-xl
                            border border-white/10
                            px-4 py-3
                            shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                          ">
													<h3 className="text-white font-extrabold text-xl leading-tight line-clamp-2">
														{item.title}
													</h3>

													<p className="mt-1.5 text-white/75 text-sm leading-relaxed line-clamp-2">
														Short, practical civic knowledge — made simple.
													</p>

													{myVote && (
														<p className="mt-2 text-xs text-white/55">
															Saved ✅ Tap again to undo.
														</p>
													)}
												</div>
											</div>

											{/* Action rail */}
											<div className="flex flex-col items-center gap-3">
												<Button
													disabled={isPending}
													variant="ghost"
													onClick={(e) => {
														e.stopPropagation();
														voteAction(item.id, "up");
													}}
													className={`
                            rounded-full w-12 h-12 p-0
                            border border-white/15
                            bg-white/10 backdrop-blur-md
                            hover:bg-white/15 transition
                            ${myVote === "up" ? "ring-2 ring-[#FF4E02]/55" : ""}
                          `}
													aria-label="Helpful">
													<ThumbsUp
														className={`w-5 h-5 ${
															myVote === "up"
																? "text-[#FF4E02]"
																: "text-white/90"
														}`}
														fill={myVote === "up" ? "currentColor" : "none"}
													/>
												</Button>

												<span className="text-white/85 text-xs font-semibold -mt-2">
													{itemCounts.up}
												</span>

												<Button
													disabled={isPending}
													variant="ghost"
													onClick={(e) => {
														e.stopPropagation();
														voteAction(item.id, "down");
													}}
													className={`
                            rounded-full w-12 h-12 p-0
                            border border-white/15
                            bg-white/10 backdrop-blur-md
                            hover:bg-white/15 transition
                            ${myVote === "down" ? "ring-2 ring-red-400/55" : ""}
                          `}
													aria-label="Confusing">
													<ThumbsDown
														className={`w-5 h-5 ${
															myVote === "down"
																? "text-red-300"
																: "text-white/90"
														}`}
														fill={myVote === "down" ? "currentColor" : "none"}
													/>
												</Button>

												<span className="text-white/85 text-xs font-semibold -mt-2">
													{itemCounts.down}
												</span>

												{item.type === "video" && (
													<div className="mt-1 flex items-center justify-center text-white/70">
														<Play className="w-4 h-4" />
													</div>
												)}
											</div>
										</div>

										{isPending && (
											<div className="mt-3 text-xs text-white/60">Saving…</div>
										)}
									</div>
								</Card>
							</div>
						);
					})}
				</div>

				{/* Mobile progress dots */}
				<div className="md:hidden mt-4 flex items-center justify-center gap-2">
					{ids.slice(0, 8).map((id, idx) => {
						const isOn = ids[activeIndex] === id;
						return (
							<button
								key={id}
								onClick={() => scrollToId(id)}
								aria-label={`Go to item ${idx + 1}`}
								className={`
                  h-2 rounded-full transition-all
                  ${isOn ? "w-7 bg-[#FF4E02]" : "w-2 bg-black/15"}
                `}
							/>
						);
					})}

					{ids.length > 8 && (
						<span className="ml-2 text-xs text-zinc-500">
							{activeIndex + 1}/{ids.length}
						</span>
					)}
				</div>
			</div>
		</section>
	);
}
