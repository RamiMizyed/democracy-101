// app/page.tsx
import Navbar from "@/components/NavBar";
import ThemeChips from "@/components/ThemeChips";
import VideoSlider from "@/components/sliders/VideoSlider";
import PosterSlider from "@/components/sliders/PosterSlider";
import VoteBar from "@/components/VoteBar";
import ContributeDialog from "@/components/ContributeDialog";
import { ChevronRightIcon, StarIcon, UsersIcon } from "lucide-react";

export default function Page() {
	return (
		<main className="min-h-screen">
			<Navbar />

			{/* Hero */}
			<section className="relative min-h-[80vh] overflow-hidden">
				{/* Image background instead of video */}
				<img
					className="absolute inset-0 w-full h-full object-cover"
					src="/pexels-life-matters-3043471-4614165.jpg" // TODO: replace with your actual image path
					alt="Diverse group of young activists protesting for justice and equality"
				/>
				{/* Adjusted overlay with vibrant gradient to enhance the image's energy */}
				<div className="absolute inset-0 backdrop-blur-[4px] bg-gradient-to-br from-cyan-900/50 via-lime-900/30 to-amber-900/40" />

				{/* Thematic decorative elements (speech bubbles, lines) */}
				<div className="pointer-events-none absolute inset-0">
					<div className="absolute left-8 top-24 w-3 h-3 rounded-full bg-cyan-300 animate-pulse" />
					<div className="absolute right-16 top-40 w-48 h-px bg-white/30 rotate-12" />
					<div className="absolute bottom-20 left-1/4 w-3 h-3 rounded-full bg-lime-300 animate-bounce" />
					<div className="absolute bottom-28 right-12 w-3 h-3 rounded-full bg-amber-300 animate-pulse" />
				</div>

				{/* Content */}
				<div className="relative z-10 container mx-auto px-4 pt-24 pb-16 flex flex-col items-center text-center text-white">
					{/* Hero text - more youthful tagline */}
					<div className="max-w-3xl animate-fade-in">
						<h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight drop-shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
							<span className="block bg-gradient-to-r from-cyan-300 to-lime-300 text-transparent bg-clip-text">
								Democracy 101
							</span>
							<span className="block mt-2 text-zinc-100">
								Level Up Your Civic Game – For All
							</span>
						</h1>
						<p className="max-w-2xl mx-auto mt-4 text-zinc-100 text-base md:text-lg">
							Dive into bite-sized, community-created explainers, posters, and
							more. Vote on the best stuff, drop your ideas, and spark real
							change with fellow young trailblazers.
						</p>
					</div>

					{/* Action cards - brighter borders, icons, enhanced hover */}
					<div className="mt-10 grid gap-6 md:grid-cols-3 w-full max-w-5xl">
						<div className="bg-gradient-to-br from-cyan-900/70 to-cyan-700/50 border border-cyan-400 rounded-2xl px-6 py-5 text-left backdrop-blur-md shadow-[0_20px_45px_rgba(0,0,0,0.6)] hover:scale-105 hover:bg-cyan-900/80 transition-transform duration-300">
							<div className="flex items-center text-xs uppercase tracking-[0.16em] text-cyan-300 mb-2">
								<UsersIcon className="w-4 h-4 mr-2" /> Explore
							</div>
							<p className="text-sm md:text-base text-zinc-100">
								Short, community-made explainers and posters that break big
								ideas into clear, shareable bits.
							</p>
						</div>

						<div className="bg-gradient-to-br from-amber-900/70 to-amber-700/50 border border-amber-400 rounded-2xl px-6 py-5 text-left backdrop-blur-md shadow-[0_20px_45px_rgba(0,0,0,0.6)] hover:scale-105 hover:bg-amber-900/80 transition-transform duration-300">
							<div className="flex items-center text-xs uppercase tracking-[0.16em] text-amber-300 mb-2">
								<StarIcon className="w-4 h-4 mr-2" /> Vote
							</div>
							<p className="text-sm md:text-base text-zinc-100">
								Upvote what actually helps you understand. The best content
								rises to the top for everyone.
							</p>
						</div>

						<div className="bg-gradient-to-br from-lime-900/70 to-lime-700/50 border border-lime-400 rounded-2xl px-6 py-5 text-left backdrop-blur-md shadow-[0_20px_45px_rgba(0,0,0,0.6)] hover:scale-105 hover:bg-lime-900/80 transition-transform duration-300">
							<div className="flex items-center text-xs uppercase tracking-[0.16em] text-lime-300 mb-2">
								<ChevronRightIcon className="w-4 h-4 mr-2" /> Contribute
							</div>
							<p className="text-sm md:text-base text-zinc-100">
								Drop your own ideas, scripts, carousels, or poster designs and
								help shape how others learn.
							</p>
						</div>
					</div>

					{/* New: Social proof section for trust and community feel */}
					<div className="mt-12 w-full max-w-4xl animate-fade-in-up">
						<h2 className="text-2xl font-semibold text-zinc-100 mb-6">
							Why Young People Love It
						</h2>

						<p className="mt-4 text-zinc-200 text-center">
							Join 10K+ young changemakers shaping democracy today!
						</p>
					</div>

					{/* CTA strip - more prominent, with arrow icon */}
					<div className="mt-10 w-full max-w-xl">
						<div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-linear-to-r from-cyan-500 to-lime-500 rounded-full px-6 py-3 shadow-[0_18px_40px_rgba(0,0,0,0.6)] hover:scale-105 transition-transform">
							<div className="flex-1 text-sm md:text-base font-bold tracking-wide uppercase text-black">
								Join the Movement!
							</div>
							<button className="flex items-center px-5 py-2 rounded-full bg-black text-sm font-medium tracking-wide text-white hover:bg-gray-800 transition">
								Connect Now <ChevronRightIcon className="w-4 h-4 ml-2" />
							</button>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
