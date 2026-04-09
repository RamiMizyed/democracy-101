"use client";

import ContributeDialog from "@/components/ContributeDialog";

export default function ContributeSection() {
    // Upgraded the punk button to be a massive, primary CTA
    const mainCtaBtn =
        "w-full sm:w-auto rounded-none border-2 border-black bg-[#FF4E02] text-black text-lg md:text-xl font-black uppercase tracking-wide " +
        "shadow-[8px_8px_0_0_rgba(0,0,0,1)] px-10 py-5 " +
        "transition-all duration-200 " +
        "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[5px_5px_0_0_rgba(0,0,0,1)] hover:bg-black hover:text-white " +
        "active:translate-x-[4px] active:translate-y-[4px] active:shadow-[2px_2px_0_0_rgba(0,0,0,1)]";

    return (
        <section
            id="contribute"
            className="relative w-full py-20 lg:py-28 overflow-hidden text-[#141414] scroll-mt-28">
            
            {/* Background elements */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute inset-0 bg-[#f5efe6]" />
                <div className="absolute -top-[26%] -left-[18%] w-[58%] h-[58%] bg-[#FF4E02]/18 blur-[150px] rounded-full" />
                <div className="absolute -bottom-[26%] -right-[16%] w-[62%] h-[62%] bg-fuchsia-500/12 blur-[170px] rounded-full" />
                <div className="absolute top-[14%] right-[10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[165px] rounded-full" />

                <div
                    className="absolute inset-0 opacity-[0.14]"
                    style={{
                        backgroundImage: "radial-gradient(rgba(20,20,20,0.75) 1px, transparent 1px)",
                        backgroundSize: "42px 42px",
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.10] mix-blend-multiply"
                    style={{ backgroundImage: "url(https://grainy-gradients.vercel.app/noise.svg)" }}
                />
            </div>

            {/* REMOVED max-w-[1100px] so it matches the other components perfectly */}
            <div className="container mx-auto px-8">
                
                {/* Poster Box */}
                <div className="relative">
                    {/* tape */}
                    <div className="pointer-events-none absolute -top-3 left-10 w-24 h-7 bg-black/80 opacity-20 rotate-[-8deg] z-10" />
                    <div className="pointer-events-none absolute -top-4 right-14 w-20 h-7 bg-black/80 opacity-20 rotate-[10deg] z-10" />

                    <div className="relative z-0 border-2 border-black bg-white shadow-[12px_12px_0_0_rgba(0,0,0,1)] p-8 md:p-12">
                        
                        {/* Header Area */}
                        <div className="max-w-[800px]">
                            <div className="inline-flex items-center gap-2 border-2 border-black bg-[#FF4E02] px-3 py-1 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                                <span className="inline-block w-2 h-2 bg-black" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black">
                                    Contribute
                                </span>
                            </div>

                            <h3 className="mt-6 text-4xl md:text-5xl font-black uppercase tracking-tight leading-[0.95]">
                                Help build Democracy 101.
                            </h3>

                            <p className="mt-4 text-base md:text-lg font-semibold text-black/80 leading-relaxed max-w-[65ch]">
                                Bring your skills. Bring your chaos (the good kind). We’re making civic education that actually survives the feed.
                                <span className="ml-3 inline-block border-2 border-black bg-zinc-100 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
                                    learn → vote → act
                                </span>
                            </p>
                        </div>

                        {/* 3 Steps Grid */}
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                {
                                    n: "01",
                                    t: "Submit an idea",
                                    d: "Got a hook, an outline, or a topic we missed? Tell us why it matters.",
                                },
                                {
                                    n: "02",
                                    t: "Send visuals",
                                    d: "Designers and artists: drop your stickers, frames, and style tests here.",
                                },
                                {
                                    n: "03",
                                    t: "Help research",
                                    d: "Fact-checkers and nerds: we need sources, links, and examples that hit hard.",
                                },
                            ].map((c) => (
                                <div key={c.n} className="border-2 border-black p-5 bg-[#f5efe6] flex flex-col">
                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF4E02]">
                                        {c.n}
                                    </div>
                                    <div className="mt-2 text-lg font-black uppercase tracking-tight leading-none">{c.t}</div>
                                    <div className="mt-2 text-sm font-semibold text-black/70 leading-relaxed">
                                        {c.d}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Divider & Single Mega CTA */}
                        <div className="mt-12 border-t-2 border-black border-dashed pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="max-w-[45ch]">
                                <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight">Ready to jump in?</h4>
                                <p className="text-sm font-semibold text-black/70 mt-2 leading-relaxed">
                                    Hit the button below to start your submission. You can choose to contribute ideas, visuals, or research on the next screen.
                                </p>
                            </div>
                            
                            {/* Single Action Button */}
                            <div className="shrink-0 w-full md:w-auto">
                                <ContributeDialog
                                    label="Submit Contribution →"
                                    buttonClassName={mainCtaBtn}
                                    // Removed the rogue type="general" prop causing the TS error
                                />
                            </div>
                        </div>

                        {/* Footer tags */}
                        <div className="mt-12 flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/60 mr-2">
                                wanted:
                            </span>
                            {[
                                "youth creators",
                                "design punks",
                                "research nerds",
                                "editors",
                            ].map((x) => (
                                <span
                                    key={x}
                                    className="border-2 border-black bg-zinc-100 px-2 py-1 text-[10px] font-black uppercase tracking-wider">
                                    {x}
                                </span>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}