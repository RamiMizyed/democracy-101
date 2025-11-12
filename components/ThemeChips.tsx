"use client";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const THEMES = [
	"Elections",
	"Rights",
	"Rule of Law",
	"Checks & Balances",
	"Media Literacy",
];

export default function ThemeChips() {
	const [active, setActive] = useState<string[]>([]);
	const toggle = (t: string) =>
		setActive((prev) =>
			prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
		);

	return (
		<div className="flex flex-wrap gap-2">
			{THEMES.map((t) => (
				<button
					key={t}
					onClick={() => toggle(t)}
					aria-pressed={active.includes(t)}>
					<Badge
						variant={active.includes(t) ? "default" : "secondary"}
						className="cursor-pointer select-none">
						{t}
					</Badge>
				</button>
			))}
		</div>
	);
}
