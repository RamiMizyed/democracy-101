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

	return (
		<section id="themes" className="w-full py-14">
			<div className="container mx-auto px-6 sm:px-10 md:px-24">
				<div className="flex items-end justify-between gap-6">
					<div>
						<h3 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
							Pick a theme.
						</h3>
						<p className="mt-2 text-zinc-600 max-w-[62ch]">
							Short episodes. Big ideas. Zero lectures. Choose what you want to
							learn today.
						</p>
					</div>

					<span className="hidden md:inline-flex text-xs font-semibold text-zinc-500">
						12 starter episodes • more coming
					</span>
				</div>

				{/* chips */}
				<div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar pb-2">
					{themes.map((t) => {
						const isOn = t.id === active;
						return (
							<button
								key={t.id}
								onClick={() => setActive(t.id)}
								className={`
                  shrink-0 rounded-full px-4 py-2 text-sm font-bold
                  border transition
                  ${
										isOn
											? "bg-[#141414] text-white border-black"
											: "bg-white/70 text-zinc-800 border-black/10 hover:bg-black/5"
									}
                `}>
								{t.label}
							</button>
						);
					})}
				</div>

				{/* active card */}
				<div className="mt-6 rounded-3xl border border-black/10 bg-white/55 backdrop-blur-xl p-6 shadow-sm">
					<div className="flex items-start justify-between gap-6">
						<div>
							<div className="text-xs font-black tracking-[0.25em] uppercase text-[#FF4E02]">
								Selected theme
							</div>
							<div className="mt-2 text-2xl font-extrabold text-zinc-900">
								{themes.find((t) => t.id === active)?.label}
							</div>
							<p className="mt-2 text-zinc-600 max-w-[60ch]">
								{themes.find((t) => t.id === active)?.desc}
							</p>
						</div>

						<Button
							asChild
							className="
                rounded-2xl
                bg-[#FF4E02] text-[#141414] font-extrabold
                hover:bg-[#FF4E02]/90
              ">
							<a href="#lessons">Jump into lessons</a>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
