export type ContentItem = {
	id: string;
	title: string;
	type: "video" | "image";
	src: string;
	category: string;
	description?: string;
};

// ✅ Uses ONLY the media you already referenced:
// videos: /19072439..., /6279147...
// images: Images/img.jpg
export const MOCK_CONTENT: ContentItem[] = [
	// =========================
	// RULE OF LAW
	// =========================
	{
		id: "rol-v1",
		title: "The Constitution: A Living Document",
		type: "video",
		category: "Rule of Law",
		src: "/19072439-sd_540_960_30fps.mp4",
		description:
			"Not a relic — a fight over limits, rights, and power. Who bends it, and how?",
	},
	{
		id: "rol-v2",
		title: "Due Process: Your Shield",
		type: "video",
		category: "Rule of Law",
		src: "/19072439-sd_540_960_30fps.mp4",
		description:
			"No shortcuts. The rules that stop the state from steamrolling you.",
	},
	{
		id: "rol-v3",
		title: "How Laws Are Actually Made",
		type: "video",
		category: "Rule of Law",
		src: "/19072439-sd_540_960_30fps.mp4",
		description:
			"Bills, committees, deals — the messy pipeline from idea to rule.",
	},
	{
		id: "rol-v4",
		title: "Executive Orders: Power & Limits",
		type: "video",
		category: "Rule of Law",
		src: "/19072439-sd_540_960_30fps.mp4",
		description:
			"Fast power. Where it’s legal, where it’s abusive, and how it gets blocked.",
	},
	{
		id: "rol-v5",
		title: "Courts: The Final Word?",
		type: "video",
		category: "Rule of Law",
		src: "/6279147-sd_540_960_30fps.mp4",
		description:
			"Judges don’t just ‘apply’ law — they shape society. Here’s the leverage.",
	},
	{
		id: "rol-v6",
		title: "What Makes Something ‘Illegal’?",
		type: "video",
		category: "Rule of Law",
		src: "/6279147-sd_540_960_30fps.mp4",
		description:
			"Crime vs. harm vs. politics: how a state decides what’s punishable.",
	},
	{
		id: "rol-i1",
		title: "Hierarchy of Law (Who outranks who?)",
		type: "image",
		category: "Rule of Law",
		src: "Images/img.jpg",
		description:
			"Constitution → laws → regulations → local rules. When they clash, who wins?",
	},
	{
		id: "rol-i2",
		title: "Checks + Balances Map",
		type: "image",
		category: "Rule of Law",
		src: "Images/img.jpg",
		description:
			"A quick visual of who can block who — and where power leaks happen.",
	},
	{
		id: "rol-i3",
		title: "Due Process Checklist",
		type: "image",
		category: "Rule of Law",
		src: "Images/img.jpg",
		description:
			"Notice. Evidence. Defense. Judge. Appeal. If any piece is missing—danger.",
	},

	// =========================
	// RIGHTS
	// =========================
	{
		id: "r-v1",
		title: "Rights Are Standards — Not Rewards",
		type: "video",
		category: "Rights",
		src: "/6279147-sd_540_960_30fps.mp4",
		description:
			"Rights aren’t gifts. They’re limits on power that everyone must respect.",
	},
	{
		id: "r-v2",
		title: "Freedom of Speech (What it IS / What it’s NOT)",
		type: "video",
		category: "Rights",
		src: "/19072439-sd_540_960_30fps.mp4",
		description:
			"Speech is protected. Harassment and incitement aren’t. Learn the line.",
	},
	{
		id: "r-v3",
		title: "Minorities + Democracy",
		type: "video",
		category: "Rights",
		src: "/19072439-sd_540_960_30fps.mp4",
		description:
			"Majority rule is only legit when dissent is protected. Otherwise: tyranny.",
	},
	{
		id: "r-v4",
		title: "Privacy Is a Political Right",
		type: "video",
		category: "Rights",
		src: "/6279147-sd_540_960_30fps.mp4",
		description:
			"When you’re watched, you self-censor. That kills democracy quietly.",
	},
	{
		id: "r-v5",
		title: "Rights Aren’t ‘Nice’ — They’re Fought For",
		type: "video",
		category: "Rights",
		src: "/19072439-sd_540_960_30fps.mp4",
		description:
			"Every right you have has a history. Learn the pattern so you can defend it.",
	},
	{
		id: "r-i1",
		title: "Rights vs Privileges",
		type: "image",
		category: "Rights",
		src: "Images/img.jpg",
		description:
			"If the state can take it away for ‘bad behavior,’ it was never a right.",
	},
	{
		id: "r-i2",
		title: "Know Your Basic Rights (Quick card)",
		type: "image",
		category: "Rights",
		src: "Images/img.jpg",
		description: "The short version you can actually remember when it matters.",
	},

	// =========================
	// ELECTIONS
	// =========================
	{
		id: "el-v1",
		title: "The Act of Voting (Why it still matters)",
		type: "video",
		category: "Elections",
		src: "/19072439-sd_540_960_30fps.mp4",
		description:
			"Voting doesn’t fix everything — but it decides who gets to break things.",
	},
	{
		id: "el-v2",
		title: "Gerrymandering: Shaping Power",
		type: "video",
		category: "Elections",
		src: "/19072439-sd_540_960_30fps.mp4",
		description:
			"District lines can choose leaders before you even vote. Here’s the trick.",
	},
	{
		id: "el-v3",
		title: "Turnout = Power",
		type: "video",
		category: "Elections",
		src: "/6279147-sd_540_960_30fps.mp4",
		description:
			"Low turnout isn’t neutral — it’s a bias. Who benefits when you stay home?",
	},
	{
		id: "el-v4",
		title: "Election Promises: Read Like a Lawyer",
		type: "video",
		category: "Elections",
		src: "/6279147-sd_540_960_30fps.mp4",
		description:
			"Promises are designed to feel true. Learn how to check what’s real.",
	},
	{
		id: "el-v5",
		title: "Local Elections: The Real Power",
		type: "video",
		category: "Elections",
		src: "/19072439-sd_540_960_30fps.mp4",
		description:
			"City councils and mayors shape your daily life more than national drama.",
	},
	{
		id: "el-i1",
		title: "How Your Vote Becomes a Seat",
		type: "image",
		category: "Elections",
		src: "Images/img.jpg",
		description:
			"A simple visual for systems (winner-take-all vs proportional).",
	},
	{
		id: "el-i2",
		title: "Gerrymander Spotter",
		type: "image",
		category: "Elections",
		src: "Images/img.jpg",
		description: "What to look for when a district map looks… suspicious.",
	},

	// =========================
	// CHECKS & BALANCES
	// =========================
	{
		id: "cb-v1",
		title: "Checks & Balances (The anti-tyrant toolkit)",
		type: "video",
		category: "Checks & Balances",
		src: "/6279147-sd_540_960_30fps.mp4",
		description:
			"Power must collide with power — otherwise it expands until it eats you.",
	},
	{
		id: "cb-v2",
		title: "Separation of Powers (Why it’s fragile)",
		type: "video",
		category: "Checks & Balances",
		src: "/19072439-sd_540_960_30fps.mp4",
		description:
			"Branches are supposed to fight. When they merge, democracy shrinks.",
	},
	{
		id: "cb-v3",
		title: "Emergency Powers (The loophole everyone abuses)",
		type: "video",
		category: "Checks & Balances",
		src: "/19072439-sd_540_960_30fps.mp4",
		description:
			"‘Temporary’ powers have a habit of becoming permanent. Here’s how.",
	},
	{
		id: "cb-v4",
		title: "Who Watches the Watchers?",
		type: "video",
		category: "Checks & Balances",
		src: "/6279147-sd_540_960_30fps.mp4",
		description:
			"Oversight isn’t optional. It’s the immune system of democracy.",
	},
	{
		id: "cb-i1",
		title: "Power Map: Who can block who",
		type: "image",
		category: "Checks & Balances",
		src: "Images/img.jpg",
		description:
			"Vetoes, courts, budgets, oversight — the levers that stop runaway power.",
	},
	{
		id: "cb-i2",
		title: "Red Flags: When checks fail",
		type: "image",
		category: "Checks & Balances",
		src: "Images/img.jpg",
		description:
			"Attacking courts, capturing media, weakening oversight — same script, always.",
	},

	// =========================
	// MEDIA LITERACY
	// =========================
	{
		id: "ml-v1",
		title: "Fact-Checking in 60 Seconds",
		type: "video",
		category: "Media Literacy",
		src: "/19072439-sd_540_960_30fps.mp4",
		description: "3 checks. 10 seconds each. Stop sharing lies for free.",
	},
	{
		id: "ml-v2",
		title: "The Algorithm: Echo Chambers",
		type: "video",
		category: "Media Literacy",
		src: "/19072439-sd_540_960_30fps.mp4",
		description:
			"Your feed isn’t reality — it’s a product. Learn how it traps you.",
	},
	{
		id: "ml-v3",
		title: "Anatomy of a Deepfake",
		type: "video",
		category: "Media Literacy",
		src: "/6279147-sd_540_960_30fps.mp4",
		description: "If it’s too perfect, it’s probably fake. Here’s the tell.",
	},
	{
		id: "ml-v4",
		title: "Media Ownership (Follow the money)",
		type: "video",
		category: "Media Literacy",
		src: "/19072439-sd_540_960_30fps.mp4",
		description: "Who funds the story usually shapes the story.",
	},
	{
		id: "ml-v5",
		title: "Propaganda vs Persuasion",
		type: "video",
		category: "Media Literacy",
		src: "/6279147-sd_540_960_30fps.mp4",
		description:
			"Not all persuasion is evil — but propaganda hides its intent.",
	},
	{
		id: "ml-v6",
		title: "Ragebait: The Business Model",
		type: "video",
		category: "Media Literacy",
		src: "/19072439-sd_540_960_30fps.mp4",
		description:
			"Outrage is profitable. Learn to spot the hooks before they hook you.",
	},
	{
		id: "ml-i1",
		title: "Deepfake Spotting Cheatsheet",
		type: "image",
		category: "Media Literacy",
		src: "Images/img.jpg",
		description:
			"Lighting, lips, hands, audio drift — quick tells that save you.",
	},
	{
		id: "ml-i2",
		title: "Algorithm Loop Diagram",
		type: "image",
		category: "Media Literacy",
		src: "Images/img.jpg",
		description:
			"Engagement → more extreme content → more engagement. That’s the trap.",
	},
	{
		id: "ml-i3",
		title: "Verify Before You Share",
		type: "image",
		category: "Media Literacy",
		src: "Images/img.jpg",
		description:
			"Source, timestamp, reverse image search. Don’t do free labor for liars.",
	},

	// =========================
	// BONUS: CIVIL RESISTANCE (fits your concept note)
	// =========================
	{
		id: "cr-v1",
		title: "Nonviolent Power (Gene Sharp in plain language)",
		type: "video",
		category: "Civil Resistance",
		src: "/6279147-sd_540_960_30fps.mp4",
		description:
			"Power isn’t just weapons — it’s consent, money, labor, legitimacy. Withdraw it.",
	},
	{
		id: "cr-v2",
		title: "Protest: Your Right to Assemble",
		type: "video",
		category: "Civil Resistance",
		src: "/19072439-sd_540_960_30fps.mp4",
		description: "Know the rules. Keep it safe. Keep it effective.",
	},
	{
		id: "cr-i1",
		title: "Tactics Ladder (low risk → high risk)",
		type: "image",
		category: "Civil Resistance",
		src: "Images/img.jpg",
		description:
			"A visual ladder of actions — from civic habits to organized resistance.",
	},
];
