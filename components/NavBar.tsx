"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

export default function Navbar() {
	useEffect(() => {
		gsap.fromTo(
			"[data-nav]",
			{ y: -24, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
		);
	}, []);

	return (
		<header
			data-nav
			className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
			<div className="container mx-auto px-4 h-14 flex items-center justify-between">
				<div className="font-semibold tracking-tight">Democracy‑101</div>
				<nav className="flex items-center gap-2">
					<Button variant="ghost" className="text-zinc-200 hover:text-white">
						Contribute
					</Button>
					<Button variant="ghost" className="text-zinc-200 hover:text-white">
						Who We Are
					</Button>
				</nav>
			</div>
		</header>
	);
}
