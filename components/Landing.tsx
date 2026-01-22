"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
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
			// ✅ Clean motion only (opacity + y)
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

			// Text first
			tl.to("[data-hero='reveal']", {
				autoAlpha: 1,
				y: 0,
				stagger: 0.075,
			});

			// Stickers second
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

			// Scroll hint last
			tl.to(
				"[data-hero='scroll']",
				{
					autoAlpha: 1,
					y: 0,
					duration: 0.55,
				},
				"-=0.25",
			);

			// Background drift (very subtle)
			gsap.to(".bg-grid", {
				backgroundPosition: "0px 42px",
				repeat: -1,
				duration: 12,
				ease: "none",
			});

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
			{/* BACKGROUND — energetic but clean */}
			<div className="absolute inset-0 z-0 pointer-events-none">
				{/* base */}
				<div className="absolute inset-0 bg-[#f5efe6]" />

				{/* energy glows */}
				<div className="absolute -top-[24%] -left-[18%] w-[56%] h-[56%] bg-[#FF4E02]/26 blur-[150px] rounded-full" />
				<div className="absolute -bottom-[26%] -right-[18%] w-[62%] h-[62%] bg-fuchsia-500/16 blur-[170px] rounded-full" />
				<div className="absolute top-[18%] right-[12%] w-[40%] h-[40%] bg-indigo-500/14 blur-[165px] rounded-full" />

				{/* warm wash */}
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
          min-h-[calc(100svh-78px)]
          py-14 md:py-20
          grid gap-10
          md:grid-cols-[1.12fr_0.88fr]
          items-center
        ">
				{/* LEFT */}
				<div className="flex flex-col items-center md:items-start text-center md:text-left">
					{/* Eyebrow: short-form native */}
					<div data-hero="reveal" className="mb-5">
						<span className="inline-flex items-center gap-2 font-sans text-[10px] md:text-sm tracking-[0.36em] font-extrabold text-[#FF4E02] uppercase border-b border-[#141414]/20 pb-1">
							<span className="inline-block w-2 h-2 rounded-full bg-[#FF4E02]" />
							Democracy 101
						</span>
					</div>

					{/* Headline: concept-aligned */}
					<h1
						data-hero="reveal"
						className="
              font-[var(--font-lora)]
              font-bold tracking-tight
              leading-[0.95]
              text-[clamp(2.55rem,6.2vw,6.1rem)]
              max-w-[24ch]
              text-balance
            ">
						<span className="block">DEMOCRACY</span>
						<span className="block mt-1">
							ISN’T AN{" "}
							<span className="relative inline-block italic text-[#FF4E02]">
								END STATE.
								<span
									className="
                    absolute -z-10 left-[-4%] right-[-4%]
                    bottom-[12%] h-[0.52em]
                    rounded-md
                    bg-gradient-to-r from-[#FF4E02]/26 via-[#FF4E02]/14 to-transparent
                  "
								/>
							</span>
						</span>
						<span className="block mt-2 text-[clamp(1.2rem,2.3vw,2.1rem)] opacity-85">
							It’s a skill. Learn it. Use it. Defend it.
						</span>
					</h1>

					{/* Subcopy: the algorithm gap */}
					<p
						data-hero="reveal"
						className="
              mt-6 md:mt-7
              text-base md:text-xl
              font-medium leading-relaxed
              opacity-90
              max-w-[62ch]
            ">
						Governments, brands, and political machines fight for attention
						every day. We bring civic clarity into the same feeds — with short
						videos, infographics, and participation tools that actually stick.
						<span className="inline-block ml-2 bg-[#FF4E02] text-[#141414] px-2 py-0.5 font-extrabold rounded-md">
							No lectures.
						</span>
					</p>

					{/* Micro value strip */}
					<div
						data-hero="reveal"
						className="mt-5 flex flex-wrap justify-center md:justify-start gap-2">
						<span className="rounded-full px-3 py-1 text-xs font-bold bg-white/70 border border-black/10">
							Swipe-first lessons
						</span>
						<span className="rounded-full px-3 py-1 text-xs font-bold bg-white/70 border border-black/10">
							Vote “Helpful”
						</span>
						<span className="rounded-full px-3 py-1 text-xs font-bold bg-white/70 border border-black/10">
							Save & revisit
						</span>
						<span className="rounded-full px-3 py-1 text-xs font-bold bg-white/70 border border-black/10">
							Participation over noise
						</span>
					</div>

					{/* CTA */}
					<div
						data-hero="reveal"
						className="mt-8 md:mt-9 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
						<a
							href="#lessons"
							className="
                w-full sm:w-auto
                px-8 py-4 md:px-10 md:py-5
                bg-[#141414] text-white font-extrabold uppercase tracking-tight
                hover:bg-[#FF4E02] hover:text-[#141414]
                transition-colors duration-300
                shadow-[0_22px_60px_rgba(0,0,0,0.16)]
                rounded-2xl
              ">
							Start learning
						</a>

						<a
							href="#themes"
							className="
                w-full sm:w-auto
                px-8 py-4 md:px-10 md:py-5
                border border-[#141414]/12
                bg-white/55 backdrop-blur-md
                font-extrabold uppercase tracking-tight
                hover:border-[#FF4E02]/55 hover:text-[#FF4E02]
                transition-colors duration-300
                rounded-2xl
              ">
							Explore themes
						</a>

						<a
							href="#contribute"
							className="
                w-full sm:w-auto
                px-8 py-4 md:px-10 md:py-5
                border border-[#141414]/12
                bg-white/35 backdrop-blur-md
                font-extrabold uppercase tracking-tight
                hover:border-[#141414]/25 hover:bg-white/55
                transition-colors duration-300
                rounded-2xl
              ">
							Contribute
						</a>
					</div>

					{/* Learn → Vote → Act (participatory positioning) */}
					<div
						data-hero="reveal"
						className="
              mt-8
              grid grid-cols-1 sm:grid-cols-3 gap-3
              w-full max-w-[760px]
            ">
						<div className="rounded-2xl border border-black/10 bg-white/60 backdrop-blur-xl p-4 text-left">
							<div className="text-xs font-black tracking-[0.22em] uppercase text-[#FF4E02]">
								Step 1
							</div>
							<div className="mt-1 font-extrabold text-zinc-900">
								Learn the system
							</div>
							<div className="mt-1 text-sm text-zinc-600">
								Democracy, rights, institutions — in short form.
							</div>
						</div>

						<div className="rounded-2xl border border-black/10 bg-white/60 backdrop-blur-xl p-4 text-left">
							<div className="text-xs font-black tracking-[0.22em] uppercase text-[#FF4E02]">
								Step 2
							</div>
							<div className="mt-1 font-extrabold text-zinc-900">
								React + vote
							</div>
							<div className="mt-1 text-sm text-zinc-600">
								Mark what helped. Flag what confused. Improve the feed.
							</div>
						</div>

						<div className="rounded-2xl border border-black/10 bg-white/60 backdrop-blur-xl p-4 text-left">
							<div className="text-xs font-black tracking-[0.22em] uppercase text-[#FF4E02]">
								Step 3
							</div>
							<div className="mt-1 font-extrabold text-zinc-900">
								Use your voice
							</div>
							<div className="mt-1 text-sm text-zinc-600">
								Participation isn’t a vibe — it’s a practice.
							</div>
						</div>
					</div>

					{/* MOBILE stickers */}
					<div className="md:hidden mt-9 w-full flex items-center justify-center gap-3">
						<div data-hero="sticker" className="select-none">
							<Image
								src="/images/VoteImg3.png"
								alt="Sticker"
								width={84}
								height={84}
								className="drop-shadow-[0_18px_45px_rgba(0,0,0,0.14)]"
							/>
						</div>

						<div data-hero="sticker" className="select-none">
							<Image
								src="/images/VoteImg5.png"
								alt="Sticker"
								width={84}
								height={84}
								className="drop-shadow-[0_18px_45px_rgba(0,0,0,0.14)]"
							/>
						</div>

						<div data-hero="sticker" className="select-none">
							<Image
								src="/images/VoteImg1.png"
								alt="Vote"
								width={98}
								height={98}
								priority
								className="drop-shadow-[0_20px_55px_rgba(0,0,0,0.16)]"
							/>
						</div>
					</div>
				</div>

				{/* RIGHT collage (DESKTOP ONLY) */}
				<div className="hidden md:flex justify-center md:justify-end">
					<div className="relative w-[430px] h-[430px] xl:w-[540px] xl:h-[540px]">
						{/* Main vote sticker */}
						<div
							data-hero="sticker"
							className="
                absolute top-[4%] right-[6%]
                transition-transform duration-300
                hover:-translate-y-2
                will-change-transform
              ">
							<Image
								src="/images/VoteImg1.png"
								alt="Vote"
								width={350}
								height={350}
								priority
								className="select-none drop-shadow-[0_32px_75px_rgba(0,0,0,0.18)]"
							/>
						</div>

						{/* Banner */}
						<div
							data-hero="sticker"
							className="
                absolute top-[56%] left-[2%]
                transition-transform duration-300
                hover:-translate-y-2
                will-change-transform
              ">
							<Image
								src="/images/VoteImg3.png"
								alt="Banner"
								width={230}
								height={230}
								className="select-none drop-shadow-[0_26px_60px_rgba(0,0,0,0.14)]"
							/>
						</div>

						{/* V icon */}
						<div
							data-hero="sticker"
							className="
                absolute bottom-[6%] left-[34%]
                transition-transform duration-300
                hover:-translate-y-2
                will-change-transform
              ">
							<Image
								src="/images/VoteImg5.png"
								alt="V"
								width={230}
								height={230}
								className="select-none drop-shadow-[0_26px_60px_rgba(0,0,0,0.14)]"
							/>
						</div>

						{/* Register sticker */}
						<div
							data-hero="sticker"
							className="
                absolute bottom-[-18%] right-[4%]
                transition-transform duration-300
                hover:-translate-y-2
                will-change-transform
              ">
							<Image
								src="/images/Group 2018779500.png"
								alt="Register"
								width={270}
								height={270}
								className="select-none drop-shadow-[0_26px_60px_rgba(0,0,0,0.14)]"
							/>
						</div>

						{/* Mission pill overlay */}
						<div
							data-hero="sticker"
							className="
                absolute left-[10%] top-[10%]
                rounded-2xl
                border border-black/10
                bg-white/60 backdrop-blur-xl
                px-4 py-3
                shadow-sm
              ">
							<div className="text-[11px] font-black tracking-[0.22em] uppercase text-[#FF4E02]">
								Mission
							</div>
							<div className="mt-1 text-sm font-extrabold text-zinc-900">
								Beat the spin.
							</div>
							<div className="text-xs text-zinc-600 font-semibold">
								Civic education that fits the feed.
							</div>
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
