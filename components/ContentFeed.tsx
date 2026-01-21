"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Play, Volume2, VolumeX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ContentItem } from "@/lib/data";
import { useVoteStore } from "@/lib/stores/useVoteStore";

interface ContentFeedProps {
	title: string;
	items: ContentItem[];
}

export default function ContentFeed({ title, items }: ContentFeedProps) {
	const counts = useVoteStore((s) => s.counts);
	const userVotes = useVoteStore((s) => s.userVotes);
	const pending = useVoteStore((s) => s.pending);
	const toggleVote = useVoteStore((s) => s.toggleVote);

	// Reel UX state
	const scrollerRef = useRef<HTMLDivElement | null>(null);
	const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
	const [activeId, setActiveId] = useState<string | null>(null);

	const [muted, setMuted] = useState(true);

	// For “double tap to vote”
	const lastTapRef = useRef<number>(0);

	const ids = useMemo(() => items.map((i) => i.id), [items]);
	const hydrate = useVoteStore((s) => s.hydrate);

	useEffect(() => {
		hydrate(ids);
	}, [hydrate, ids.join(",")]);
	// ✅ Detect which card is “active” (in view)
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
	}, [ids.join(",")]);

	// ✅ Autoplay active video only (reels behavior)
	useEffect(() => {
		for (const [id, vid] of Object.entries(videoRefs.current)) {
			if (!vid) continue;

			vid.muted = muted;

			if (id === activeId) {
				// Try play (mobile policies may require user gesture)
				const p = vid.play();
				if (p && typeof p.catch === "function") p.catch(() => {});
			} else {
				vid.pause();
				vid.currentTime = 0;
			}
		}
	}, [activeId, muted]);

	const haptic = () => {
		// small vibration on mobile (safe)
		if (typeof navigator !== "undefined" && "vibrate" in navigator) {
			// @ts-ignore
			navigator.vibrate?.(12);
		}
	};

	const onMediaTap = (item: ContentItem) => {
		// single tap: play/pause (for video)
		// double tap: Helpful vote 👍
		const now = Date.now();
		const delta = now - lastTapRef.current;
		lastTapRef.current = now;

		if (delta < 260) {
			haptic();
			toggleVote(item.id, "up");
			return;
		}

		if (item.type === "video") {
			const vid = videoRefs.current[item.id];
			if (!vid) return;

			if (vid.paused) vid.play().catch(() => {});
			else vid.pause();
		}
	};

	if (items.length === 0) return null;

	return (
		<section className="w-full py-6">
			<div className="flex items-center justify-between mb-4 px-4 md:px-0">
				<h2 className="text-2xl font-bold text-zinc-800">{title}</h2>

				{/* Small hint chip */}
				<span className="hidden md:inline-flex text-xs text-zinc-500">
					Swipe / scroll • Double tap to “Helpful”
				</span>
			</div>

			{/* Reels container */}
			<div
				ref={scrollerRef}
				className="
          relative
          flex flex-col
          h-[82svh] w-full overflow-y-auto
          snap-y snap-mandatory
          gap-6
          px-4
          no-scrollbar

          md:flex-row md:h-auto md:overflow-x-auto md:overflow-y-hidden
          md:snap-x md:pb-8 md:gap-4 md:px-0
        ">
				{items.map((item) => {
					const itemCounts = counts[item.id] ?? { up: 0, down: 0 };
					const myVote = userVotes[item.id] ?? null;
					const isPending = pending[item.id] ?? false;
					const isActive = activeId === item.id;

					return (
						<Card
							key={item.id}
							data-reel
							data-id={item.id}
							className={`
                snap-center
                shrink-0
                relative overflow-hidden
                rounded-2xl
                border border-white/10
                bg-black

                w-full
                h-[82svh]

                md:w-[360px] md:h-[640px]

                transition-all duration-300
                ${isActive ? "ring-1 ring-white/20" : "opacity-95"}
              `}>
							{/* MEDIA */}
							<div
								className="absolute inset-0"
								onClick={() => onMediaTap(item)}
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
										{/* Slight texture overlay */}
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

							{/* Top row: category + sound */}
							<div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-start justify-between">
								<div className="flex flex-col gap-2">
									<Badge className="bg-white/10 text-white border-white/20 backdrop-blur-md">
										{item.category}
									</Badge>

									{/* Active indicator */}
									{isActive && (
										<span className="text-[11px] text-white/70">
											{item.type === "video"
												? "Tap to pause/play"
												: "Swipe to continue"}
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
                    hover:bg-white/15
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

							{/* Gradient for readability */}
							<div className="absolute inset-x-0 bottom-0 z-10 h-[58%] bg-gradient-to-t from-black via-black/40 to-transparent" />

							{/* Bottom content row */}
							<div
								className="
                  absolute bottom-0 left-0 right-0 z-20
                  p-5
                  pb-[max(1.25rem,env(safe-area-inset-bottom))]
                ">
								<div className="flex items-end gap-4">
									{/* Left: title + text */}
									<div className="flex-1 min-w-0">
										<h3 className="text-white font-extrabold text-xl leading-tight line-clamp-2">
											{item.title}
										</h3>

										<p className="mt-2 text-white/70 text-sm leading-relaxed line-clamp-2">
											Short, practical civic knowledge — made simple.
											<span className="ml-2 text-white/90 font-semibold">
												Double-tap to mark Helpful.
											</span>
										</p>

										{/* Status */}
										{myVote && (
											<p className="mt-2 text-xs text-white/60">
												Saved ✅ Click again to remove.
											</p>
										)}
									</div>

									{/* Right: action rail (Reels style) */}
									<div className="flex flex-col items-center gap-3">
										{/* Helpful */}
										<Button
											disabled={isPending}
											variant="ghost"
											onClick={(e) => {
												e.stopPropagation();
												haptic();
												toggleVote(item.id, "up");
											}}
											className={`
                        rounded-full
                        w-12 h-12 p-0
                        border border-white/15
                        bg-white/10 backdrop-blur-md
                        hover:bg-white/15
                        transition
                        ${myVote === "up" ? "ring-2 ring-green-400/50" : ""}
                      `}
											aria-label="Helpful">
											<ThumbsUp
												className={`w-5 h-5 ${
													myVote === "up" ? "text-green-300" : "text-white/90"
												}`}
												fill={myVote === "up" ? "currentColor" : "none"}
											/>
										</Button>
										<span className="text-white/80 text-xs font-semibold -mt-2">
											{itemCounts.up}
										</span>

										{/* Confusing */}
										<Button
											disabled={isPending}
											variant="ghost"
											onClick={(e) => {
												e.stopPropagation();
												haptic();
												toggleVote(item.id, "down");
											}}
											className={`
                        rounded-full
                        w-12 h-12 p-0
                        border border-white/15
                        bg-white/10 backdrop-blur-md
                        hover:bg-white/15
                        transition
                        ${myVote === "down" ? "ring-2 ring-red-400/50" : ""}
                      `}
											aria-label="Confusing">
											<ThumbsDown
												className={`w-5 h-5 ${
													myVote === "down" ? "text-red-300" : "text-white/90"
												}`}
												fill={myVote === "down" ? "currentColor" : "none"}
											/>
										</Button>
										<span className="text-white/80 text-xs font-semibold -mt-2">
											{itemCounts.down}
										</span>

										{/* Play hint for video */}
										{item.type === "video" && (
											<div className="mt-2 flex items-center justify-center text-white/70">
												<Play className="w-4 h-4" />
											</div>
										)}
									</div>
								</div>

								{/* Tiny pending indicator */}
								{isPending && (
									<div className="mt-3 text-xs text-white/60">Saving…</div>
								)}
							</div>
						</Card>
					);
				})}
			</div>
		</section>
	);
}
