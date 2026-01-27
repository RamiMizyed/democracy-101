"use client";

import Link from "next/link";

export default function WhySection() {
	return (
		<section
			id="about"
			className="relative w-full py-16 overflow-hidden  text-[#0b0b0b]">
			{/* RAW ZINE BACKDROP */}

			<div className="relative container mx-auto px-6 ">
				{/* TOP STAMP */}
				<div className="inline-flex items-center gap-3">
					<span className="inline-flex items-center gap-2 border-2 border-black px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] bg-white">
						<span className="inline-block h-2 w-2 bg-[#FF4E02]" />
						WHY THIS EXISTS
					</span>

					<span className="text-[11px] font-black uppercase tracking-[0.22em] opacity-70">
						NOT A NONPROFIT BROCHURE
					</span>
				</div>

				<div className="mt-7 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
					{/* LEFT: BIG MESSAGE */}
					<div>
						<h3 className="text-[clamp(2.2rem,4vw,3.6rem)]  bg-gradient-to-r from-[#FF4E02] to-rose-900 text-transparent bg-clip-text font-black leading-[0.95] tracking-tight uppercase">
							Civic education is losing
							<br />
							<span className="relative inline-block">
								the attention war.
								<span className="absolute left-0 right-0 -bottom-1 h-[10px] bg-[#FF4E02] opacity-70 -z-10" />
							</span>
						</h3>

						<p className="mt-5 max-w-[72ch] text-base md:text-lg leading-relaxed font-semibold text-black/80">
							Billion-dollar marketing + political narrative machines dominate
							the feed.
							<br />
							Meanwhile, educators and human rights people are still speaking in
							PDFs.
						</p>

						<p className="mt-4 max-w-[72ch] text-base md:text-lg leading-relaxed font-semibold text-black/80">
							<span className="font-black text-black">Democracy 101</span>{" "}
							brings democracy back into the same spaces young people actually
							live in:
							<span className="font-black text-black">
								{" "}
								TikTok, Instagram, YouTube
							</span>
							.
							<br />
							No lectures. No corporate tone. Just civic clarity that hits.
						</p>

						{/* STICKER CHIPS */}
						<div className="mt-6 flex flex-wrap gap-2">
							<span className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-tight rotate-[-2deg]">
								⚡ short episodes
							</span>
							<span className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-tight rotate-[1deg]">
								🧠 real examples
							</span>
							<span className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-tight rotate-[-1deg]">
								🗳️ participation-first
							</span>
							<span className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-tight rotate-[2deg]">
								🔥 feed-native
							</span>
						</div>

						{/* CTA (RAW) */}
						<div className="mt-8 flex flex-col sm:flex-row gap-3">
							<Link
								href="#lessons"
								className="
                  inline-flex items-center justify-center
                  border-2 border-black
                  bg-black text-white
                  px-6 py-4
                  font-black uppercase tracking-tight
                  shadow-[6px_6px_0_0_rgba(0,0,0,1)]
                  hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]
                  transition
                ">
								Start learning
							</Link>

							<Link
								href="#contribute"
								className="
                  inline-flex items-center justify-center
                  border-2 border-black
                  bg-white text-black
                  px-6 py-4
                  font-black uppercase tracking-tight
                  shadow-[6px_6px_0_0_rgba(0,0,0,1)]
                  hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]
                  transition
                ">
								Contribute
							</Link>
						</div>
					</div>

					{/* RIGHT: ZINE NOTE / MANIFESTO BOX */}
					<div className="relative">
						{/* tape corners */}
						<div className="absolute -top-3 left-6 w-20 h-6 bg-black/80 opacity-20 rotate-[-8deg]" />
						<div className="absolute -top-2 right-7 w-16 h-6 bg-black/80 opacity-20 rotate-[10deg]" />

						<div className="border-2 border-black bg-white p-6 shadow-[10px_10px_0_0_rgba(0,0,0,1)]">
							<div className="flex items-start justify-between gap-3">
								<div>
									<div className="text-[11px] font-black uppercase tracking-[0.22em] text-black/70">
										OUR PROMISE
									</div>
									<div className="mt-2 text-2xl font-black uppercase leading-none">
										Signal.
										<span className="text-[#FF4E02]"> Not noise.</span>
									</div>
								</div>

								<span className="border-2 border-black bg-[#FF4E02] px-2 py-1 text-[11px] font-black uppercase tracking-[0.18em]">
									NO BS
								</span>
							</div>

							<div className="mt-5 space-y-3">
								<div className="border-2 border-black p-3">
									<div className="text-[11px] font-black uppercase tracking-[0.22em] opacity-70">
										01
									</div>
									<div className="mt-1 font-black uppercase">
										Democracy isn’t vibes.
									</div>
									<div className="mt-1 text-sm font-semibold text-black/80">
										It’s a practice. Rights, limits on power, participation.
									</div>
								</div>

								<div className="border-2 border-black p-3">
									<div className="text-[11px] font-black uppercase tracking-[0.22em] opacity-70">
										02
									</div>
									<div className="mt-1 font-black uppercase">
										Built for the feed.
									</div>
									<div className="mt-1 text-sm font-semibold text-black/80">
										Short episodes + visuals that are actually watchable.
									</div>
								</div>

								<div className="border-2 border-black p-3">
									<div className="text-[11px] font-black uppercase tracking-[0.22em] opacity-70">
										03
									</div>
									<div className="mt-1 font-black uppercase">
										Learn → vote → act.
									</div>
									<div className="mt-1 text-sm font-semibold text-black/80">
										Participation makes the platform smarter over time.
									</div>
								</div>
							</div>

							{/* scribble footer */}
							<div className="mt-6 border-t-2 border-black pt-4">
								<div className="text-sm font-black uppercase tracking-tight">
									DIY civic clarity. made for young people.
								</div>
								<div className="mt-2 text-xs font-semibold text-black/70">
									No one is coming to save democracy for you. That’s the point.
								</div>
							</div>
						</div>

						{/* side sticker */}
						<div className="absolute -bottom-6 -left-4 rotate-[-6deg] border-2 border-black bg-[#FF4E02] px-3 py-2 shadow-[6px_6px_0_0_rgba(0,0,0,1)]">
							<div className="text-[11px] font-black uppercase tracking-[0.22em] text-black">
								YOUTH MADE
							</div>
						</div>
					</div>
				</div>

				{/* BOTTOM: THEME STRIP (PUNK NAV) */}
				<div className="mt-10 border-2 border-black bg-white px-4 py-4 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
					<div className="flex flex-wrap items-center gap-2">
						<span className="text-[11px] font-black uppercase tracking-[0.22em] opacity-70">
							WE HIT:
						</span>
						<span className="border-2 border-black px-2 py-1 text-xs font-black uppercase">
							Ideas
						</span>
						<span className="border-2 border-black px-2 py-1 text-xs font-black uppercase">
							Institutions
						</span>
						<span className="border-2 border-black px-2 py-1 text-xs font-black uppercase">
							Power
						</span>
						<span className="border-2 border-black px-2 py-1 text-xs font-black uppercase">
							Future
						</span>

						<span className="ml-auto text-xs font-black uppercase tracking-tight">
							<span className="text-[#FF4E02]">Next:</span> scroll down → pick a
							topic → vote
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
