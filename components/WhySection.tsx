"use client";

import Image from "next/image";

// --- NATIVE SVG ICONS ---
const TikTokIcon = () => (
    <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const InstagramIcon = () => (
    <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const YouTubeIcon = () => (
    <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96C1 8.18 1 12 1 12s0 3.82.46 5.58a2.78 2.78 0 0 0 1.94 1.96c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96c.46-1.76.46-5.58.46-5.58s0-3.82-.46-5.58zM9.54 15.57V8.43L15.82 12l-6.28 3.57z" />
    </svg>
);

export default function WhySection() {
    return (
        <section
            id="about"
            className="relative w-full py-20 lg:py-28 overflow-hidden text-[#0b0b0b]">
            
            <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-[#FF4E02] opacity-[0.03] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-indigo-900 opacity-[0.02] rounded-full blur-3xl pointer-events-none" />

            <div className="relative container mx-auto px-8">
                <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] items-center">
                    <div className="flex flex-col items-start text-left">
                        <div className="inline-flex items-center gap-2 border-2 border-black px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] bg-white shadow-[3px_3px_0_0_rgba(0,0,0,1)] mb-8">
                            <span className="inline-block h-2 w-2 bg-[#FF4E02]" />
                            WHY THIS EXISTS
                        </div>

                        <h3 className="text-[clamp(2.5rem,4vw,4.5rem)] text-black font-black leading-[0.95] tracking-tight uppercase">
                            Civic education is losing
                            <br />
                            <span className="relative inline-block mt-2 text-[#FF4E02]">
                                the attention war.
                                <span className="absolute left-0 right-0 -bottom-1 h-[8px] bg-[#FF4E02] opacity-30 -z-10" />
                            </span>
                        </h3>

                        <div className="mt-8 space-y-5 text-base md:text-lg leading-relaxed font-medium text-black/80 max-w-[55ch]">
                            <p>
                                Billion-dollar marketing and political narrative machines completely dominate the feed. Meanwhile, educators and human rights advocates are still speaking in PDFs and cold lectures.
                            </p>
                            <p>
                                <strong className="font-black text-black">Democracy 101</strong> brings civic power back into the spaces you actually live in: <strong className="font-black text-black">TikTok, Instagram, YouTube.</strong> No corporate tone. Just civic clarity that hits.
                            </p>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 border-2 border-black bg-[#FF4E02] text-black px-3 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rotate-[-2deg] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
                                <TikTokIcon />
                                <span className="font-black uppercase tracking-tight text-[11px] md:text-xs">TikTok</span>
                            </div>
                            <div className="flex items-center gap-2 border-2 border-black bg-white text-black px-3 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rotate-[1deg] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
                                <InstagramIcon />
                                <span className="font-black uppercase tracking-tight text-[11px] md:text-xs">Instagram</span>
                            </div>
                            <div className="flex items-center gap-2 border-2 border-black bg-white text-black px-3 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] rotate-[-1deg] transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
                                <YouTubeIcon />
                                <span className="font-black uppercase tracking-tight text-[11px] md:text-xs">YouTube</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full aspect-video md:aspect-square lg:aspect-[4/3]">
                        <div className="absolute -top-3 left-6 w-24 h-7 bg-black/80 opacity-20 rotate-[-4deg] z-10" />
                        <div className="absolute -bottom-3 right-6 w-20 h-7 bg-black/80 opacity-20 rotate-[5deg] z-10" />

                        <div className="w-full h-full border-2 border-black bg-white shadow-[10px_10px_0_0_rgba(0,0,0,1)] p-4 relative overflow-hidden">
                            <div className="relative w-full h-full border-2 border-black bg-zinc-100 overflow-hidden">
                                <Image 
                                    src="/Images/0cf154f36d9ae74e9bbb0d23f4565318.jpg" 
                                    alt="Content Illustration"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 lg:mt-28 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-10">
                    
                    {/* Card 01 */}
                    <div className="relative group flex flex-col h-full">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-black/80 opacity-20 rotate-[-2deg] z-10" />
                        <div className="flex-1 border-2 border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
                            <div className="relative w-full aspect-[4/3] bg-zinc-100 border-b-2 border-black overflow-hidden">
                                <Image 
                                    src="/Images/848e8640c162e49c8a84501a3cf8f3e7.jpg" 
                                    alt="Democracy as a practice"
                                    fill
                                    className="object-contain" 
                                />
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF4E02] mb-2">
                                    01 • Signal. Not Noise.
                                </div>
                                <h4 className="text-xl lg:text-2xl font-black uppercase tracking-tight mb-3">
                                    Democracy isn’t vibes.
                                </h4>
                                <p className="text-sm font-medium text-black/70 leading-relaxed mt-auto">
                                    It’s a practice. It means understanding your rights, enforcing limits on power, and active participation.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 02 */}
                    <div className="relative group flex flex-col h-full">
                        <div className="absolute -top-4 -right-2 rotate-[6deg] border-2 border-black bg-[#FF4E02] px-3 py-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] z-20">
                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black">
                                NO BS
                            </div>
                        </div>
                        <div className="flex-1 border-2 border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
                            <div className="relative w-full aspect-[4/3] bg-zinc-100 border-b-2 border-black overflow-hidden">
                                <Image 
                                    src="/Images/246472ad3c441f8f8625835f8feed25f.jpg"
                                    alt="Built for the feed"
                                    fill
                                    className="object-contain" 
                                />
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF4E02] mb-2">
                                    02 • Format Matters
                                </div>
                                <h4 className="text-xl lg:text-2xl font-black uppercase tracking-tight mb-3">
                                    Built for the feed.
                                </h4>
                                <p className="text-sm font-medium text-black/70 leading-relaxed mt-auto">
                                    Short, narrative-driven episodes and visual lessons. We make complex civic concepts actually watchable.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 03 */}
                    <div className="relative group flex flex-col h-full">
                         <div className="absolute -bottom-3 right-6 w-20 h-7 bg-black/80 opacity-20 rotate-[5deg] z-10" />
                        <div className="flex-1 border-2 border-black bg-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
                            <div className="relative w-full aspect-[4/3] bg-zinc-100 border-b-2 border-black overflow-hidden">
                                <Image 
                                    src="/Images/f541d7b2ee89d3faf0d02f104ef36ea7.jpg"
                                    alt="Learn Vote Act"
                                    fill
                                    className="object-contain" 
                                />
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF4E02] mb-2">
                                    03 • The Loop
                                </div>
                                <h4 className="text-xl lg:text-2xl font-black uppercase tracking-tight mb-3">
                                    Learn → Vote → Act.
                                </h4>
                                <p className="text-sm font-medium text-black/70 leading-relaxed mt-auto">
                                    Education without action is just trivia. Your participation here makes the platform smarter over time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}