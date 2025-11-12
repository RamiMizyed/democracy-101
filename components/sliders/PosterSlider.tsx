"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BaseSlider, { type Slide } from "./BaseSlider";

const posters: Slide[] = [
	{ id: "p1", title: "Know Your Rights" },
	{ id: "p2", title: "How a Bill Becomes Law" },
	{ id: "p3", title: "Independent Media Matters" },
	{ id: "p4", title: "Local Elections 101" },
];

export default function PosterSlider() {
	return (
		<BaseSlider
			items={posters}
			label="Poster Slider"
			render={(p) => (
				<Card className="bg-white/5 border-white/10">
					<CardHeader>
						<CardTitle className="text-base">{p.title}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="aspect-[3/4] w-full rounded-lg bg-gradient-to-br from-fuchsia-500/30 to-sky-400/30 grid place-items-center shadow-lg">
							{/* Replace with <Image src="/your-poster.png" .../> */}
							<span className="text-sm text-zinc-200">Poster placeholder</span>
						</div>
					</CardContent>
				</Card>
			)}
		/>
	);
}
