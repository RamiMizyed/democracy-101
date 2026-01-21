"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Play } from "lucide-react"; // Ensure lucide-react is installed
import { ContentItem } from "@/lib/data"; // Import from step 1
import { Badge } from "@/components/ui/badge";

interface ContentFeedProps {
	title: string;
	items: ContentItem[];
}

export default function ContentFeed({ title, items }: ContentFeedProps) {
	// Local voting state for this feed
	const [votes, setVotes] = useState<
		Record<string, { up: number; down: number }>
	>({});

	const handleVote = (id: string, type: "up" | "down") => {
		setVotes((prev) => ({
			...prev,
			[id]: {
				...prev[id],
				[type]: (prev[id]?.[type] || 0) + 1,
			},
		}));
	};

	if (items.length === 0) return null;

	return (
		<div className="w-full py-6">
			<h2 className="text-2xl font-bold mb-4 text-zinc-800 px-4 md:px-0">
				{title}
			</h2>

			{/* MAGIC LAYOUT:
        Mobile: flex-col, h-[70vh], snap-y (Vertical TikTok Scroll)
        Desktop: flex-row, h-auto, snap-x (Horizontal Netflix Scroll)
      */}
			<div
				className="flex flex-col h-[75vh] w-full overflow-y-auto snap-y snap-mandatory gap-6 
                      md:flex-row md:h-auto md:overflow-x-auto md:snap-x md:pb-8 md:gap-4 no-scrollbar">
				{items.map((item) => {
					const itemVotes = votes[item.id] || { up: 0, down: 0 };

					return (
						<Card
							key={item.id}
							className="shrink-0 w-full h-full md:w-[350px] md:h-auto bg-black border-zinc-800 relative overflow-hidden snap-center group rounded-xl">
							{/* Media Container */}
							<div className="relative w-full h-full md:aspect-[9/16] bg-zinc-900 flex items-center justify-center">
								{item.type === "video" ? (
									<>
										{/* Placeholder for Video */}
										<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
										<video
											src={item.src}
											className="w-full h-full object-cover opacity-80"
											muted
											loop
											playsInline
										/>
										<Play className="absolute text-white/50 w-16 h-16 z-0" />
									</>
								) : (
									<>
										<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10" />
										{/* Use Next/Image in production */}
										<img
											src={item.src}
											alt={item.title}
											className="w-full h-full object-cover"
										/>
									</>
								)}

								{/* Overlay Info */}
								<div className="absolute bottom-0 left-0 right-0 z-20 p-6 flex flex-col gap-3">
									<Badge
										variant="secondary"
										className="w-fit bg-blue-600 text-white hover:bg-blue-700 border-none">
										{item.category}
									</Badge>
									<h3 className="text-2xl font-bold text-white leading-tight">
										{item.title}
									</h3>

									{/* Vote Bar */}
									<div className="flex gap-2 w-full mt-2">
										<Button
											variant="outline"
											className="flex-1 bg-white/10 border-white/20 text-white hover:bg-green-500/20 hover:text-green-400 hover:border-green-500"
											onClick={() => handleVote(item.id, "up")}>
											<ThumbsUp className="w-4 h-4 mr-2" />
											Helpful ({itemVotes.up})
										</Button>
										<Button
											variant="outline"
											className="flex-1 bg-white/10 border-white/20 text-white hover:bg-red-500/20 hover:text-red-400 hover:border-red-500"
											onClick={() => handleVote(item.id, "down")}>
											<ThumbsDown className="w-4 h-4 mr-2" />
											Confusing ({itemVotes.down})
										</Button>
									</div>
								</div>
							</div>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
