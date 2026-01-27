"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type Theme = {
	id: string;
	label: string;
	desc: string;
};

export default function ThemePicker() {
	const themes = useMemo<Theme[]>(
		() => [
			{
				id: "democracy",
				label: "Ideas of Democracy",
				desc: "Foundations & values",
			},
			{ id: "institutions", label: "Architecture", desc: "How systems work" },
			{
				id: "power",
				label: "Power & Influence",
				desc: "Media, propaganda, resistance",
			},
			{
				id: "future",
				label: "Future Democracy",
				desc: "Tech, climate, algorithms",
			},
			{ id: "rights", label: "Rights", desc: "Standards, not rewards" },
			{ id: "minorities", label: "Minorities", desc: "Dissent & legitimacy" },
			{
				id: "constitution",
				label: "Constitutions",
				desc: "Compasses, not decoration",
			},
			{ id: "balance", label: "Checks & Balance", desc: "Preventing tyranny" },
			{
				id: "participation",
				label: "Participation",
				desc: "Grassroots vs representation",
			},
			{ id: "press", label: "Press", desc: "Info vs manipulation" },
			{
				id: "economy",
				label: "Economic Power",
				desc: "Money shaping politics",
			},
			{
				id: "nonviolence",
				label: "Civil Resistance",
				desc: "Nonviolent power",
			},
		],
		[],
	);

	const [active, setActive] = useState(themes[0].id);
	const activeTheme = themes.find((t) => t.id === active) ?? themes[0];

	return (
		<section
			id="themes"
			className="relative w-full py-16 scroll-mt-28 text-[#141414] overflow-hidden">
			{/* Punk paper background (matches landing palette) */}
			<div className="absolute inset-0 -z-10 pointer-events-none">
				<div className="absolute inset-0 bg-[#f5efe6]" />

				{/* energy blobs */}
				<div className="absolute -top-[28%] -left-[18%] w-[58%] h-[58%] bg-[#FF4E02]/22 blur-[150px] rounded-full" />
				<div className="absolute -bottom-[28%] -right-[16%] w-[62%] h-[62%] bg-fuchsia-500/14 blur-[170px] rounded-full" />
				<div className="absolute top-[16%] right-[10%] w-[40%] h-[40%] bg-indigo-500/12 blur-[165px] rounded-full" />

				{/* dot grid (same vibe as landing) */}
				<div
					className="absolute inset-0 opacity-[0.17]"
					style={{
						backgroundImage:
							"radial-gradient(rgba(20,20,20,0.75) 1px, transparent 1px)",
						backgroundSize: "42px 42px",
					}}
				/>

				{/* slight top wash */}
				<div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/5" />

				{/* grain */}
				<div className="absolute inset-0 opacity-[0.12] mix-blend-multiply bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
			</div>

			<div className="container mx-auto px-6 ">
				{/* Header */}
				<div className="flex items-end justify-between gap-6">
					<div>
						<div className="inline-flex items-center gap-2 border-2 border-black bg-white px-3 py-1">
							<span className="inline-block w-2 h-2 bg-[#FF4E02]" />
							<span className="text-[11px] font-black uppercase tracking-[0.28em]">
								Themes
							</span>
						</div>

						<h3 className="mt-4 text-3xl md:text-4xl font-black uppercase tracking-tight leading-[0.95]">
							Pick a theme.
						</h3>

						<p className="mt-3 max-w-[62ch] font-semibold text-black/75 leading-relaxed">
							Short episodes. Big ideas.{" "}
							<span className="underline decoration-2 underline-offset-4">
								Zero lectures
							</span>
							. Choose what you want to learn today.
						</p>
					</div>

					<div className="hidden md:flex items-center gap-2">
						<span className="border-2 border-black bg-[#FF4E02] px-3 py-1 text-xs font-black uppercase tracking-tight">
							12 starters
						</span>
						<span className="text-xs font-black uppercase tracking-tight text-black/60">
							more coming
						</span>
					</div>
				</div>

				{/* Chips: sticker tabs (hard shadow, ink border) */}
				<div
					className="
            mt-7 flex gap-2 overflow-x-auto no-scrollbar pb-2
            snap-x snap-mandatory
          ">
					{themes.map((t, idx) => {
						const isOn = t.id === active;

						// static zine “handmade” tilt (NO animation, just attitude)
						const tilt =
							idx % 4 === 0
								? "-rotate-[1deg]"
								: idx % 4 === 1
									? "rotate-[1deg]"
									: idx % 4 === 2
										? "-rotate-[0.5deg]"
										: "rotate-[0.5deg]";

						return (
							<button
								key={t.id}
								onClick={() => setActive(t.id)}
								className={`
                  snap-start shrink-0 ${tilt}
                  relative
                  px-4 py-2
                  border-2 border-black
                  text-xs sm:text-sm
                  font-black uppercase tracking-tight
                  shadow-[6px_6px_0_0_rgba(0,0,0,1)]
                  transition
                  hover:translate-x-[1px] hover:translate-y-[1px]
                  hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]
                  active:translate-x-[2px] active:translate-y-[2px]
                  active:shadow-[3px_3px_0_0_rgba(0,0,0,1)]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4E02]
                  motion-reduce:transition-none
                  ${isOn ? "bg-[#141414] text-white" : "bg-white text-[#141414]"}
                `}>
								{t.label}

								{/* orange “marker” underline for active */}
								{isOn && (
									<span className="absolute -bottom-[6px] left-3 right-3 h-[6px] bg-[#FF4E02]" />
								)}
							</button>
						);
					})}
				</div>

				{/* Active card: poster block (NO glass) */}
				<div className="relative mt-8">
					{/* tape */}
					<div className="pointer-events-none absolute -top-3 left-10 w-24 h-7 bg-black opacity-15 rotate-[-9deg]" />
					<div className="pointer-events-none absolute -top-4 right-14 w-20 h-7 bg-black opacity-15 rotate-[11deg]" />

					<div
						className="
              relative
              border-2 border-black
              bg-white
              shadow-[10px_10px_0_0_rgba(0,0,0,1)]
              p-6 md:p-8
              overflow-hidden
            ">
						{/* a tiny “print” texture overlay */}
						<div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

						<div className="relative flex flex-col md:flex-row md:items-start md:justify-between gap-6">
							<div className="min-w-0">
								<div className="inline-flex items-center gap-2 border-2 border-black bg-[#FF4E02] px-3 py-1">
									<span className="text-[11px] font-black uppercase tracking-[0.22em]">
										Selected theme
									</span>
								</div>

								<div className="mt-4 text-2xl md:text-3xl font-black uppercase leading-[0.95]">
									{activeTheme.label}
								</div>

								<p className="mt-3 font-semibold text-black/75 max-w-[70ch] leading-relaxed">
									{activeTheme.desc}
									<span className="ml-2 inline-block border-2 border-black px-2 py-0.5 text-[11px] font-black uppercase tracking-tight">
										no fluff
									</span>
								</p>

								{/* 3-step punchline (ties to landing) */}
								<div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
									<div className="border-2 border-black p-3">
										<div className="text-[11px] font-black uppercase tracking-[0.22em] text-black/60">
											01
										</div>
										<div className="mt-1 font-black uppercase">Learn</div>
										<div className="mt-1 text-sm font-semibold text-black/75">
											Fast, feed-native.
										</div>
									</div>

									<div className="border-2 border-black p-3">
										<div className="text-[11px] font-black uppercase tracking-[0.22em] text-black/60">
											02
										</div>
										<div className="mt-1 font-black uppercase">Vote</div>
										<div className="mt-1 text-sm font-semibold text-black/75">
											Helpful / confusing.
										</div>
									</div>

									<div className="border-2 border-black p-3">
										<div className="text-[11px] font-black uppercase tracking-[0.22em] text-black/60">
											03
										</div>
										<div className="mt-1 font-black uppercase">Act</div>
										<div className="mt-1 text-sm font-semibold text-black/75">
											Use your voice.
										</div>
									</div>
								</div>
							</div>

							{/* CTA: screen-print button */}
							<div className="flex md:flex-col gap-3 md:items-end">
								<Button
									asChild
									className="
                    rounded-none
                    border-2 border-black
                    bg-[#141414] text-white
                    font-black uppercase tracking-tight
                    px-6 py-6 h-auto
                    shadow-[6px_6px_0_0_rgba(0,0,0,1)]
                    hover:translate-x-[1px] hover:translate-y-[1px]
                    hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]
                    active:translate-x-[2px] active:translate-y-[2px]
                    active:shadow-[3px_3px_0_0_rgba(0,0,0,1)]
                    motion-reduce:transition-none
                  ">
									<a href="#lessons">Jump into lessons</a>
								</Button>

								<Button
									asChild
									className="
                    rounded-none
                    border-2 border-black
                    bg-[#FF4E02] text-[#141414]
                    font-black uppercase tracking-tight
                    px-6 py-6 h-auto
                    shadow-[6px_6px_0_0_rgba(0,0,0,1)]
                    hover:translate-x-[1px] hover:translate-y-[1px]
                    hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]
                    active:translate-x-[2px] active:translate-y-[2px]
                    active:shadow-[3px_3px_0_0_rgba(0,0,0,1)]
                    motion-reduce:transition-none
                  ">
									<a href="#contribute">Suggest a topic</a>
								</Button>
							</div>
						</div>

						{/* bottom stamp */}
						<div className="relative mt-7 flex flex-wrap items-center gap-2">
							<span className="text-[11px] font-black uppercase tracking-[0.22em] text-black/60">
								tags:
							</span>
							<span className="border-2 border-black bg-white px-2 py-1 text-[11px] font-black uppercase">
								youth-made
							</span>
							<span className="border-2 border-black bg-white px-2 py-1 text-[11px] font-black uppercase">
								feed-native
							</span>
							<span className="border-2 border-black bg-white px-2 py-1 text-[11px] font-black uppercase">
								no spin
							</span>
						</div>
					</div>
				</div>

				{/* Mobile footer hint */}
				<div className="mt-6 md:hidden text-[11px] font-black uppercase tracking-[0.22em] text-black/60">
					swipe themes → tap one → jump into lessons
				</div>
			</div>
		</section>
	);
}
