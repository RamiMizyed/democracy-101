// app/page.tsx
import Navbar from "@/components/NavBar";
import ThemeChips from "@/components/ThemeChips";
import VideoSlider from "@/components/sliders/VideoSlider";
import PosterSlider from "@/components/sliders/PosterSlider";
import VoteBar from "@/components/VoteBar";
import ContributeDialog from "@/components/ContributeDialog";

export default function Page() {
	return (
		<main className="min-h-screen">
			<Navbar />

			{/* Hero */}
			<section className="container mx-auto px-4 pt-20 pb-8">
				<h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
					<span className="block gradient-text">Democracy 101</span>
					<span className="block text-zinc-300 mt-1">
						Civic Education for All
					</span>
				</h1>
				<p className="max-w-2xl mt-4 text-zinc-400">
					Explore short, community‑made explainers and posters. Vote on what’s
					most useful and contribute your own ideas, scripts, or designs.
				</p>
			</section>

			{/* Themes */}
			<section className="container mx-auto px-4">
				<ThemeChips />
			</section>

			{/* Video slider + actions */}
			<section className="container mx-auto px-4 mt-8 space-y-4">
				<VideoSlider />
				<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
					<ContributeDialog label="Contribute: Video Production" type="video" />
					<VoteBar
						id="video-votes"
						label="Vote: Unimportant"
						direction="down"
					/>
					<VoteBar id="video-votes-up" label="Vote: Important" direction="up" />
					<ContributeDialog
						label="Contribute: Video Script/Text"
						type="script"
					/>
				</div>
			</section>

			{/* Poster slider + actions */}
			<section className="container mx-auto px-4 mt-14 space-y-4 pb-24">
				<PosterSlider />
				<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
					<ContributeDialog label="I want to design a poster" type="poster" />
					<VoteBar
						id="poster-votes-down"
						label="Unimportant"
						direction="down"
					/>
					<VoteBar id="poster-votes-up" label="Important" direction="up" />
					<ContributeDialog label="I have something to share" type="idea" />
				</div>
			</section>
		</main>
	);
}
