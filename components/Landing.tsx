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

export default function Landing() {
	const sectionRef = useRef<HTMLElement | null>(null);

	useLayoutEffect(() => {
		if (!sectionRef.current) return;

		const prefersReducedMotion =
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		const ctx = gsap.context(() => {
			// ✅ Clean initial states — NO blur, NO rotate, NO goofy scaling
			gsap.set("[data-hero='reveal']", { autoAlpha: 0, y: 10 });
			gsap.set("[data-hero='sticker']", { autoAlpha: 0, y: 12 });
			gsap.set("[data-hero='scroll']", { autoAlpha: 0, y: 8 });

			if (prefersReducedMotion) {
				gsap.set("[data-hero='reveal']", { autoAlpha: 1, y: 0 });
				gsap.set("[data-hero='sticker']", { autoAlpha: 1, y: 0 });
				gsap.set("[data-hero='scroll']", { autoAlpha: 1, y: 0 });
				return;
			}

			const tl = gsap.timeline({
				defaults: { ease: "power2.out", duration: 0.7 },
			});

			// ✅ Text first (fast + crisp)
			tl.to("[data-hero='reveal']", {
				autoAlpha: 1,
				y: 0,
				stagger: 0.08,
			});

			// ✅ Stickers second (subtle)
			tl.to(
				"[data-hero='sticker']",
				{
					autoAlpha: 1,
					y: 0,
					stagger: 0.06,
					duration: 0.75,
				},
				"-=0.35",
			);

			// ✅ Scroll hint last
			tl.to(
				"[data-hero='scroll']",
				{
					autoAlpha: 1,
					y: 0,
					duration: 0.55,
				},
				"-=0.25",
			);

			// ✅ Background drift (seamless)
			gsap.to(".bg-grid", {
				backgroundPosition: "0px 42px",
				repeat: -1,
				duration: 11,
				ease: "none",
			});

			// ✅ Scroll arrow: small, classy motion
			gsap.to(".scroll-arrow", {
				y: 4,
				repeat: -1,
				yoyo: true,
				duration: 1.1,
				ease: "sine.inOut",
			});
		}, sectionRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={sectionRef}
			className={`relative w-full overflow-hidden text-[#141414] ${lora.variable} antialiased`}>
			{/* BACKGROUND (more energy, less "corporate") */}
			<div className="absolute inset-0 z-0 pointer-events-none">
				{/* base */}
				<div className="absolute inset-0 bg-[#f5efe6]" />

				{/* more energy glows */}
				<div className="absolute -top-[22%] -left-[18%] w-[55%] h-[55%] bg-[#FF4E02]/25 blur-[140px] rounded-full" />
				<div className="absolute -bottom-[26%] -right-[18%] w-[60%] h-[60%] bg-fuchsia-500/16 blur-[170px] rounded-full" />
				<div className="absolute top-[18%] right-[12%] w-[40%] h-[40%] bg-indigo-500/14 blur-[160px] rounded-full" />

				{/* warm gradient wash */}
				<div className="absolute inset-0 bg-gradient-to-b from-white/35 via-transparent to-black/5" />

				{/* dot grid */}
				<div
					className="bg-grid absolute inset-0 opacity-[0.18]"
					style={{
						backgroundImage: `radial-gradient(rgba(20,20,20,0.75) 1px, transparent 1px)`,
						backgroundSize: "42px 42px",
					}}
				/>

				{/* grain */}
				<div className="absolute inset-0 opacity-[0.14] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
			</div>

			{/* HERO */}
			<div
				className="
          relative z-10
          container mx-auto
          px-6 sm:px-10 md:px-24
          min-h-[calc(82vh-72px)]
          py-16 md:py-24
          grid gap-10
          md:grid-cols-[1.15fr_0.85fr]
          items-center
        ">
				{/* LEFT */}
				<div className="flex flex-col items-center md:items-start text-center md:text-left">
					{/* Eyebrow */}
					<div data-hero="reveal" className="mb-5">
						<span className="inline-block font-sans text-[10px] md:text-sm tracking-[0.38em] font-bold text-[#FF4E02] uppercase border-b border-[#141414]/20 pb-1">
							Democracy 101 // Civic education for real life
						</span>
					</div>

					{/* Headline (2 lines, mobile-safe) */}
					<h1
						data-hero="reveal"
						className="
              font-[var(--font-lora)]
              font-bold tracking-tight
              leading-[0.95]
              text-[clamp(2.6rem,6vw,6rem)]
              max-w-[22ch]
              text-balance
            ">
						<span className="block">LEARN THE RULES.</span>

						<span className="block mt-1">
							USE YOUR{" "}
							<span className="relative inline-block italic text-[#FF4E02]">
								VOICE.
								{/* clean highlight underline */}
								<span
									className="
                    absolute -z-10 left-[-4%] right-[-4%]
                    bottom-[12%] h-[0.5em]
                    rounded-md
                    bg-gradient-to-r from-[#FF4E02]/25 via-[#FF4E02]/12 to-transparent
                  "
								/>
							</span>
						</span>
					</h1>

					{/* Subcopy */}
					<p
						data-hero="reveal"
						className="
              mt-6 md:mt-8
              text-base md:text-xl
              font-medium leading-relaxed
              opacity-90
              max-w-[56ch]
            ">
						Short lessons on voting, institutions, and participation — built for
						people who want clarity, not confusion.
						<span className="inline-block ml-2 bg-[#FF4E02] text-[#141414] px-2 py-0.5 -rotate-1 font-bold rounded-sm">
							Make it count.
						</span>
					</p>

					{/* CTA */}
					<div
						data-hero="reveal"
						className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
						<button
							className="
                w-full sm:w-auto
                px-8 py-4 md:px-10 md:py-5
                bg-[#141414] text-white font-bold uppercase tracking-tight
                hover:bg-[#FF4E02] hover:text-[#141414]
                transition-colors duration-300
                shadow-[0_22px_60px_rgba(0,0,0,0.16)]
                rounded-xl
              ">
							Start learning
						</button>

						<button
							className="
                w-full sm:w-auto
                px-8 py-4 md:px-10 md:py-5
                border border-[#141414]/12
                bg-white/55 backdrop-blur-md
                font-bold uppercase tracking-tight
                hover:border-[#FF4E02]/55 hover:text-[#FF4E02]
                transition-colors duration-300
                rounded-xl
              ">
							Explore topics
						</button>
					</div>

					{/* MOBILE sticker strip (clean, no chaos) */}
					<div className="md:hidden mt-10 w-full flex items-center justify-center gap-3">
						<div
							data-hero="sticker"
							className="transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]">
							<Image
								src="/images/VoteImg3.png"
								alt="Sticker"
								width={80}
								height={80}
								className="select-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.14)]"
							/>
						</div>

						<div
							data-hero="sticker"
							className="transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]">
							<Image
								src="/images/VoteImg5.png"
								alt="Sticker"
								width={80}
								height={80}
								className="select-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.14)]"
							/>
						</div>

						<div
							data-hero="sticker"
							className="transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.02]">
							<Image
								src="/images/VoteImg1.png"
								alt="Vote"
								width={92}
								height={92}
								className="select-none drop-shadow-[0_22px_55px_rgba(0,0,0,0.16)]"
								priority
							/>
						</div>
					</div>
				</div>

				{/* RIGHT collage (DESKTOP ONLY) */}
				<div className="hidden md:flex justify-center md:justify-end">
					<div className="relative w-[420px] h-[420px] xl:w-[520px] xl:h-[520px]">
						{/* hero sticker */}
						<div
							data-hero="sticker"
							className="
                absolute top-[6%] right-[6%]
                transition-transform duration-300
                hover:-translate-y-2 hover:scale-[1.02]
                will-change-transform
              ">
							<Image
								src="/images/VoteImg1.png"
								alt="Vote"
								width={330}
								height={330}
								className="select-none drop-shadow-[0_32px_70px_rgba(0,0,0,0.18)]"
								priority
							/>
						</div>

						<div
							data-hero="sticker"
							className="
                absolute top-[54%] left-[2%]
                transition-transform duration-300
                hover:-translate-y-2 hover:scale-[1.02]
                will-change-transform
              ">
							<Image
								src="/images/VoteImg3.png"
								alt="Banner"
								width={220}
								height={220}
								className="select-none drop-shadow-[0_26px_60px_rgba(0,0,0,0.14)]"
							/>
						</div>

						<div
							data-hero="sticker"
							className="
                absolute bottom-[4%] left-[34%]
                transition-transform duration-300
                hover:-translate-y-2 hover:scale-[1.02]
                will-change-transform
              ">
							<Image
								src="/images/VoteImg5.png"
								alt="V"
								width={220}
								height={220}
								className="select-none drop-shadow-[0_26px_60px_rgba(0,0,0,0.14)]"
							/>
						</div>

						<div
							data-hero="sticker"
							className="
                absolute bottom-[-18%] right-[4%]
                transition-transform duration-300
                hover:-translate-y-2 hover:scale-[1.02]
                will-change-transform
              ">
							<Image
								src="/images/Group 2018779500.png"
								alt="Register"
								width={260}
								height={260}
								className="select-none drop-shadow-[0_26px_60px_rgba(0,0,0,0.14)]"
							/>
						</div>
					</div>
				</div>
			</div>

			{/* SCROLL CUE */}
			<div
				data-hero="scroll"
				className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
				<div
					className="
            flex items-center gap-2
            px-4 py-2 rounded-full
            bg-white/55 backdrop-blur-md
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
}
