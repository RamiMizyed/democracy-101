"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Lora } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";

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
            // 1. FIXED HEIGHT: Forces the section to fit exactly under the nav
            // 2. MIN-HEIGHT: Prevents crushing on super short screens
            // 3. FLEX: Centers the inner container perfectly
            className={`relative w-full h-[calc(100svh-78px)] min-h-[600px] flex items-center overflow-hidden ${lora.variable} antialiased bg-[#f6f0e8] text-[#0b0b0b]`}>
            
            {/* ZINE BACKDROP */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[#f6f0e8]" />
                <div className="absolute inset-0 opacity-[0.07] bg-[repeating-linear-gradient(135deg,rgba(0,0,0,0.9)_0px,rgba(0,0,0,0.9)_1px,transparent_1px,transparent_14px)]" />
                <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle,rgba(0,0,0,1)_1px,transparent_1px)] [background-size:18px_18px]" />
                <div className="absolute -top-12 -left-10 w-[560px] h-[140px] rotate-[-10deg] bg-[#FF4E02] opacity-[0.15]" />
                <div className="absolute top-10 right-[-140px] w-[520px] h-[44px] rotate-[7deg] bg-black/80 opacity-[0.10]" />
                <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#f6f0e8] via-transparent to-transparent z-20" />
            </div>

            {/* HERO CONTAINER */}
            <div
                className="
          relative z-10
          container mx-auto
          px-8 
          grid gap-12
          md:grid-cols-[1.2fr_0.8fr]
          items-center
        ">
                {/* LEFT CONTENT */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    {/* STAMP */}
                    <div data-hero="reveal" className="mb-6">
                        <span className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                            <span className="inline-block h-2 w-2 bg-[#FF4E02]" />
                            Democracy 101
                        </span>
                    </div>

                    {/* HEADLINE */}
                    <h1
                        data-hero="reveal"
                        className="
              font-[var(--font-lora)]
              font-black tracking-tight
              leading-[0.95]
              text-[clamp(2.5rem,4.5vw,4.5rem)] 
              max-w-[20ch]
              uppercase
            ">
                        <span className="block">Democracy</span>
                        <span className="block mt-2">
                            is not a{" "}
                            <span className="relative inline-block text-[#FF4E02]">
                                destination
                                <span className="absolute left-0 right-0 -bottom-1 h-[8px] bg-[#FF4E02] opacity-30 -z-10" />
                            </span>
                            .
                        </span>
                        <span className="block mt-4 text-[clamp(1rem,1.5vw,1.5rem)] font-bold uppercase opacity-80 tracking-wide">
                            It’s a practice. Learn it. Use it. Defend it.
                        </span>
                    </h1>

                    {/* SUBCOPY */}
                    <div data-hero="reveal" className="mt-8 max-w-[54ch]">
                        <p className="text-sm md:text-base leading-relaxed font-medium text-black/80">
                            <strong className="font-black text-black uppercase tracking-wide mr-2">
                                Our Mission:
                            </strong>
                            Brands and governments spend billions to shape what you think. We bring democracy, human rights, and civic power into the same feeds through short, narrative-driven videos. No cold lectures. Just the ideas that change reality.
                        </p>
                    </div>

                    {/* CTA - Updated Text & Link Target */}
                    <div
                        data-hero="reveal"
                        className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link
                            href="#lessons"
                            className="
                group
                inline-flex items-center justify-center gap-3
                border-2 border-black
                bg-[#FF4E02] text-black
                px-8 py-4
                font-black uppercase tracking-wider text-sm
                shadow-[6px_6px_0_0_rgba(0,0,0,1)]
                hover:translate-x-[2px] hover:translate-y-[2px]
                hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]
                transition-all
              ">
                            Start Watching
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* MOBILE STICKER STRIP */}
                    <div className="md:hidden mt-10 w-full flex items-center justify-center gap-4">
                        <div data-hero="sticker" className="rotate-[-2deg]">
                            <Image src="/Images/VoteImg3.png" alt="Sticker" width={72} height={72} className="select-none" />
                        </div>
                        <div data-hero="sticker" className="rotate-[2deg]">
                            <Image src="/Images/VoteImg5.png" alt="Sticker" width={72} height={72} className="select-none" />
                        </div>
                        <div data-hero="sticker" className="rotate-[-1deg]">
                            <Image src="/Images/VoteImg1.png" alt="Vote" width={84} height={84} className="select-none" priority />
                        </div>
                    </div>
                </div>

                {/* RIGHT COLLAGE (DESKTOP ONLY) */}
                <div className="hidden md:flex justify-center md:justify-end relative h-full items-center">
                    <div className="relative w-[380px] h-[460px] xl:w-[480px] xl:h-[540px]">
                        <div className="absolute -top-2 left-8 w-20 h-6 bg-black/80 opacity-20 rotate-[-8deg]" />
                        <div className="absolute -top-3 right-10 w-16 h-6 bg-black/80 opacity-20 rotate-[11deg]" />

                        <div data-hero="sticker" className="absolute top-[8%] right-[2%] rotate-[2deg] border-2 border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-2 z-10">
                            <Image src="/Images/VoteImg1.png" alt="Vote" width={280} height={280} priority className="select-none" />
                        </div>

                        <div data-hero="sticker" className="absolute bottom-[40%] left-[-10%] rotate-[1deg] border-2 border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-2 z-20">
                            <Image src="/Images/VoteImg3.png" alt="Banner" width={200} height={200} className="select-none" />
                        </div>

                        <div data-hero="sticker" className="absolute bottom-[2%] right-[25%] rotate-[-3deg] border-2 border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-2 z-30">
                            <Image src="/Images/VoteImg5.png" alt="V" width={180} height={180} className="select-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* SCROLL CUE */}
            <div
                data-hero="scroll"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
                <div className="flex items-center gap-2 border-2 border-black bg-white px-4 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <span className="text-[10px] font-black uppercase tracking-wider">
                        Scroll to learn
                    </span>
                    <ChevronDown className="scroll-arrow w-4 h-4" />
                </div>
            </div>
        </section>
    );
}