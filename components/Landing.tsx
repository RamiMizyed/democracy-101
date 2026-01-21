"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Lora } from "next/font/google";
import Image from "next/image";

const lora = Lora({
	weight: ["400", "600", "700"],
	subsets: ["latin"],
	variable: "--font-lora",
	display: "swap",
});

const Landing = () => {
	const sectionRef = useRef<HTMLDivElement | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const headlineRef = useRef<HTMLHeadingElement | null>(null);
	const markerRef = useRef<HTMLSpanElement | null>(null);

	useLayoutEffect(() => {
		if (!sectionRef.current) return;

		const prefersReducedMotion =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const ctx = gsap.context(() => {
			// Entrance states
			gsap.set(".reveal", { y: 26, opacity: 0, filter: "blur(8px)" });
			gsap.set(".parallax-item", {
				opacity: 0,
				scale: 0.85,
				filter: "blur(12px)",
			});

			if (markerRef.current) gsap.set(markerRef.current, { scaleX: 0 });

			if (!prefersReducedMotion) {
				const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

				tl.to(".reveal", {
					y: 0,
					opacity: 1,
					filter: "blur(0px)",
					duration: 1.2,
					stagger: 0.12,
				}).to(
					".parallax-item",
					{
						opacity: 1,
						scale: 1,
						filter: "blur(0px)",
						duration: 1.6,
						stagger: { amount: 0.6, from: "random" },
					},
					"-=0.9",
				);

				// Gentle, slower grid drift
				gsap.to(".bg-grid", {
					backgroundPosition: "0px 140px",
					repeat: -1,
					duration: 7,
					ease: "none",
				});
			} else {
				// Reduced-motion: show immediately
				gsap.set(".reveal", { y: 0, opacity: 1, filter: "blur(0px)" });
				gsap.set(".parallax-item", {
					opacity: 1,
					scale: 1,
					filter: "blur(0px)",
				});
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	// Meaningful hover: marker highlight + subtle lift
	const onHeadlineEnter = () => {
		if (!markerRef.current || !headlineRef.current) return;

		gsap.to(headlineRef.current, {
			y: -2,
			duration: 0.35,
			ease: "power3.out",
		});

		gsap.to(markerRef.current, {
			scaleX: 1,
			duration: 0.45,
			ease: "power3.out",
			transformOrigin: "left center",
		});
	};

	const onHeadlineLeave = () => {
		if (!markerRef.current || !headlineRef.current) return;

		gsap.to(headlineRef.current, {
			y: 0,
			duration: 0.35,
			ease: "power3.out",
		});

		gsap.to(markerRef.current, {
			scaleX: 0,
			duration: 0.35,
			ease: "power3.inOut",
			transformOrigin: "right center",
		});
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		// Only do parallax on desktop-ish sizes
		if (typeof window === "undefined") return;
		if (window.innerWidth < 768) return;
		if (!containerRef.current) return;

		const { clientX, clientY } = e;
		const { innerWidth, innerHeight } = window;

		const x = (clientX / innerWidth - 0.5) * 2;
		const y = (clientY / innerHeight - 0.5) * 2;

		const items = containerRef.current.querySelectorAll(".parallax-item");
		items.forEach((item) => {
			const speed = parseFloat(item.getAttribute("data-speed") || "20");
			gsap.to(item, {
				x: x * speed,
				y: y * speed,
				duration: 1.8,
				ease: "power2.out",
				overwrite: "auto",
			});
		});
	};

	return (
		<section
			ref={sectionRef}
			onMouseMove={handleMouseMove}
			className={`relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-[#f4f1e8] text-[#1a1a1a] ${lora.variable} antialiased`}>
			{/* BACKGROUND */}
			<div className="absolute inset-0 z-0 pointer-events-none">
				<div
					className="bg-grid absolute inset-0 opacity-[0.06]"
					style={{
						backgroundImage: `radial-gradient(#1a1a1a 1px, transparent 1px)`,
						backgroundSize: "42px 42px",
					}}
				/>

				<div className="absolute inset-0 opacity-[0.12] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

				<div className="absolute top-[-12%] left-[-10%] w-[55%] h-[55%] bg-[#FF4E02]/10 blur-[130px] rounded-full" />
				<div className="absolute bottom-[-18%] right-[-12%] w-[60%] h-[60%] bg-[#1a1a1a]/10 blur-[140px] rounded-full" />
			</div>

			{/* PARALLAX ASSETS (HIDDEN ON MOBILE ✅) */}
			<div
				ref={containerRef}
				className="absolute inset-0 pointer-events-none z-10 hidden md:block">
				<div
					className="parallax-item absolute top-[10%] right-[12%] w-64 rotate-12"
					data-speed="28">
					<Image
						src="/images/VoteImg1.png"
						alt="Vote"
						width={320}
						height={320}
						className="object-contain"
					/>
				</div>

				<div
					className="parallax-item absolute bottom-[18%] right-[5%] w-72 -rotate-6"
					data-speed="52">
					<Image
						src="/images/VoteImg2.png"
						alt="Register"
						width={380}
						height={380}
						className="object-contain"
					/>
				</div>

				<div
					className="parallax-item absolute top-[38%] right-[26%] w-44 rotate-2 opacity-90"
					data-speed="18">
					<Image
						src="/images/VoteImg3.png"
						alt="Sticker"
						width={240}
						height={240}
						className="object-contain"
					/>
				</div>
			</div>

			{/* MAIN CONTENT */}
			<div
				className="
          relative z-20 w-full
          px-6 sm:px-10 md:px-24
          py-16 md:py-24
          flex flex-col
          items-center md:items-start
          text-center md:text-left
        ">
				{/* Eyebrow */}
				<div className="reveal overflow-hidden mb-5">
					<span className="inline-block font-sans text-[10px] md:text-sm tracking-[0.38em] font-bold text-[#FF4E02] uppercase border-b border-[#1a1a1a]/40 pb-1">
						Democracy 101 // Civic education for real life
					</span>
				</div>

				{/* Headline */}
				<h1
					ref={headlineRef}
					onMouseEnter={onHeadlineEnter}
					onMouseLeave={onHeadlineLeave}
					className="
            reveal cursor-default
            font-[var(--font-lora)]
            font-bold tracking-tight
            leading-[0.9]
            text-[clamp(2.6rem,7vw,6.5rem)]
            max-w-[18ch]
          ">
					<span className="block">LEARN THE RULES.</span>

					<span className="block mt-1">
						USE YOUR{" "}
						<span className="relative inline-block italic text-[#FF4E02]">
							VOICE.
							{/* marker highlight */}
							<span
								ref={markerRef}
								className="
                  absolute -z-10 left-[-6%] right-[-6%]
                  bottom-[12%] h-[0.55em]
                  bg-[#FF4E02]/20
                  rounded-md
                  origin-left scale-x-0
                "
							/>
						</span>
					</span>
				</h1>

				{/* Subcopy */}
				<p
					className="
            reveal mt-6 md:mt-8
            text-base md:text-xl
            font-medium leading-relaxed
            opacity-90
            max-w-[52ch]
          ">
					Short lessons on voting, institutions, and participation — built for
					people who want clarity, not confusion.
					<span className="inline-block ml-2 bg-[#FF4E02] text-[#1a1a1a] px-2 py-0.5 -rotate-1 font-bold">
						Make it count.
					</span>
				</p>

				{/* CTA */}
				<div className="reveal mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
					<button
						className="
              w-full sm:w-auto
              px-8 py-4 md:px-10 md:py-5
              bg-[#1a1a1a] text-white font-bold uppercase tracking-tight
              hover:bg-[#FF4E02] hover:text-[#1a1a1a]
              transition-colors duration-300
              shadow-sm
            ">
						Start learning
					</button>

					<button
						className="
              w-full sm:w-auto
              px-8 py-4 md:px-10 md:py-5
              border border-[#1a1a1a]/15
              bg-white/40 backdrop-blur-sm
              font-bold uppercase tracking-tight
              hover:border-[#FF4E02]/60 hover:text-[#FF4E02]
              transition-colors duration-300
            ">
						Explore topics
					</button>
				</div>
			</div>
		</section>
	);
};

export default Landing;
