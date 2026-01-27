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
		}, 1050);
	};

	const ids = useMemo(() => items.map((i) => i.id), [items]);
	const idsKey = useMemo(() => ids.join(","), [ids]);

	// hydrate votes on page load
	useEffect(() => {
		if (!ids.length) return;
		hydrate(ids);
	}, [hydrate, idsKey, ids.length]);

	// update desktop scroll availability
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

	// Detect active card
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

	// Autoplay only active video
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

	const goPrev = () => scrollToId(ids[Math.max(0, activeIndex - 1)]);
	const goNext = () =>
		scrollToId(ids[Math.min(ids.length - 1, activeIndex + 1)]);

	// Desktop: wheel scroll horizontally
	const onDesktopWheel = (e: React.WheelEvent<HTMLDivElement>) => {
		const el = scrollerRef.current;
		if (!el) return;
		if (window.innerWidth < 768) return;

		if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
			e.preventDefault();
			el.scrollLeft += e.deltaY;
		}
	};

	// Tap vs scroll safe handlers
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

		// double tap = helpful
		if (delta < 260) {
			haptic();

			const before = userVotes[item.id] ?? null;
			const message =
				before === "up" ? "Removed 👍" : before ? "Switched to 👍" : "Saved 👍";

			fireToast(message);
			toggleVote(item.id, "up");
			return;
		}

		// single tap = pause/play video
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

	// small shared styles (punk-lite)
	const punchBtn =
		"rounded-none border-2 border-black bg-white/10 text-white font-black " +
		"shadow-[6px_6px_0_0_rgba(0,0,0,0.9)] " +
		"hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.9)] " +
		"active:translate-x-[2px] active:translate-y-[2px] transition";

	return (
		<section className="w-full py-10">
			{/* Header row (more like a label) */}
			<div className="flex items-center justify-between mb-4 px-4 md:px-0">
				<div className="flex items-center gap-3">
					<div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
						<span className="inline-block w-2 h-2 bg-[#FF4E02]" />
						<h2 className="text-sm md:text-base font-black uppercase tracking-[0.18em] text-black">
							{title}
						</h2>
					</div>

					<span className="hidden md:inline-flex text-xs font-black uppercase tracking-[0.18em] text-black/60">
						{activeIndex + 1}/{items.length}
					</span>
				</div>

				<div className="hidden md:flex items-center gap-2">
					<span className="text-xs font-semibold text-black/55">
						Wheel to scroll • Double tap = Helpful
					</span>

					<Button
						variant="outline"
						size="icon"
						disabled={!canLeft}
						onClick={goPrev}
						className="rounded-none border-2 border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
						<ChevronLeft className="w-4 h-4" />
					</Button>

					<Button
						variant="outline"
						size="icon"
						disabled={!canRight}
						onClick={goNext}
						className="rounded-none border-2 border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
						<ChevronRight className="w-4 h-4" />
					</Button>
				</div>
			</div>

			<div className="relative">
				{/* Desktop floating arrows */}
				<div className="hidden md:block pointer-events-none">
					<div className="pointer-events-auto absolute left-2 top-1/2 -translate-y-1/2 z-30">
						<Button
							variant="secondary"
							size="icon"
							disabled={!canLeft}
							onClick={goPrev}
							className="rounded-none border-2 border-black bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
							<ChevronLeft className="w-5 h-5" />
						</Button>
					</div>

					<div className="pointer-events-auto absolute right-2 top-1/2 -translate-y-1/2 z-30">
						<Button
							variant="secondary"
							size="icon"
							disabled={!canRight}
							onClick={goNext}
							className="rounded-none border-2 border-black bg-white shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
							<ChevronRight className="w-5 h-5" />
						</Button>
					</div>
				</div>

				{/* Mobile Next Button */}
				<div className="md:hidden pointer-events-none">
					<div className="pointer-events-auto fixed right-4 z-50 bottom-[max(1.25rem,env(safe-area-inset-bottom))]">
						<Button
							onClick={goNext}
							disabled={activeIndex >= items.length - 1}
							className="
                rounded-none border-2 border-black
                px-4 py-5 h-auto
                bg-[#FF4E02] text-[#141414] font-black uppercase
                shadow-[8px_8px_0_0_rgba(0,0,0,1)]
                hover:translate-x-[1px] hover:translate-y-[1px]
                hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)]
                active:translate-x-[2px] active:translate-y-[2px]
                transition
              ">
							<span className="mr-2">Next</span>
							<ChevronUp className="w-4 h-4 rotate-90" />
						</Button>
					</div>
				</div>

				{/* Toast (stamp style) */}
				<div
					aria-live="polite"
					className={`
            fixed left-1/2 -translate-x-1/2 z-[60]
            bottom-[calc(env(safe-area-inset-bottom)+1.25rem)]
            transition-all duration-200
            ${toast.show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
          `}>
					<div className="border-2 border-black bg-white px-3 py-2 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
						<div className="text-xs font-black uppercase tracking-[0.18em] text-black">
							<span className="mr-2 inline-block w-2 h-2 bg-[#FF4E02]" />
							{toast.text}
						</div>
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
            md:pb-8 md:gap-6 md:px-0
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
                  md:w-[390px] md:h-[670px]
                ">
								<Card
									className={`
                    relative overflow-hidden
                    rounded-none border-2
                    bg-black h-full w-full
                    shadow-[10px_10px_0_0_rgba(0,0,0,1)]
                    transition
                    ${isActive ? "border-[#FF4E02]" : "border-white/20"}
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

									{/* TOP BAR */}
									<div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-start justify-between">
										<div className="flex flex-col gap-2">
											{/* category stamp */}
											<div className="inline-flex items-center gap-2 border-2 border-white/80 bg-black/55 backdrop-blur-sm px-3 py-1">
												<span className="inline-block w-2 h-2 bg-[#FF4E02]" />
												<span className="text-[11px] font-black uppercase tracking-[0.22em] text-white">
													{item.category}
												</span>
											</div>

											{isActive && (
												<span className="text-[11px] font-semibold text-white/70">
													{item.type === "video"
														? "Tap = pause • Double tap = Helpful"
														: "Double tap = Helpful"}
												</span>
											)}
										</div>

										{/* sound button (hard) */}
										<button
											onClick={(e) => {
												e.stopPropagation();
												setMuted((m) => !m);
												haptic();
											}}
											className="
                        border-2 border-white/70
                        bg-black/55 backdrop-blur-sm
                        px-2 py-2
                        shadow-[5px_5px_0_0_rgba(0,0,0,0.9)]
                        text-white
                        hover:translate-x-[1px] hover:translate-y-[1px]
                        hover:shadow-[3px_3px_0_0_rgba(0,0,0,0.9)]
                        transition
                      "
											aria-label={muted ? "Unmute" : "Mute"}>
											{muted ? (
												<VolumeX className="w-4 h-4" />
											) : (
												<Volume2 className="w-4 h-4" />
											)}
										</button>
									</div>

									{/* BOTTOM GRADIENT */}
									<div className="absolute inset-x-0 bottom-0 z-10 h-[68%] bg-gradient-to-t from-black via-black/45 to-transparent" />

									{/* BOTTOM UI */}
									<div className="absolute bottom-0 left-0 right-0 z-20 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
										<div className="flex items-end gap-4">
											{/* Title + desc as “cutout” label */}
											<div className="flex-1 min-w-0">
												{/* tape */}
												<div className="pointer-events-none mb-2 flex gap-2">
													<div className="h-3 w-16 bg-white/20 rotate-[-6deg]" />
													<div className="h-3 w-10 bg-white/20 rotate-[8deg]" />
												</div>

												<div
													className="
                            border-2 border-white/70
                            bg-black/40 backdrop-blur-md
                            px-4 py-3
                            shadow-[8px_8px_0_0_rgba(0,0,0,0.9)]
                          ">
													<h3 className="text-white font-black text-xl leading-tight line-clamp-2">
														{item.title}
													</h3>

													<p className="mt-1.5 text-white/75 text-sm leading-relaxed line-clamp-2">
														Short, practical civic knowledge — made simple.
													</p>

													{myVote && (
														<p className="mt-2 text-xs text-white/65 font-semibold">
															Saved ✅ Tap again to undo.
														</p>
													)}
												</div>
											</div>

											{/* Action rail (integrated) */}
											<div className="flex flex-col items-center gap-3">
												<Button
													disabled={isPending}
													variant="ghost"
													onClick={(e) => {
														e.stopPropagation();
														voteAction(item.id, "up");
													}}
													className={`${punchBtn} w-12 h-12 p-0 ${
														myVote === "up"
															? "border-[#FF4E02]"
															: "border-white/50"
													}`}
													aria-label="Helpful">
													<ThumbsUp
														className={`w-5 h-5 ${
															myVote === "up" ? "text-[#FF4E02]" : "text-white"
														}`}
														fill={myVote === "up" ? "currentColor" : "none"}
													/>
												</Button>
												<span className="text-white/85 text-xs font-black -mt-2">
													{itemCounts.up}
												</span>

												<Button
													disabled={isPending}
													variant="ghost"
													onClick={(e) => {
														e.stopPropagation();
														voteAction(item.id, "down");
													}}
													className={`${punchBtn} w-12 h-12 p-0 ${
														myVote === "down"
															? "border-red-300"
															: "border-white/50"
													}`}
													aria-label="Confusing">
													<ThumbsDown
														className={`w-5 h-5 ${
															myVote === "down" ? "text-red-300" : "text-white"
														}`}
														fill={myVote === "down" ? "currentColor" : "none"}
													/>
												</Button>
												<span className="text-white/85 text-xs font-black -mt-2">
													{itemCounts.down}
												</span>

												{item.type === "video" && (
													<div className="mt-1 flex items-center justify-center text-white/75">
														<Play className="w-4 h-4" />
													</div>
												)}
											</div>
										</div>

										{isPending && (
											<div className="mt-3 text-xs text-white/70 font-semibold">
												Saving…
											</div>
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
                  h-2 transition-all border border-black
                  ${isOn ? "w-7 bg-[#FF4E02]" : "w-2 bg-white"}
                `}
							/>
						);
					})}

					{ids.length > 8 && (
						<span className="ml-2 text-xs font-black text-black/60">
							{activeIndex + 1}/{ids.length}
						</span>
					)}
				</div>
			</div>
		</section>
	);
}
