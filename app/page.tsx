"use client";

import { useLayoutEffect, useRef, useState, useEffect, useMemo } from "react";
import gsap from "gsap";
import { useVoteStore } from "@/lib/stores/useVoteStore";
import Navbar from "@/components/NavBar";
import Landing from "@/components/Landing";
import WhySection from "@/components/WhySection";
import ThemePicker from "@/components/ThemePicker";
import ContentFeed from "@/components/ContentFeed";
import ContributeSection from "@/components/ContributeSection";
import { MOCK_CONTENT } from "@/lib/data";

export default function Page() {
    const heroRef = useRef<HTMLDivElement | null>(null);

    // State for filtering
    const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

    // Filter Logic
    const toggleTheme = (theme: string) => {
        if (theme === "CLEAR_ALL") {
            setSelectedThemes([]);
            return;
        }
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

    // GSAP Animation
    useLayoutEffect(() => {
        if (!heroRef.current) return;
        const ctx = gsap.context(() => {
            // ... Your existing GSAP animations
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <main className="min-h-screen bg-[#f6f0e8] text-[#141414]">
            <Navbar />

            {/* Hero Section */}
            <div ref={heroRef}>
                <Landing />
            </div>
            
            <WhySection />

            {/* Unified Theme Picker / Filter */}
            <ThemePicker 
                selectedThemes={selectedThemes} 
                onToggleTheme={toggleTheme} 
            />

            <div className="w-full pb-24" id="lessons">
                {/* Consistent container padding (px-8) */}
                <section className="container mx-auto px-8 flex flex-col gap-16">
                    
                    {/* FEED 1: VIDEOS (Moved to the top) */}
                    <ContentFeed
                        title={
                            selectedThemes.length
                                ? `Videos in ${selectedThemes.join(", ")}`
                                : "Trending Videos"
                        }
                        items={filteredVideos}
                    />

                    {/* FEED 2: IMAGES (Infographics moved below videos) */}
                    <ContentFeed
                        title={
                            selectedThemes.length
                                ? `Images in ${selectedThemes.join(", ")}`
                                : "Popular Infographics"
                        }
                        items={filteredImages}
                    />
                    
                </section>
                
                {/* Full-width Contribute Section */}
                <ContributeSection />
            </div>
        </main>
    );
}