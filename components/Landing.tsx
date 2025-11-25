"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Lora } from "next/font/google";

const lora = Lora({
	weight: ["400", "700"],
	subsets: ["latin"],
});

const Landing = () => {
	// 1. Ref for the main section to create the GSAP context
	const sectionRef = useRef<HTMLDivElement | null>(null);
	// 2. Ref for the large SVG (the "101" element) to animate it
	const svgRef = useRef<SVGSVGElement | null>(null);

	// Intro animation (text reveals from bottom)
	useLayoutEffect(() => {
		if (!sectionRef.current) return;

		// Use gsap.context for better cleanup and scoping, especially in React
		const ctx = gsap.context(() => {
			// Initial state settings (set)
			gsap.set(".hero-line", { yPercent: 110, opacity: 0 });
			gsap.set(".hero-accent", { opacity: 0, y: 16 });

			const tl = gsap.timeline({
				defaults: { ease: "power3.out", duration: 0.9 },
			});

			tl.to(".hero-line", {
				yPercent: 0,
				opacity: 1,
				stagger: 0.15,
			})
				// *** FIX: Changed .FromTo to .fromTo ***
				.fromTo(
					svgRef.current,
					{ opacity: 0 },
					{
						opacity: 1,
						duration: 1.2,
						ease: "power3.out",
					},
					"-=0.6" // Starts 0.6 seconds before the previous animation ends
				)
				.to(
					".hero-accent",
					{
						opacity: 1,
						y: 0,
						stagger: 0.1,
					},
					"-=0.5"
				);
		}, sectionRef);

		// Cleanup function for useLayoutEffect
		return () => ctx.revert();
	}, []);

	// Mouse-follow for the 101 SVG (subtle, constrained)
	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		if (!svgRef.current) return;

		// Get the bounds of the container where the mouse is moving
		const bounds = event.currentTarget.getBoundingClientRect();
		// Calculate the mouse position relative to the center of the container (-0.5 to 0.5)
		const x = (event.clientX - bounds.left) / bounds.width - 0.5;
		const y = (event.clientY - bounds.top) / bounds.height - 0.5;

		const maxTranslate = 35; // Maximum translation distance in pixels

		gsap.to(svgRef.current, {
			x: x * maxTranslate,
			y: y * maxTranslate,
			duration: 0.6,
			ease: "power3.out",
		});
	};

	const handleMouseLeave = () => {
		if (!svgRef.current) return;
		// Animate the SVG back to its original (0, 0) position
		gsap.to(svgRef.current, {
			x: 0,
			y: 0,
			duration: 0.7,
			ease: "power3.out",
		});
	};

	return (
		<section className="w-full bg-transparent">
			<div
				ref={sectionRef}
				className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col px-6 py-14 md:min-h-[80vh] md:py-20">
				{/* The onMouseMove/onMouseLeave handlers are attached to this container,
                making the mouse-follow effect work across the entire hero area.
                */}
				<div
					className="relative flex w-full flex-1 flex-col gap-10 md:flex-row md:items-center md:justify-between"
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}>
					{/* LEFT: TEXT */}
					<div className="relative flex max-w-xl flex-col items-center gap-4 text-center md:items-start md:text-left">
						{/* Little star ornament */}
						<svg
							className="hero-accent absolute -top-6 -left-4 w-8 stroke-orange-500"
							viewBox="0 0 731 877"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M360.041 194.09L323.027 1.89062M426.357 143.145L450.262 46.6599M426.357 625.572L477.251 874.891M360.041 701.989L343.847 806.193M579.039 322.002L726.324 245.034M171.887 322.002L5.32397 217.246M99.401 360.816H20.7464M208.9 553.015L66.2427 672.657M595.233 514.752L708.588 572.368M381.841 322.002L501.093 217.246L465.526 380.665L609.884 421.519L465.526 462.374L501.093 572.368L393.347 514.752L288.74 657.22L301.293 487.515L99.401 451.899L270.59 380.665L237.483 225.627L381.841 322.002Z"
								stroke="currentColor"
								strokeWidth="20"
							/>
						</svg>

						{/* Heading + Subheading area */}
						{/* Removed the unnecessary outer div with border/padding around h1 and svg */}

						<div className="flex items-end justify-start gap-2">
							{/* The overflow-hidden is key for the text-reveal animation */}
							<div className="overflow-hidden h-full py-6">
								<h1
									className={`hero-line ${lora.className} relative z-10 font-bold text-orange-600 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl`}>
									Democracy
								</h1>
							</div>

							{/* RIGHT: 101 SVG (moved here to be inline with the text) */}
							{/* Adjusted some class names for a slightly better visual alignment */}
							<svg
								ref={svgRef}
								className="relative w-16 h-auto max-w-xs opacity-80 sm:w-24 md:w-28 lg:w-36 xl:w-48 2xl:w-64 mb-2"
								viewBox="0 0 4953 1651"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true" // Added for accessibility since this is decorative
							>
								<path
									d="M1383.87 962.009L1699.95 345.405L1641.97 1628.89"
									stroke="#FF4E02"
									strokeWidth="190.42"
								/>
								<path
									d="M3129.24 660.037L3445.33 43.4324L3387.35 1326.92"
									stroke="#FF4E02"
									strokeWidth="190.42"
								/>
								<path
									d="M2790.48 844.806C2756.82 1231.37 2607.28 1390.81 2440.81 1380.96C2274.33 1371.1 2156.63 1164.9 2187.62 809.111C2218.6 453.32 2370.82 263.102 2537.3 272.958C2703.77 282.815 2824.15 458.237 2790.48 844.806Z"
									stroke="#FF4E02"
									strokeWidth="190.42"
								/>
								<path
									d="M1059.89 934.367L670.806 885.977M1023.63 1114.21C873.9 1128.55 313.073 1182.28 24.8748 1209.89M1093.38 1283.9L552.224 1480.19"
									stroke="#FF4E02"
									strokeWidth="190.42"
								/>
								<path
									d="M3803.04 947.534L4257.52 1008.27M3842.9 727.165L4945.11 640.241M3803.04 562.584L4561.07 385.321"
									stroke="#FF4E02"
									strokeWidth="190.42"
								/>
							</svg>
						</div>

						{/* Subheading */}
						<div className="overflow-hidden">
							<p className="hero-line relative z-10 text-lg sm:text-xl md:text-2xl text-orange-500">
								Civic education for all.
							</p>
						</div>

						{/* Mood chips */}
						<div className="hero-accent relative z-10 mt-2 flex flex-wrap items-center justify-center gap-3 md:justify-start">
							<span className="rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-orange-700">
								Learn
							</span>
							<span className="rounded-full border border-orange-500/30 bg-orange-500/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-orange-700">
								Question
							</span>
							<span className="rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-orange-700">
								Re-imagine
							</span>
						</div>
					</div>
					{/* The right side (which previously held the SVG) is now empty */}
					<div className="flex-1 hidden md:block" />
				</div>

				{/* Bottom anchor line */}
				<div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />
			</div>
		</section>
	);
};

export default Landing;
