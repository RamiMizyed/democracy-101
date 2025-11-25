"use client";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type Slide = {
	id: string;
	title: string;
	subtitle?: string;
	// You can add: image, videoUrl, poster, etc.
};

export default function BaseSlider({
	items,
	render,
	label,
}: {
	items: Slide[];
	render: (s: Slide) => React.ReactNode;
	label: string;
}) {
	const trackRef = useRef<HTMLDivElement | null>(null);
	const wrapperRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!wrapperRef.current) return;
		const el = wrapperRef.current;
		gsap.fromTo(
			el,
			{ opacity: 0, y: 24 },
			{
				opacity: 1,
				y: 0,
				duration: 0.8,
				ease: "power3.out",
				scrollTrigger: { trigger: el, start: "top 80%" },
			}
		);
	}, []);

	const scrollBy = (dir: 1 | -1) => {
		const track = trackRef.current;
		if (!track) return;
		const amount = track.clientWidth * 0.9 * dir; // near a page
		track.scrollBy({ left: amount, behavior: "smooth" });
	};

	return (
		<div ref={wrapperRef} className="relative">
			<div className="flex items-center justify-between mb-2">
				<h3 className="text-lg text-zinc-300 opacity-0">{label}</h3>
				<div className="hidden md:flex gap-2">
					<Button
						size="sm"
						variant="secondary"
						onClick={() => scrollBy(-1)}
						aria-label="Previous">
						←
					</Button>
					<Button size="sm" onClick={() => scrollBy(1)} aria-label="Next">
						→
					</Button>
				</div>
			</div>

			<div className="relative">
				{/* mobile arrows overlay */}
				<div className="absolute inset-y-0 left-0 right-0 pointer-events-none md:hidden">
					<div className="h-full flex items-center justify-between px-1">
						<Button
							size="icon"
							variant="secondary"
							className="pointer-events-auto"
							onClick={() => scrollBy(-1)}>
							←
						</Button>
						<Button
							size="icon"
							className="pointer-events-auto"
							onClick={() => scrollBy(1)}>
							→
						</Button>
					</div>
				</div>

				<div
					ref={trackRef}
					className="snap-x snap-mandatory overflow-x-auto scrollbar-none flex gap-4 pr-2">
					{items.map((s) => (
						<div
							key={s.id}
							className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[42%] lg:w-[32%]">
							{render(s)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
