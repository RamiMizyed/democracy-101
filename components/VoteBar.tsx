"use client";
import { Button } from "@/components/ui/button";

export default function VoteBar({
	id,
	label,
	direction,
	count,
	onVote,
}: {
	id: string;
	label: string;
	direction: "up" | "down";
	count: number;
	onVote: () => void;
}) {
	const arrow = direction === "up" ? "↑" : "↓";

	return (
		<Button
			id={id}
			onClick={onVote}
			variant={direction === "up" ? "default" : "secondary"}
			className="justify-between w-full text-xs sm:text-sm">
			<span>{label}</span>
			<span className="ml-2 tabular-nums">
				{arrow} {count}
			</span>
		</Button>
	);
}
