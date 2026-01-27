"use client";

import ContributeDialog from "@/components/ContributeDialog";

export default function ContributeSection() {
	const punkBtn =
		"rounded-none border-2 border-black bg-white text-[#141414] font-black uppercase " +
		"shadow-[6px_6px_0_0_rgba(0,0,0,1)] " +
		"hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] " +
		"active:translate-x-[2px] active:translate-y-[2px]";

	return (
		<section
			id="contribute"
			className="relative w-full py-16 overflow-hidden text-[#141414] scroll-mt-28">
			{/* Paper + energy background */}
			<div className="absolute inset-0 -z-10 pointer-events-none">
				<div className="absolute inset-0 bg-[#f5efe6]" />

				<div className="absolute -top-[26%] -left-[18%] w-[58%] h-[58%] bg-[#FF4E02]/18 blur-[150px] rounded-full" />
				<div className="absolute -bottom-[26%] -right-[16%] w-[62%] h-[62%] bg-fuchsia-500/12 blur-[170px] rounded-full" />
				<div className="absolute top-[14%] right-[10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[165px] rounded-full" />

				<div
					className="absolute inset-0 opacity-[0.14]"
					style={{
						backgroundImage:
							"radial-gradient(rgba(20,20,20,0.75) 1px, transparent 1px)",
						backgroundSize: "42px 42px",
					}}
				/>

				<div
					className="absolute inset-0 opacity-[0.10] mix-blend-multiply"
					style={{
						backgroundImage:
							"url(https://grainy-gradients.vercel.app/noise.svg)",
					}}
				/>
			</div>

			<div className="container mx-auto px-6">
				{/* Poster */}
				<div className="relative">
					{/* tape */}
					<div className="pointer-events-none absolute -top-3 left-10 w-24 h-7 bg-black/20 rotate-[-8deg]" />
					<div className="pointer-events-none absolute -top-4 right-14 w-20 h-7 bg-black/20 rotate-[10deg]" />

					<div className="border-2 border-black bg-white shadow-[10px_10px_0_0_rgba(0,0,0,1)] p-7 md:p-10">
						{/* stamp */}
						<div className="inline-flex items-center gap-2 border-2 border-black bg-[#FF4E02] px-3 py-1">
							<span className="inline-block w-2 h-2 bg-black" />
							<span className="text-[11px] font-black uppercase tracking-[0.28em]">
								Contribute
							</span>
						</div>

						<div className="mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
							<div className="max-w-[72ch]">
								<h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-[0.95]">
									Help build Democracy 101.
								</h3>

								<p className="mt-3 font-semibold text-black/75 leading-relaxed">
									Bring your skills. Bring your chaos (the good kind). We’re
									making civic education that survives the feed.
									<span className="ml-2 inline-block border-2 border-black px-2 py-0.5 text-[11px] font-black uppercase">
										learn → vote → act
									</span>
								</p>

								<div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
									{[
										{
											n: "01",
											t: "Submit an idea",
											d: "Hook + outline + why it matters.",
										},
										{
											n: "02",
											t: "Send visuals",
											d: "Stickers, frames, style tests.",
										},
										{
											n: "03",
											t: "Help research",
											d: "Sources + examples that hit.",
										},
									].map((c) => (
										<div
											key={c.n}
											className="border-2 border-black p-4 bg-[#f5efe6]">
											<div className="text-[11px] font-black uppercase tracking-[0.22em] text-black/60">
												{c.n}
											</div>
											<div className="mt-1 font-black uppercase">{c.t}</div>
											<div className="mt-1 text-sm font-semibold text-black/75">
												{c.d}
											</div>
										</div>
									))}
								</div>
							</div>

							<div className="flex flex-wrap gap-3">
								<ContributeDialog
									label="🎬 Creator"
									type="creator"
									buttonClassName={punkBtn}
								/>
								<ContributeDialog
									label="🧠 Educator"
									type="educator"
									buttonClassName={punkBtn}
								/>
								<ContributeDialog
									label="🎨 Designer"
									type="designer"
									buttonClassName={punkBtn}
								/>
							</div>
						</div>

						{/* footer stamps */}
						<div className="mt-8 flex flex-wrap items-center gap-2">
							<span className="text-[11px] font-black uppercase tracking-[0.22em] text-black/60">
								wanted:
							</span>
							{[
								"youth creators",
								"design punks",
								"research nerds",
								"editors",
							].map((x) => (
								<span
									key={x}
									className="border-2 border-black bg-white px-2 py-1 text-[11px] font-black uppercase">
									{x}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
