"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Lora } from "next/font/google";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const lora = Lora({
	weight: ["400", "600", "700"],
	subsets: ["latin"],
	variable: "--font-lora",
	display: "swap",
});

const Landing = () => {
	const sectionRef = useRef<HTMLDivElement | null>(null);
	const markerRef = useRef<HTMLSpanElement | null>(null);

	useLayoutEffect(() => {
		if (!sectionRef.current) return;

		const prefersReducedMotion =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const ctx = gsap.context(() => {
			gsap.set(".reveal", { y: 16, opacity: 0, filter: "blur(8px)" });
			gsap.set(".sticker", {
				opacity: 0,
				y: 20,
				scale: 0.95,
				rotate: 2,
				filter: "blur(8px)",
			});
			gsap.set(".scroll-hint", { opacity: 0, y: 8 });
			if (markerRef.current) gsap.set(markerRef.current, { scaleX: 0 });

			if (!prefersReducedMotion) {
				const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

				tl.to(".reveal", {
					y: 0,
					opacity: 1,
					filter: "blur(0px)",
					duration: 0.9,
					stagger: 0.12,
				}).to(
					".sticker",
					{
						opacity: 1,
						y: 0,
						scale: 1,
						rotate: 0,
						filter: "blur(0px)",
						duration: 1.1,
						stagger: 0.08,
					},
					"-=0.55",
				);

				gsap.to(".bg-grid", {
					backgroundPosition: "0px 42px",
					repeat: -1,
					duration: 9,
					ease: "none",
				});

				gsap.to(".scroll-arrow", {
					y: 6,
					repeat: -1,
					yoyo: true,
					duration: 0.9,
					ease: "power1.inOut",
				});

				tl.to(
					".scroll-hint",
					{
						opacity: 1,
						y: 0,
						duration: 0.6,
					},
					"-=0.25",
				);

				// optional: ultra subtle idle float (robust + classy)
				gsap.to(".sticker-float", {
					y: -6,
					rotate: 0.6,
					yoyo: true,
					repeat: -1,
					duration: 2.8,
					ease: "sine.inOut",
					stagger: 0.15,
				});
			} else {
				gsap.set(".reveal", { y: 0, opacity: 1, filter: "blur(0px)" });
				gsap.set(".sticker", {
					opacity: 1,
					y: 0,
					scale: 1,
					rotate: 0,
					filter: "blur(0px)",
				});
				gsap.set(".scroll-hint", { opacity: 1, y: 0 });
			}
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			className={`relative w-full overflow-hidden text-[#141414] ${lora.variable} antialiased`}>
			{/* BACKGROUND */}
			<div className="absolute inset-0 z-0 pointer-events-none">
				<div className="absolute inset-0 bg-[#f5efe6]" />

				{/* Energy glows */}
				<div className="absolute -top-[22%] -left-[18%] w-[55%] h-[55%] bg-[#FF4E02]/20 blur-[140px] rounded-full" />
				<div className="absolute -bottom-[25%] -right-[18%] w-[55%] h-[55%] bg-fuchsia-500/14 blur-[160px] rounded-full" />
				<div className="absolute top-[18%] right-[12%] w-[35%] h-[35%] bg-indigo-500/12 blur-[140px] rounded-full" />

				{/* Dot grid */}
				<div
					className="bg-grid absolute inset-0 opacity-[0.18]"
					style={{
						backgroundImage: `radial-gradient(rgba(20,20,20,0.8) 1px, transparent 1px)`,
						backgroundSize: "42px 42px",
					}}
				/>

				<div className="absolute inset-0 opacity-[0.14] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />
			</div>

			{/* LAYOUT */}
			<div
				className="
          relative z-10
          container mx-auto
          px-6 sm:px-10 md:px-24
          min-h-[calc(80vh-64px)]
          py-16 md:py-24
          grid md:grid-cols-[1.15fr_0.85fr]
          items-center gap-10
        ">
				{/* LEFT: HERO COPY */}
				<div className="flex flex-col items-center md:items-start text-center md:text-left">
					{/* Eyebrow */}
					<div className="reveal mb-5">
						<span className="inline-block font-sans text-[10px] md:text-sm tracking-[0.38em] font-bold text-[#FF4E02] uppercase border-b border-[#141414]/20 pb-1">
							Democracy 101 // Civic education for real life
						</span>
					</div>

					{/* Headline (better rhythm) */}
					<h1
						className="
    reveal
    font-[var(--font-lora)]
    font-bold tracking-tight
    leading-[0.95]
    /* Size is now between your original 6.7rem and my previous 4.5rem */
    text-[clamp(2.5rem,6vw,5.8rem)] 
    max-w-[40ch]
  ">
						{/* The <span> tags here are ONLY to force the text onto two lines */}
						<span className="block whitespace-nowrap">LEARN THE RULES.</span>

						<span className="block mt-1 whitespace-nowrap">
							USE YOUR{" "}
							<span className="group relative inline-block italic text-[#FF4E02] cursor-pointer transition-transform hover:scale-110 hover:-rotate-2 active:scale-95">
								VOICE.
								<span
									ref={markerRef}
									className="
          absolute -z-10 left-[-6%] right-[-6%]
          bottom-[10%] h-[0.55em]
          bg-[#FF4E02]/18
          rounded-md origin-left scale-x-0
          transition-transform duration-300
          group-hover:scale-x-100
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
              max-w-[56ch]
            ">
						Short lessons on voting, institutions, and participation — built for
						people who want clarity, not confusion.
						<span className="inline-block ml-2 bg-[#FF4E02] text-[#141414] px-2 py-0.5 -rotate-1 font-bold">
							Make it count.
						</span>
					</p>

					{/* CTA */}
					<div className="reveal mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
						<button
							className="
                w-full sm:w-auto
                px-8 py-4 md:px-10 md:py-5
                bg-[#141414] text-white font-bold uppercase tracking-tight
                hover:bg-[#FF4E02] hover:text-[#141414]
                transition-colors duration-300
                shadow-[0_20px_50px_rgba(0,0,0,0.18)]
                rounded-lg
              ">
							Start learning
						</button>

						<button
							className="
                w-full sm:w-auto
                px-8 py-4 md:px-10 md:py-5
                border border-[#141414]/12
                bg-white/45 backdrop-blur-sm
                font-bold uppercase tracking-tight
                hover:border-[#FF4E02]/55 hover:text-[#FF4E02]
                transition-colors duration-300
                rounded-lg
              ">
							Explore topics
						</button>
					</div>
				</div>

				{/* RIGHT: STICKER COLLAGE (proper layout, robust) */}
				<div className="hidden md:flex justify-center md:justify-end">
					<div
						className="
              relative
              w-[420px] h-[420px]
              xl:w-[520px] xl:h-[520px]
            ">
						{/* Vote stack (hero sticker) */}
						<div
							className="
                sticker sticker-float
                absolute top-[4%] right-[6%]
                rotate-[10deg]
                transition duration-300
                hover:-translate-y-2 hover:rotate-[7deg] hover:scale-[1.02]
              ">
							<Image
								src="/images/VoteImg1.png"
								alt="Vote"
								width={320}
								height={320}
								className="select-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.18)]"
								priority
							/>
						</div>

						{/* Banner (Be part bigger) */}
						<div
							className="
                sticker sticker-float
                absolute top-[52%] left-[6%]
                -rotate-[8deg]
                transition duration-300
                hover:-translate-y-2 hover:-rotate-[6deg] hover:scale-[1.02]
              ">
							<Image
								src="/images/VoteImg3.png"
								alt="Banner"
								width={220}
								height={220}
								className="select-none drop-shadow-[0_28px_60px_rgba(0,0,0,0.14)]"
							/>
						</div>

						{/* V icon (anchor) */}
						<div
							className="
                sticker sticker-float
                absolute bottom-[8%] left-[34%]
                rotate-[6deg]
                transition duration-300
                hover:-translate-y-2 hover:rotate-[3deg] hover:scale-[1.02]
              ">
							<Image
								src="/images/VoteImg5.png"
								alt="V"
								width={220}
								height={220}
								className="select-none drop-shadow-[0_28px_60px_rgba(0,0,0,0.14)]"
							/>
						</div>

						{/* Register (bottom-right) */}
						<div
							className="
                sticker sticker-float
                absolute bottom-[-30%] right-[6%]
                -rotate-[6deg]
                transition duration-300
                hover:-translate-y-2 hover:-rotate-[3deg] hover:scale-[1.02]
              ">
							<Image
								src="/images/Group 2018779500.png"
								alt="Register"
								width={260}
								height={260}
								className="select-none drop-shadow-[0_28px_60px_rgba(0,0,0,0.14)]"
							/>
						</div>
					</div>
				</div>

				{/* MOBILE: show ONE sticker only (clean) */}
			</div>

			{/* SCROLL CUE */}
			<div className="scroll-hint absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
				<div
					className="
            flex items-center gap-2
            px-4 py-2 rounded-full
            bg-white/45 backdrop-blur-md
            border border-black/10
            shadow-sm
          ">
					<span className="text-xs font-semibold text-black/70">
						Scroll for lessons
					</span>
					<ChevronDown className="scroll-arrow w-4 h-4 text-black/70" />
				</div>
			</div>
		</section>
	);
};

export default Landing;
