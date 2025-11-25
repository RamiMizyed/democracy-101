"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BaseSlider, { type Slide } from "./BaseSlider";
import VoteBar from "../VoteBar";

const posters: Slide[] = [
	{ id: "p1", title: "Know Your Rights" },
	{ id: "p2", title: "How a Bill Becomes Law" },
	{ id: "p3", title: "Independent Media Matters" },
	{ id: "p4", title: "Local Elections 101" },
];

type VoteState = Record<
	string,
	{
		up: number;
		down: number;
	}
>;

export default function PosterSlider() {
	const [votes, setVotes] = useState<VoteState>(() => {
		const initial: VoteState = {};
		for (const p of posters) {
			initial[p.id] = { up: 0, down: 0 };
		}
		return initial;
	});

	const handleVote = (posterId: string, direction: "up" | "down") => {
		setVotes((prev) => {
			const current = prev[posterId] ?? { up: 0, down: 0 };
			return {
				...prev,
				[posterId]: {
					...current,
					[direction]: current[direction] + 1,
				},
			};
		});
	};

	return (
		<BaseSlider
			items={posters}
			label=""
			render={(p) => {
				const v = votes[p.id] ?? { up: 0, down: 0 };

				return (
					<Card className="bg-white/5 border-white/10">
						<CardContent>
							<div className="aspect-[3/4] w-full rounded-lg grid place-items-center shadow-lg overflow-hidden bg-black/60">
								<video
									src="/6279147-sd_540_960_30fps.mp4"
									className="h-full w-full object-cover"
									controls
								/>
							</div>

							<div className="mt-3 flex flex-col gap-2 w-full">
								<VoteBar
									id={`${p.id}-up`}
									label="This helps"
									direction="up"
									count={v.up}
									onVote={() => handleVote(p.id, "up")}
								/>
								<VoteBar
									id={`${p.id}-down`}
									label="Still confusing"
									direction="down"
									count={v.down}
									onVote={() => handleVote(p.id, "down")}
								/>
							</div>
						</CardContent>
					</Card>
				);
			}}
		/>
	);
}
