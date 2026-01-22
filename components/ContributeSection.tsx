"use client";

import ContributeDialog from "@/components/ContributeDialog";

export default function ContributeSection() {
	return (
		<section id="contribute" className="w-full py-16">
			<div className="container mx-auto px-6 sm:px-10 md:px-24">
				<div className="rounded-[2rem] border border-black/10 bg-white/60 backdrop-blur-xl p-8 shadow-sm">
					<div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
						<div>
							<div className="text-xs font-black tracking-[0.25em] uppercase text-[#FF4E02]">
								Contribute
							</div>
							<h3 className="mt-2 text-3xl font-extrabold text-zinc-900 tracking-tight">
								Help us build Democracy 101.
							</h3>
							<p className="mt-3 text-zinc-600 max-w-[62ch] leading-relaxed">
								If you’re a creator, educator, designer, researcher, or just
								someone who cares — join the mission. This platform grows
								through participation.
							</p>
						</div>

						<div className="flex flex-wrap gap-3">
							<ContributeDialog label="🎬 Creator" type="creator" />
							<ContributeDialog label="🧠 Educator" type="educator" />
							<ContributeDialog label="🎨 Designer" type="designer" />
						</div>
					</div>

					<div className="mt-8 grid md:grid-cols-3 gap-4">
						{[
							{
								title: "Submit an episode idea",
								text: "A theme, a hook, and a short outline.",
							},
							{
								title: "Send visuals / templates",
								text: "Sticker packs, style frames, UI ideas.",
							},
							{
								title: "Help research topics",
								text: "Sources + examples that make it real.",
							},
						].map((c) => (
							<div
								key={c.title}
								className="rounded-3xl border border-black/10 bg-white/70 p-5">
								<div className="font-extrabold text-zinc-900">{c.title}</div>
								<div className="mt-1 text-sm text-zinc-600">{c.text}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
