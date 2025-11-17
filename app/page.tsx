"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import Navbar from "@/components/NavBar";
import { ChevronRightIcon, StarIcon, UsersIcon } from "lucide-react";
import ThemeChips from "@/components/ThemeChips";
import VoteBar from "@/components/VoteBar";
import BaseSlider from "@/components/sliders/BaseSlider";
import PosterSlider from "@/components/sliders/PosterSlider";
import VideoSlider from "@/components/sliders/VideoSlider";

export default function Page() {
	const heroRef = useRef<HTMLDivElement | null>(null);

	const headingRef = useRef<HTMLHeadingElement | null>(null);
	const subRef = useRef<HTMLParagraphElement | null>(null);
	const ctaRef = useRef<HTMLDivElement | null>(null);
	const cardsRef = useRef<HTMLDivElement[]>([]);
	const mockupRef = useRef<HTMLDivElement | null>(null);
	const accentRef = useRef<HTMLDivElement | null>(null);

	const addCardRef = (el: HTMLDivElement | null) => {
		if (el && !cardsRef.current.includes(el)) {
			cardsRef.current.push(el);
		}
	};

	useLayoutEffect(() => {
		if (!heroRef.current) return;

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: { duration: 0.9, ease: "power3.out" },
			});

			// Soft clip-path reveal for the red glow accent
			if (accentRef.current) {
				gsap.set(accentRef.current, {
					clipPath: "circle(0% at 70% 25%)",
					opacity: 0.7,
				});

				tl.to(accentRef.current, {
					clipPath: "circle(75% at 70% 25%)",
					duration: 1.2,
					ease: "power3.out",
				});
			}

			// Left side text
			if (headingRef.current) {
				tl.from(headingRef.current, { y: 40, opacity: 0 }, "-=0.6");
			}

			if (subRef.current) {
				tl.from(subRef.current, { y: 20, opacity: 0 }, "-=0.4");
			}

			if (ctaRef.current) {
				tl.from(ctaRef.current, { y: 20, opacity: 0 }, "-=0.3");
			}

			// Feature chips (Explore / Vote / Contribute)
			if (cardsRef.current.length) {
				tl.from(
					cardsRef.current,
					{ y: 40, opacity: 0, stagger: 0.12 },
					"-=0.2"
				);
			}

			// Right mockup stack
			if (mockupRef.current) {
				tl.from(mockupRef.current, { y: 60, opacity: 0, rotate: 4 }, "-=0.5");
			}

			// Gentle idle motion for mockup stack
			if (mockupRef.current) {
				gsap.to(mockupRef.current, {
					y: -8,
					rotate: -2,
					duration: 6,
					repeat: -1,
					yoyo: true,
					ease: "sine.inOut",
				});
			}
		}, heroRef);

		return () => ctx.revert();
	}, []);

	return (
		<main className="min-h-screen  ">
			<Navbar />

			<section className="flex justify-center px-4 mt-20  z-50">
				{/* Main hero card */}
				<div
					ref={heroRef}
					className="relative w-full flex flex-col gap-10 max-w-6xl overflow-hidden rounded-t-[32px] bg-white px-6 py-10 shadow-[0_32px_120px_rgba(0,0,0,0.5)] md:px-12 md:py-14">
					{/* Red spray accent */}
					<div
						ref={accentRef}
						className="pointer-events-none absolute inset-0 -z-10">
						<div className="absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,90,90,0.7)_0,_transparent_60%)] blur-2xl" />
						<div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,_rgba(255,120,80,0.6)_0,_transparent_60%)] blur-3xl" />
					</div>

					{/* Small stars / marks like in the reference */}
					<div className="pointer-events-none absolute inset-0 -z-10">
						<div className="absolute left-6 top-8 h-px w-4 rotate-12 bg-black/40" />
						<div className="absolute left-8 top-8 h-px w-4 -rotate-12 bg-black/40" />
						<div className="absolute right-8 bottom-10 h-px w-4 rotate-12 bg-black/30" />
						<div className="absolute right-10 bottom-10 h-px w-4 -rotate-12 bg-black/30" />
					</div>

					<div className="grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center">
						{/* Left: copy */}
						<div className="space-y-7">
							<div className="space-y-4">
								<p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-500">
									Democracy 101
								</p>
								<h1
									ref={headingRef}
									className="text-balance text-3xl font-semibold leading-tight text-zinc-900 md:text-[40px] md:leading-[1.05]">
									<span className="block">Make Civic Decisions</span>
									<span className="block bg-gradient-to-r from-rose-500 to-orange-400 bg-clip-text text-transparent">
										That Actually Make Sense.
									</span>
								</h1>
								<p
									ref={subRef}
									className="max-w-xl text-sm text-zinc-600 md:text-base">
									Explore short, community-made explainers and posters. Vote on
									what’s most useful and contribute your own ideas, scripts, or
									designs—so civic education finally feels made for you.
								</p>
							</div>

							{/* CTAs */}
							<div ref={ctaRef} className="flex flex-wrap items-center gap-4">
								<button className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition hover:translate-y-[1px] hover:bg-zinc-900">
									Get Started
									<ChevronRightIcon className="ml-2 h-4 w-4" />
								</button>
								<button className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-800 shadow-[0_12px_32px_rgba(0,0,0,0.04)] transition hover:-translate-y-[1px] hover:border-zinc-400">
									<span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-zinc-300 text-[11px]">
										▶
									</span>
									Watch a 60s explainer
								</button>
							</div>

							{/* Feature list chips (Explore / Vote / Contribute) */}
							<div className="mt-4 grid gap-3 md:max-w-md">
								<div
									ref={addCardRef}
									className="flex items-start gap-3 rounded-2xl bg-zinc-50 px-4 py-3 shadow-[0_10px_25px_rgba(0,0,0,0.04)]">
									<div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-600">
										<UsersIcon className="h-4 w-4" />
									</div>
									<div>
										<p className="text-sm font-semibold text-zinc-900">
											Explore explainers & posters
										</p>
										<p className="text-xs text-zinc-500">
											Bite-sized, community-made visuals that decode the basics.
										</p>
									</div>
								</div>

								<div
									ref={addCardRef}
									className="flex items-start gap-3 rounded-2xl bg-zinc-50 px-4 py-3 shadow-[0_10px_25px_rgba(0,0,0,0.04)]">
									<div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-600">
										<StarIcon className="h-4 w-4" />
									</div>
									<div>
										<p className="text-sm font-semibold text-zinc-900">
											Vote what actually helps
										</p>
										<p className="text-xs text-zinc-500">
											Upvotes push the most useful content to the top for
											everyone.
										</p>
									</div>
								</div>

								<div
									ref={addCardRef}
									className="flex items-start gap-3 rounded-2xl bg-zinc-50 px-4 py-3 shadow-[0_10px_25px_rgba(0,0,0,0.04)]">
									<div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
										<ChevronRightIcon className="h-4 w-4" />
									</div>
									<div>
										<p className="text-sm font-semibold text-zinc-900">
											Contribute your own ideas
										</p>
										<p className="text-xs text-zinc-500">
											Scripts, carousels, posters—if it helps someone learn, it
											belongs here.
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Right: stacked mockups / cards */}
						<div
							ref={mockupRef}
							className="relative flex justify-center md:justify-end">
							{/* Simple “device” stack, Uifry-style */}
							<div className="relative h-[320px] w-[220px] rotate-[-10deg] rounded-[28px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
								<div className="absolute inset-[10px] rounded-[24px] bg-zinc-900 text-zinc-50 p-4 flex flex-col justify-between">
									<div>
										<p className="text-[11px] text-zinc-400">Today’s topic</p>
										<p className="mt-1 text-sm font-semibold">
											How your city council really works
										</p>
									</div>
									<div className="space-y-2 text-[11px]">
										<div className="flex justify-between">
											<span className="text-zinc-400">Length</span>
											<span>2 min explainer</span>
										</div>
										<div className="flex justify-between">
											<span className="text-zinc-400">Votes</span>
											<span className="text-emerald-300 font-semibold">
												+248 helpful
											</span>
										</div>
									</div>
								</div>
							</div>

							<div className="absolute right-0 top-12 h-[300px] w-[210px] rotate-[8deg] rounded-[28px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
								<div className="absolute inset-[10px] rounded-[24px] bg-gradient-to-br from-rose-500 via-orange-400 to-yellow-300 p-4 text-zinc-900 flex flex-col justify-between">
									<video
										className="absolute inset-0 h-full w-full object-cover z-20 "
										src="/4766263-hd_1366_720_24fps.mp4"
										autoPlay
										muted
										loop
										playsInline
									/>
									<div className="text-[11px] font-semibold uppercase tracking-[0.18em]">
										Poster preview
									</div>
									<div className="text-sm font-bold leading-tight">
										Your Voice
										<br />
										Is A Vote.
									</div>
									<div className="text-[10px] text-zinc-800/80">
										Made by <span className="font-semibold">Ayla, 19</span>
									</div>
								</div>
							</div>

							<div className="absolute -left-4 bottom-0 rounded-full bg-black px-4 py-2 text-[11px] font-medium text-white shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
								10,000+ young people learning together
							</div>
						</div>
					</div>
					<PosterSlider />
					<VideoSlider />
				</div>
			</section>
		</main>
	);
}
