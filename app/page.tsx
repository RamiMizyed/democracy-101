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
import Landing from "@/components/Landing";

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
			<Landing />
			<section className="mx-auto pt-10 max-w-6xl flex flex-col gap-[5vh]">
				<ThemeChips />
				<PosterSlider />
				<VideoSlider />
			</section>
		</main>
	);
}
