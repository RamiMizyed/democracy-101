export default function WhySection() {
	return (
		<section className="w-full py-14">
			<div className="container mx-auto px-6 sm:px-10 md:px-24">
				<div className="grid md:grid-cols-2 gap-8 items-start">
					<div>
						<h3 className="text-3xl font-extrabold tracking-tight text-zinc-900">
							Civic education is losing the algorithm.
						</h3>
						<p className="mt-3 text-zinc-600 leading-relaxed max-w-[60ch]">
							Marketing and political messaging dominate the spaces young people
							live in: TikTok, Instagram, YouTube.
							<span className="font-semibold text-zinc-900">
								{" "}
								Democracy 101
							</span>{" "}
							brings human rights and civic clarity into those same spaces — in
							formats people actually watch.
						</p>
					</div>

					<div className="rounded-3xl border border-black/10 bg-white/60 backdrop-blur-xl p-6 shadow-sm">
						<div className="text-xs font-black tracking-[0.25em] uppercase text-[#FF4E02]">
							Our promise
						</div>

						<ul className="mt-4 space-y-3 text-zinc-800 font-semibold">
							<li>⚡ Short episodes, no lectures</li>
							<li>🎯 Built for attention spans (real ones)</li>
							<li>🧠 Clear explanations, real examples</li>
							<li>🗳️ Participation-first: learn → vote → act</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
