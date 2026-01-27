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
		<div className="flex flex-wrap gap-2 justify-center py-4 sticky top-[70px] z-30 bg-white/80 backdrop-blur-md border-b">
			<span className="text-sm font-semibold text-zinc-500 mr-2 self-center">
				Filter by:
			</span>
			{THEMES.map((t) => (
				<button key={t} onClick={() => onToggle(t)}>
					<Badge
						variant={selected.includes(t) ? "default" : "outline"}
						className={`cursor-pointer select-none transition-all ${
							selected.includes(t)
								? "bg-indigo-600 hover:bg-indigo-700"
								: "hover:bg-zinc-100"
						}`}>
						{t}
					</Badge>
				</button>
			))}
		</div>
	);
}
