"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useEffect, useMemo } from "react";
import { useVoteStore } from "@/lib/stores/useVoteStore";
import Navbar from "@/components/NavBar";
import ThemeChips from "@/components/ThemeChips";
import ContentFeed from "@/components/ContentFeed"; // The new component
import Landing from "@/components/Landing";
import ContributeDialog from "@/components/ContributeDialog";
import { MOCK_CONTENT } from "@/lib/data"; // Your data source
import WhySection from "@/components/WhySection";
import ThemePicker from "@/components/ThemePicker";
import ContributeSection from "@/components/ContributeSection";

export default function Page() {
	const heroRef = useRef<HTMLDivElement | null>(null);

	// State for filtering
	const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

	// Filter Logic
	const toggleTheme = (theme: string) => {
		setSelectedThemes((prev) =>
			prev.includes(theme) ? prev.filter((x) => x !== theme) : [...prev, theme],
		);
	};

	// Filter content based on selection
	const filteredVideos = MOCK_CONTENT.filter(
		(i) =>
			i.type === "video" &&
			(selectedThemes.length === 0 || selectedThemes.includes(i.category)),
	);

	const filteredImages = MOCK_CONTENT.filter(
		(i) =>
			i.type === "image" &&
			(selectedThemes.length === 0 || selectedThemes.includes(i.category)),
	);
	const hydrateVotes = useVoteStore((s) => s.hydrate);

	const allIds = useMemo(() => {
		return [...filteredImages, ...filteredVideos].map((i) => i.id);
	}, [filteredImages, filteredVideos]);

	useEffect(() => {
		if (allIds.length) hydrateVotes(allIds);
	}, [allIds.join(","), hydrateVotes]);

	// GSAP Animation (Cleaned up)
	useLayoutEffect(() => {
		if (!heroRef.current) return;
		const ctx = gsap.context(() => {
			// ... Your existing GSAP animations
		}, heroRef);
		return () => ctx.revert();
	}, []);

	return (
		<main className="min-h-screen bg-zinc-50">
			<Navbar />

			{/* Hero Section */}
			<div ref={heroRef}>
				<Landing />
			</div>
			<WhySection />
			<ThemePicker />

			<div className="w-full bg-linear-to-b from-zinc-50 to-indigo-50/50 pb-20">
				{/* Sticky Filter Bar */}

				<section className="container mx-auto  px-4 flex flex-col gap-12 mt-8">
					{/* ACTION BUTTON */}

					<ThemeChips selected={selectedThemes} onToggle={toggleTheme} />

					{/* FEED 1: IMAGES (Infographics) */}
					<ContentFeed
						title={
							selectedThemes.length
								? `Images in ${selectedThemes.join(", ")}`
								: "Popular Infographics"
						}
						items={filteredImages}
					/>

					{/* FEED 2: VIDEOS */}
					<ContentFeed
						title={
							selectedThemes.length
								? `Videos in ${selectedThemes.join(", ")}`
								: "Trending Videos"
						}
						items={filteredVideos}
					/>
				</section>
				<div className="flex flex-col justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-zinc-100">
					<div>
						<h3 className="font-bold text-zinc-800">Got an idea?</h3>
						<p className="text-sm text-zinc-500">
							Help us explain democracy better.
						</p>
					</div>
					<ContributeSection />
					<ContributeDialog label="Contribute" type="General" />
				</div>
			</div>
		</main>
	);
}
