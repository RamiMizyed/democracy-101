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
			// ✅ Clean motion only: opacity + y (no blur, no rotation animation)
			gsap.set("[data-hero='reveal']", { autoAlpha: 0, y: 12 });
			gsap.set("[data-hero='sticker']", { autoAlpha: 0, y: 14 });
			gsap.set("[data-hero='scroll']", { autoAlpha: 0, y: 10 });

			if (prefersReducedMotion) {
				gsap.set("[data-hero='reveal']", { autoAlpha: 1, y: 0 });
				gsap.set("[data-hero='sticker']", { autoAlpha: 1, y: 0 });
				gsap.set("[data-hero='scroll']", { autoAlpha: 1, y: 0 });
				return;
			}

			const tl = gsap.timeline({
				defaults: { ease: "power2.out", duration: 0.65 },
			});

			tl.to("[data-hero='reveal']", {
				autoAlpha: 1,
				y: 0,
				stagger: 0.075,
			});

			tl.to(
				"[data-hero='sticker']",
				{
					autoAlpha: 1,
					y: 0,
					stagger: 0.06,
					duration: 0.7,
				},
				"-=0.32",
			);

			tl.to(
				"[data-hero='scroll']",
				{
					autoAlpha: 1,
					y: 0,
					duration: 0.55,
				},
				"-=0.22",
			);

			// subtle scroll arrow (classy)
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
			className={`relative w-full overflow-hidden ${lora.variable} antialiased bg-[#f6f0e8] text-[#0b0b0b]`}>
			{/* ZINE BACKDROP */}
			<div className="pointer-events-none absolute inset-0">
				{/* base paper */}
				<div className="absolute inset-0 bg-[#f6f0e8]" />

				{/* harsh cross hatch */}
				<div className="absolute inset-0 opacity-[0.10] bg-[repeating-linear-gradient(135deg,rgba(0,0,0,0.9)_0px,rgba(0,0,0,0.9)_1px,transparent_1px,transparent_14px)]" />

				{/* micro dots */}
				<div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle,rgba(0,0,0,1)_1px,transparent_1px)] [background-size:18px_18px]" />

				{/* orange slash */}
				<div className="absolute -top-12 -left-10 w-[560px] h-[140px] rotate-[-10deg] bg-[#FF4E02] opacity-[0.18]" />

				{/* black tape strip */}
				<div className="absolute top-10 right-[-140px] w-[520px] h-[44px] rotate-[7deg] bg-black/80 opacity-[0.12]" />

				{/* bottom dirty vignette */}
				<div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-t from-black/10 via-transparent to-transparent" />
			</div>

			{/* HERO */}
			<div
				className="
          relative z-10
          container mx-auto
          px-6 
          min-h-[calc(100svh-78px)]
          py-14 md:py-20
          grid gap-10
          md:grid-cols-[1.12fr_0.88fr]
          items-center
        ">
				{/* LEFT */}
				<div className="flex flex-col items-center md:items-start text-center md:text-left">
					{/* STAMP */}
					<div data-hero="reveal" className="mb-5">
						<span className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em]">
							<span className="inline-block h-2 w-2 bg-[#FF4E02]" />
							Democracy 101
						</span>

						<span className="ml-3 text-[11px] font-black uppercase tracking-[0.22em] opacity-60">
							feed-native civic education
						</span>
					</div>

					{/* HEADLINE */}
					<h1
						data-hero="reveal"
						className="
              font-[var(--font-lora)]
              font-black tracking-tight
              leading-[0.88]
              text-[clamp(2.55rem,6.2vw,6.2rem)]
              max-w-[22ch]
              uppercase
            ">
						<span className="block">Democracy</span>

						<span className="block mt-1">
							is not a{" "}
							<span className="relative inline-block text-[#FF4E02]">
								destination
								<span className="absolute left-0 right-0 -bottom-1 h-[10px] bg-[#FF4E02] opacity-70 -z-10" />
							</span>
							.
						</span>

						<span className="block mt-3 text-[clamp(1.05rem,2.3vw,2rem)] font-black uppercase opacity-80">
							it’s a practice. learn it. use it. defend it.
						</span>
					</h1>

					{/* SUBCOPY */}
					<p
						data-hero="reveal"
						className="mt-6 max-w-[68ch] text-base md:text-lg leading-relaxed font-semibold text-black/80">
						Brands and governments spend billions to shape what you think.
						<br />
						We bring democracy, human rights, and civic power into the same
						feeds —<span className="font-black text-black">
							{" "}
							short videos
						</span>,{" "}
						<span className="font-black text-black">visual lessons</span>, and
						tools that let you participate.
						<span className="ml-2 inline-block border-2 border-black text-white bg-[#FF4E02] px-2 py-0.5 text-xs font-black uppercase tracking-tight">
							no lectures
						</span>
					</p>

					{/* CTA (SCREEN PRINT STYLE) */}
					<div
						data-hero="reveal"
						className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
						<Link
							href="#lessons"
							className="
                inline-flex items-center justify-center
                border-2 border-black
                bg-black text-white
                px-6 py-4
                font-black uppercase tracking-tight
                shadow-[6px_6px_0_0_rgba(0,0,0,1)]
                hover:translate-x-[1px] hover:translate-y-[1px]
                hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]
                transition
              ">
							Start learning
						</Link>

						<Link
							href="#themes"
							className="
                inline-flex items-center justify-center
                border-2 border-black
                bg-white text-black
                px-6 py-4
                font-black uppercase tracking-tight
                shadow-[6px_6px_0_0_rgba(0,0,0,1)]
                hover:translate-x-[1px] hover:translate-y-[1px]
                hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]
                transition
              ">
							Explore themes
						</Link>

						<Link
							href="#contribute"
							className="
                inline-flex items-center justify-center
                border-2 border-black
                bg-[#FF4E02] text-black
                px-6 py-4
                font-black uppercase tracking-tight
                shadow-[6px_6px_0_0_rgba(0,0,0,1)]
                hover:translate-x-[1px] hover:translate-y-[1px]
                hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]
                transition
              ">
							Contribute
						</Link>
					</div>

					{/* MOBILE STICKER STRIP */}
					<div className="md:hidden mt-9 w-full flex items-center justify-center gap-3">
						<div data-hero="sticker" className="rotate-[-2deg]">
							<Image
								src="/Images/VoteImg3.png"
								alt="Sticker"
								width={88}
								height={88}
								className="select-none"
								priority={false}
							/>
						</div>

						<div data-hero="sticker" className="rotate-[2deg]">
							<Image
								src="/Images/VoteImg5.png"
								alt="Sticker"
								width={88}
								height={88}
								className="select-none"
								priority={false}
							/>
						</div>

						<div data-hero="sticker" className="rotate-[-1deg]">
							<Image
								src="/Images/VoteImg1.png"
								alt="Vote"
								width={104}
								height={104}
								className="select-none"
								priority
							/>
						</div>
					</div>
				</div>

				{/* RIGHT COLLAGE (DESKTOP ONLY) */}
				<div className="hidden md:flex justify-center md:justify-end">
					<div className="relative w-[440px] h-[520px] xl:w-[560px] xl:h-[620px]">
						{/* tape corners */}
						<div className="absolute -top-2 left-8 w-24 h-7 bg-black/80 opacity-20 rotate-[-8deg]" />
						<div className="absolute -top-3 right-10 w-20 h-7 bg-black/80 opacity-20 rotate-[11deg]" />

						{/* big sticker */}
						<div
							data-hero="sticker"
							className="
                absolute top-[6%] right-[4%]
                rotate-[2deg]
                border-2 border-black
                bg-white
                shadow-[10px_10px_0_0_rgba(0,0,0,1)]
                p-3
              ">
							<Image
								src="/Images/VoteImg1.png"
								alt="Vote"
								width={340}
								height={340}
								priority
								className="select-none"
							/>
						</div>

						{/* manifesto card */}
						{/* <div
							data-hero="sticker"
							className="
                absolute left-[0%] top-[12%]
                w-[290px]
                border-2 border-black
                bg-white
                shadow-[10px_10px_0_0_rgba(0,0,0,1)]
                p-5
                rotate-[-2deg]
              ">
							<div className="flex items-start justify-between gap-3">
								<div>
									<div className="text-[11px] font-black uppercase tracking-[0.22em] opacity-70">
										mission
									</div>
									<div className="mt-2 text-2xl font-black uppercase leading-none">
										Beat the <span className="text-[#FF4E02]">spin</span>.
									</div>
								</div>

								<span className="border-2 border-black bg-[#FF4E02] px-2 py-1 text-[11px] font-black uppercase tracking-[0.18em]">
									no bs
								</span>
							</div>

							<div className="mt-4 space-y-3">
								<div className="border-2 border-black p-3">
									<div className="text-[11px] font-black uppercase tracking-[0.22em] opacity-60">
										01
									</div>
									<div className="mt-1 font-black uppercase">
										Rights are standards
									</div>
									<div className="mt-1 text-sm font-semibold text-black/80">
										Not rewards. Limits on power.
									</div>
								</div>

								<div className="border-2 border-black p-3">
									<div className="text-[11px] font-black uppercase tracking-[0.22em] opacity-60">
										02
									</div>
									<div className="mt-1 font-black uppercase">
										Minorities matter
									</div>
									<div className="mt-1 text-sm font-semibold text-black/80">
										Majorities stay legit by protecting dissent.
									</div>
								</div>
							</div>
						</div> */}

						{/* banner sticker */}
						<div
							data-hero="sticker"
							className="
                absolute bottom-[50%] left-[-6%]
                rotate-[1deg]
                border-2 border-black bg-white
                shadow-[10px_10px_0_0_rgba(0,0,0,1)]
                p-3
              ">
							<Image
								src="/Images/VoteImg3.png"
								alt="Banner"
								width={230}
								height={230}
								className="select-none"
							/>
						</div>

						{/* V icon */}
						<div
							data-hero="sticker"
							className="
                absolute bottom-[5%] right-[34%]
                rotate-[-2deg]
                border-2 border-black bg-white
                shadow-[10px_10px_0_0_rgba(0,0,0,1)]
                p-3
              ">
							<Image
								src="/Images/VoteImg5.png"
								alt="V"
								width={220}
								height={220}
								className="select-none"
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
            border-2 border-black
            bg-white
            px-4 py-2
            shadow-[6px_6px_0_0_rgba(0,0,0,1)]
          ">
					<span className="text-xs font-black uppercase tracking-tight">
						scroll for lessons
					</span>
					<ChevronDown className="scroll-arrow w-4 h-4" />
				</div>
			</div>
		</section>
	);
}
