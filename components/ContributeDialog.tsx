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
}: {
	label: string;
	type: string;
}) {
	const [open, setOpen] = useState(false);
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<Button onClick={() => setOpen(true)} variant="outline">
				{label}
			</Button>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Contribute ({type})</DialogTitle>
				</DialogHeader>
				<form className="grid gap-3">
					<Input placeholder="Your name" />
					<Input placeholder="Email" type="email" />
					<Textarea
						placeholder="Describe your idea / link to assets"
						rows={5}
					/>
					<div className="text-right">
						<Button type="button" onClick={() => setOpen(false)}>
							Send
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
