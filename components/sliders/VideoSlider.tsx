"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BaseSlider, { type Slide } from "./BaseSlider";

const videos: Slide[] = [
	{ id: "v1", title: "What is Democracy?" },
	{ id: "v2", title: "Separation of Powers" },
	{ id: "v3", title: "Free & Fair Elections" },
	{ id: "v4", title: "Media Literacy Basics" },
];

export default function VideoSlider() {
	return (
		<BaseSlider
			items={videos}
			label="Video Slider"
			render={(v) => (
				<Card className="bg-white/5 border-white/10">
					<CardHeader>
						<CardTitle className="text-base">{v.title}</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="aspect-video w-full rounded-lg bg-gradient-to-br from-indigo-500/30 to-teal-400/30 grid place-items-center">
							{/* Replace this block with an actual <video> or YouTube embed */}
							<span className="text-sm text-zinc-200">Video placeholder</span>
						</div>
					</CardContent>
				</Card>
			)}
		/>
	);
}
