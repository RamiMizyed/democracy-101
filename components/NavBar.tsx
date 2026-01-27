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
			<div className="relative">
				<svg
					width="46"
					height="46"
					viewBox="0 0 48 48"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="shrink-0">
					<rect x="6" y="6" width="36" height="36" rx="12" fill="#141414" />
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

				{/* tiny energy dot */}
				<span className="absolute -right-0.5 -top-0.5 w-3 h-3 rounded-full bg-[#FF4E02] shadow-[0_0_0_3px_rgba(255,78,2,0.18)]" />
			</div>

			<div className="leading-tight">
				<div className="text-base md:text-lg font-extrabold tracking-tight text-[#141414]">
					Democracy 101
				</div>
				<div className="text-[10px] uppercase tracking-[0.24em] text-black/55">
					Learn • Vote • Act
				</div>
			</div>
		</div>
	);
}

const NAV = [
	{ label: "Lessons", href: "#lessons" },
	{ label: "Themes", href: "#themes" },
	{ label: "Contribute", href: "#contribute" },
];

export default function Navbar() {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		gsap.fromTo(
			"[data-nav]",
			{ y: -14, opacity: 0 },
			{ y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
		);
	}, []);

	return (
		<header
			data-nav
			className="
        sticky top-0 z-50
        border-b border-black/10
        bg-white/50 backdrop-blur-xl
        supports-[backdrop-filter]:bg-white/35
      ">
			{/* energy layer */}
			<div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#FF4E02]/10 via-transparent to-[#FF4E02]/8" />

			<div className="container mx-auto px-4 h-[78px] flex items-center justify-between">
				<Link href="/" className="flex items-center gap-2">
					<D101Logo />
				</Link>

				{/* Desktop */}
				<nav className="hidden md:flex items-center gap-2">
					{NAV.map((item) => (
						<a
							key={item.href}
							href={item.href}
							className="
                px-3 py-2 rounded-xl
                text-sm font-semibold text-[#141414]/70
                hover:text-[#141414]
                hover:bg-black/5
                transition
              ">
							{item.label}
						</a>
					))}

					<Button
						asChild
						className="
              ml-2 rounded-xl
              bg-[#141414] text-white font-extrabold
              hover:bg-[#FF4E02] hover:text-[#141414]
              transition
              shadow-sm
            ">
						<a href="#lessons">Start</a>
					</Button>
				</nav>

				{/* Mobile */}
				<div className="md:hidden flex items-center gap-2">
					<Button
						asChild
						variant="outline"
						className="
              rounded-sm
              border-black/10
              bg-white/50 backdrop-blur-xl
              hover:bg-black/5
            ">
						<a href="#lessons">Start</a>
					</Button>

					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="rounded-xl hover:bg-black/5">
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
                      hover:bg-black/5
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
                    w-full rounded-xl
                    bg-[#141414] text-white font-extrabold
                    hover:bg-[#FF4E02] hover:text-[#141414]
                    transition
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
