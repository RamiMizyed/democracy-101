"use client";

import { Badge } from "@/components/ui/badge";

const THEMES = [
	"Elections",
	"Rights",
	"Rule of Law",
	"Checks & Balances",
	"Media Literacy",
];

interface ThemeChipsProps {
	selected: string[];
	onToggle: (theme: string) => void;
}

export default function ThemeChips({ selected, onToggle }: ThemeChipsProps) {
	return (
		<div
			className="
        sticky top-[84px] z-40
        border-b border-black/10
        bg-[#f5efe6]/85 backdrop-blur-xl
      ">
			<div className="container mx-auto px-4 sm:px-6 md:px-24 py-3">
				<div className="flex flex-wrap items-center gap-2 justify-center">
					{/* label */}
					<span className="mr-2 inline-flex items-center gap-2 text-[11px] font-black tracking-[0.22em] uppercase text-black/60">
						<span className="inline-block h-2 w-2 rounded-full bg-[#FF4E02]" />
						Filter
					</span>

					{THEMES.map((t) => {
						const isOn = selected.includes(t);

						return (
							<button
								key={t}
								type="button"
								onClick={() => onToggle(t)}
								className="
                  group
                  rounded-none
                  focus:outline-none
                  focus-visible:ring-2 focus-visible:ring-[#FF4E02]/60
                  focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5efe6]
                ">
								<Badge
									variant={isOn ? "default" : "outline"}
									className={[
										// base: punk-ish “label” chip
										"cursor-pointer select-none rounded-none",
										"px-3 py-1.5 text-xs font-black tracking-wide",
										"border-2 transition-all",
										"shadow-[4px_4px_0_0_rgba(0,0,0,0.85)]",
										"group-active:translate-x-[1px] group-active:translate-y-[1px]",
										"group-active:shadow-[3px_3px_0_0_rgba(0,0,0,0.85)]",
										isOn
											? // active: orange stamp
												"bg-[#FF4E02] text-[#141414] border-[#141414]"
											: // idle: paper label
												"bg-white/70 text-[#141414] border-[#141414]/70 hover:bg-white",
									].join(" ")}>
									{t}
								</Badge>
							</button>
						);
					})}
				</div>

				{/* tiny helper line (optional, subtle) */}
				<div className="mt-2 flex justify-center">
					<span className="text-[11px] font-semibold text-black/50">
						Tap chips to remix the feed.
					</span>
				</div>
			</div>
		</div>
	);
}
