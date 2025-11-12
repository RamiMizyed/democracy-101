"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function VoteBar({
	id,
	label,
	direction,
}: {
	id: string;
	label: string;
	direction: "up" | "down";
}) {
	const [count, setCount] = useState(0);
	const arrow = direction === "up" ? "↑" : "↓";
	return (
		<Button
			id={id}
			onClick={() => setCount((c) => c + 1)}
			variant={direction === "up" ? "default" : "secondary"}
			className="justify-between">
			<span>{label}</span>
			<span className="ml-2 tabular-nums">
				{arrow} {count}
			</span>
		</Button>
	);
}
