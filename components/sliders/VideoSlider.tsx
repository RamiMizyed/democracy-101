"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BaseSlider, { type Slide } from "./BaseSlider";
import VoteBar from "../VoteBar";

const videos: Slide[] = [
	{ id: "v1", title: "What is Democracy?" },
	{ id: "v2", title: "Separation of Powers" },
	{ id: "v3", title: "Free & Fair Elections" },
	{ id: "v4", title: "Media Literacy Basics" },
];

type VoteState = Record<
	string,
	{
		up: number;
		down: number;
	}
>;

export default function VideoSlider() {
	const [votes, setVotes] = useState<VoteState>(() => {
		const initial: VoteState = {};
		for (const v of videos) {
			initial[v.id] = { up: 0, down: 0 };
		}
		return initial;
	});

	const handleVote = (videoId: string, direction: "up" | "down") => {
		setVotes((prev) => {
			const current = prev[videoId] ?? { up: 0, down: 0 };
			return {
				...prev,
				[videoId]: {
					...current,
					[direction]: current[direction] + 1,
				},
			};
		});
	};

	return (
		<BaseSlider
			items={videos}
			label="Video Slider"
			render={(v) => {
				const counts = votes[v.id] ?? { up: 0, down: 0 };

				return (
					<Card className="bg-white/5 border-white/10">
						<CardHeader>
							<CardTitle className="text-base text-zinc-100">
								{v.title}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="aspect-video w-full rounded-lg bg-gradient-to-br from-indigo-500/30 to-teal-400/30 grid place-items-center overflow-hidden">
								{/* Replace this with real <video> / YouTube embed */}
								<span className="text-sm text-zinc-200">Video placeholder</span>
							</div>

							<div className="mt-3 flex flex-col gap-2">
								<VoteBar
									id={`${v.id}-up`}
									label="This helped"
									direction="up"
									count={counts.up}
									onVote={() => handleVote(v.id, "up")}
								/>
								<VoteBar
									id={`${v.id}-down`}
									label="Still unclear"
									direction="down"
									count={counts.down}
									onVote={() => handleVote(v.id, "down")}
								/>
							</div>
						</CardContent>
					</Card>
				);
			}}
		/>
	);
}
