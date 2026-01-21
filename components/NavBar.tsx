"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

function D101Logo({ className = "" }: { className?: string }) {
	return (
		<div className={`flex items-center gap-3 ${className}`}>
			<svg
				width="60"
				height="60"
				viewBox="0 0 48 48"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				className="shrink-0">
				<rect x="6" y="6" width="36" height="36" rx="10" fill="#141414" />
				<rect x="14" y="15" width="20" height="18" rx="4" fill="#F5EFE6" />
				<rect x="18" y="19" width="7" height="7" rx="2" fill="#FF4E02" />
				<path
					d="M19.7 22.3l1.6 1.6 3.2-3.4"
					stroke="#141414"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				<path
					d="M34 30c0 3-2.2 5-5.2 5H20"
					stroke="#FF4E02"
					strokeWidth="2"
					strokeLinecap="round"
				/>
			</svg>

			<div className="leading-tight">
				<div className="text-xl font-semibold tracking-tight text-[#141414]">
					Democracy-101
				</div>
				<div className="text-[11px] uppercase tracking-[0.22em] text-black/55">
					Learn • Vote • Act
				</div>
			</div>
		</div>
	);
}

const NAV = [
	{ label: "Lessons", href: "#lessons" },
	{ label: "Contribute", href: "#contribute" },
	{ label: "Who We Are", href: "#about" },
];

export default function Navbar() {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		gsap.fromTo(
			"[data-nav]",
			{ y: -16, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
		);
	}, []);

	return (
		<header
			data-nav
			className="
        sticky top-0 z-50
        border-b border-[#FF4E02]/15
        bg-orange-500/50 backdrop-blur-2xl
        supports-[backdrop-filter]:bg-white/35
      ">
			{/* ✅ orange glass energy layer (very subtle) */}
			<div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#FF4E02]/10 via-transparent to-[#FF4E02]/8" />
			<div className="absolute inset-0 -z-10 bg-white/20" />

			{/* ✅ taller navbar */}
			<div className="container mx-auto px-4 h-[84px] flex items-center justify-between">
				<Link href="/" className="flex items-center gap-2">
					<D101Logo />
				</Link>

				{/* Desktop nav */}
				<nav className="hidden md:flex items-center gap-2">
					{NAV.map((item) => (
						<a
							key={item.href}
							href={item.href}
							className="
                px-3 py-2 rounded-xl
                text-sm font-semibold text-[#141414]/75
                hover:text-[#141414]
                hover:bg-[#FF4E02]/10
                transition
              ">
							{item.label}
						</a>
					))}

					<Button
						asChild
						className="
              ml-2
              bg-[#141414] text-white font-bold
              hover:bg-[#FF4E02] hover:text-[#141414]
              transition
              rounded-xl
              shadow-sm
            ">
						<a href="#lessons">Start</a>
					</Button>
				</nav>

				{/* Mobile nav */}
				<div className="md:hidden flex items-center gap-2">
					<Button
						asChild
						variant="outline"
						className="
              border-black/10
              bg-white/35 backdrop-blur-xl
              hover:bg-[#FF4E02]/10
            ">
						<a href="#lessons">Start</a>
					</Button>

					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="hover:bg-[#FF4E02]/10 rounded-xl">
								<Menu className="w-5 h-5" />
							</Button>
						</SheetTrigger>

						<SheetContent side="right" className="w-[320px]">
							<SheetHeader>
								<SheetTitle className="flex items-center gap-2">
									<D101Logo />
								</SheetTitle>
							</SheetHeader>

							<div className="mt-6 flex flex-col gap-2">
								{NAV.map((item) => (
									<a
										key={item.href}
										href={item.href}
										onClick={() => setOpen(false)}
										className="
                      px-4 py-3 rounded-xl
                      font-semibold text-[#141414]/85
                      hover:bg-[#FF4E02]/10 hover:text-[#141414]
                      transition
                    ">
										{item.label}
									</a>
								))}
							</div>

							<div className="mt-6">
								<Button
									asChild
									className="
                    w-full
                    bg-[#141414] text-white font-bold
                    hover:bg-[#FF4E02] hover:text-[#141414]
                    transition
                    rounded-xl
                  ">
									<a href="#lessons" onClick={() => setOpen(false)}>
										Start learning
									</a>
								</Button>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	);
}
