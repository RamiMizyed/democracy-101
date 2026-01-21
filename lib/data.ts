export type ContentItem = {
	id: string;
	title: string;
	type: "video" | "image";
	src: string;
	category: string;
	description?: string;
};

export const MOCK_CONTENT: ContentItem[] = [
	// --- CATEGORY: RULE OF LAW ---
	{
		id: "rol-v1",
		title: "The Constitution: A Living Document",
		type: "video",
		category: "Rule of Law",
		src: "https://assets.mixkit.co/videos/preview/mixkit-very-old-manuscript-of-a-document-42551-large.mp4",
		description:
			"The blueprint of power. Decode the document that defines the boundaries of the state.",
	},
	{
		id: "rol-v2",
		title: "Supreme Court: The Final Word?",
		type: "video",
		category: "Rule of Law",
		src: "https://assets.mixkit.co/videos/preview/mixkit-gavel-hitting-the-block-in-a-courtroom-32961-large.mp4",
		description:
			"Behind the bench. How nine people interpret the rules of your life.",
	},
	{
		id: "rol-v3",
		title: "Due Process: Your Shield",
		type: "video",
		category: "Rule of Law",
		src: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-judge-writing-on-a-document-32964-large.mp4",
		description:
			"Your constitutional armor. No one is above the law, and no one is beneath it.",
	},
	{
		id: "rol-v4",
		title: "How Laws are Actually Made",
		type: "video",
		category: "Rule of Law",
		src: "https://assets.mixkit.co/videos/preview/mixkit-the-united-states-capitol-building-dome-40342-large.mp4",
		description:
			"From a bill to a mandate. Follow the chaotic path of legislation through the Capitol.",
	},
	{
		id: "rol-v5",
		title: "Executive Orders: Power & Limits",
		type: "video",
		category: "Rule of Law",
		src: "https://assets.mixkit.co/videos/preview/mixkit-fountain-pen-writing-on-a-paper-32962-large.mp4",
		description:
			"The stroke of a pen. Understanding the unilateral authority of the executive branch.",
	},
	{
		id: "rol-p1",
		title: "The Hierarchy of Law",
		type: "image",
		category: "Rule of Law",
		src: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
	},
	{
		id: "rol-p2",
		title: "Checks & Balances",
		type: "image",
		category: "Rule of Law",
		src: "https://images.unsplash.com/photo-1521791136064-7986c29596ad?auto=format&fit=crop&q=80&w=800",
	},

	// --- CATEGORY: RIGHTS & ACTION ---
	{
		id: "ra-v1",
		title: "Gerrymandering: Shaping Power",
		type: "video",
		category: "Rights & Action",
		src: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-large-city-at-night-11030-large.mp4",
		description:
			"Drawing the lines of victory. See how district maps are used to manipulate outcomes.",
	},
	{
		id: "ra-v2",
		title: "The Act of Voting",
		type: "video",
		category: "Rights & Action",
		src: "https://assets.mixkit.co/videos/preview/mixkit-hand-putting-a-voting-ballot-in-a-box-48471-large.mp4",
		description:
			"The ultimate weapon of the citizen. The history and struggle of the ballot box.",
	},
	{
		id: "ra-v3",
		title: "Protest: Your First Amendment",
		type: "video",
		category: "Rights & Action",
		src: "https://assets.mixkit.co/videos/preview/mixkit-large-crowd-of-people-at-a-protest-43098-large.mp4",
		description:
			"Take it to the streets. Understanding the legal right to assembly and grievance.",
	},
	{
		id: "ra-v4",
		title: "Local Government: The Real Power",
		type: "video",
		category: "Rights & Action",
		src: "https://assets.mixkit.co/videos/preview/mixkit-people-walking-on-a-city-street-4412-large.mp4",
		description:
			"City hall is closer than D.C. How local councils change your neighborhood.",
	},
	{
		id: "ra-v5",
		title: "The Global Fight",
		type: "video",
		category: "Rights & Action",
		src: "https://assets.mixkit.co/videos/preview/mixkit-flags-of-different-countries-waving-in-the-wind-48465-large.mp4",
		description:
			"Democracy is a global movement. Comparing civil rights across the planet.",
	},
	{
		id: "ra-p1",
		title: "The Power of the Ballot",
		type: "image",
		category: "Rights & Action",
		src: "https://images.unsplash.com/photo-1540910419892-f39a6cf9faad?auto=format&fit=crop&q=80&w=800",
	},

	// --- CATEGORY: MEDIA LITERACY ---
	{
		id: "ml-v1",
		title: "Anatomy of a Deepfake",
		type: "video",
		category: "Media Literacy",
		src: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-human-face-forming-from-particles-42001-large.mp4",
		description:
			"Don't believe your eyes. How AI is being used to manufacture political reality.",
	},
	{
		id: "ml-v2",
		title: "The Algorithm: Echo Chambers",
		type: "video",
		category: "Media Literacy",
		src: "https://assets.mixkit.co/videos/preview/mixkit-fingers-scrolling-on-a-social-media-app-42610-large.mp4",
		description:
			"Trapped in the feed. How social platforms curate your bias for profit.",
	},
	{
		id: "ml-v3",
		title: "Fact-Checking in 60 Seconds",
		type: "video",
		category: "Media Literacy",
		src: "https://assets.mixkit.co/videos/preview/mixkit-cluttered-desk-with-a-laptop-and-papers-40348-large.mp4",
		description:
			"The digital detective. Tools and tactics to verify claims in real-time.",
	},
	{
		id: "ml-v4",
		title: "Media Ownership",
		type: "video",
		category: "Media Literacy",
		src: "https://assets.mixkit.co/videos/preview/mixkit-tv-screen-showing-static-noise-41566-large.mp4",
		description:
			"Who owns the truth? Mapping the six corporations that control the news.",
	},
	{
		id: "ml-v5",
		title: "Data Privacy & Your Voice",
		type: "video",
		category: "Media Literacy",
		src: "https://assets.mixkit.co/videos/preview/mixkit-typing-on-a-computer-keyboard-in-a-dark-room-42603-large.mp4",
		description:
			"Your data is a vote. How surveillance capitalism influences democratic choice.",
	},
];
