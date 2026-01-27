"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContributeDialog({
	label,
	type,
	buttonClassName,
	contentClassName,
}: {
	label: string;
	type: string;
	buttonClassName?: string;
	contentClassName?: string;
}) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Button
				onClick={() => setOpen(true)}
				variant="outline"
				className={buttonClassName}>
				{label}
			</Button>

			<DialogContent
				className={[
					"sm:max-w-lg border-2 border-black rounded-none",
					"bg-[#f5efe6] shadow-[10px_10px_0_0_rgba(0,0,0,1)]",
					contentClassName ?? "",
				].join(" ")}>
				<DialogHeader>
					<DialogTitle className="font-black uppercase tracking-tight">
						Contribute — {type}
					</DialogTitle>
				</DialogHeader>

				<form className="grid gap-3">
					<Input
						placeholder="Your name"
						className="rounded-none border-2 border-black bg-white font-semibold"
					/>
					<Input
						placeholder="Email"
						type="email"
						className="rounded-none border-2 border-black bg-white font-semibold"
					/>
					<Textarea
						placeholder="Describe your idea / link to assets"
						rows={5}
						className="rounded-none border-2 border-black bg-white font-semibold"
					/>

					<div className="flex items-center justify-between gap-3 pt-2">
						<p className="text-xs font-black uppercase tracking-[0.18em] text-black/60">
							no spam • real humans
						</p>

						<Button
							type="button"
							onClick={() => setOpen(false)}
							className="
                rounded-none border-2 border-black
                bg-[#FF4E02] text-[#141414] font-black uppercase
                shadow-[6px_6px_0_0_rgba(0,0,0,1)]
                hover:translate-x-[1px] hover:translate-y-[1px]
                hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]
                active:translate-x-[2px] active:translate-y-[2px]
              ">
							Send
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
