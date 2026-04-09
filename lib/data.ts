export type ContentItem = {
    id: string;
    title: string;
    type: "video" | "image";
    src: string;
    category: string;
    description?: string;
};

// Alternate between your two videos for variety
const VID_1 = "/19072439-sd_540_960_30fps.mp4";
const VID_2 = "/6279147-sd_540_960_30fps.mp4";
const IMG = "Images/img.jpg";

export const MOCK_CONTENT: ContentItem[] = [
    // 1. CIVICS
    { id: "civ-v1", title: "How a Bill Actually Dies", type: "video", category: "Civics", src: VID_1, description: "Committees, filibusters, and the graveyard of good ideas." },
    { id: "civ-i1", title: "The 3 Branches Visualized", type: "image", category: "Civics", src: IMG, description: "Who writes it, who enforces it, who judges it." },

    // 2. LAW
    { id: "law-v1", title: "Due Process: Your Shield", type: "video", category: "Law", src: VID_2, description: "No shortcuts. The rules that stop the state from steamrolling you." },
    { id: "law-i1", title: "Hierarchy of Law", type: "image", category: "Law", src: IMG, description: "Constitution → laws → regulations → local rules." },

    // 3. ELECTIONS
    { id: "el-v1", title: "Gerrymandering in 60 Seconds", type: "video", category: "Elections", src: VID_1, description: "How politicians pick their voters before you even cast a ballot." },
    { id: "el-i1", title: "How Your Vote Becomes a Seat", type: "image", category: "Elections", src: IMG, description: "Winner-take-all vs proportional representation." },

    // 4. RIGHTS
    { id: "rts-v1", title: "Freedom of Speech: The Limits", type: "video", category: "Rights", src: VID_2, description: "Speech is protected. Harassment and incitement aren’t." },
    { id: "rts-i1", title: "Know Your Basic Rights", type: "image", category: "Rights", src: IMG, description: "The short version you can actually remember when stopped." },

    // 5. MEDIA
    { id: "med-v1", title: "Ragebait: The Business Model", type: "video", category: "Media", src: VID_1, description: "Outrage is profitable. Learn to spot the hooks before they hook you." },
    { id: "med-i1", title: "Verify Before You Share", type: "image", category: "Media", src: IMG, description: "Don’t do free labor for liars. Source, timestamp, reverse search." },

    // 6. TECH
    { id: "tch-v1", title: "The Algorithm: Echo Chambers", type: "video", category: "Tech", src: VID_2, description: "Your feed isn’t reality — it’s a product. Learn how it traps you." },
    { id: "tch-i1", title: "Data Privacy 101", type: "image", category: "Tech", src: IMG, description: "What you agree to when you click 'Accept All Cookies'." },

    // 7. ACTIVISM
    { id: "act-v1", title: "Nonviolent Power Explained", type: "video", category: "Activism", src: VID_1, description: "Power isn’t just weapons — it’s consent, money, labor, legitimacy." },
    { id: "act-i1", title: "Protest Safety Guide", type: "image", category: "Activism", src: IMG, description: "Know the rules. Keep it safe. Keep it effective." },

    // 8. CORRUPTION
    { id: "cor-v1", title: "Lobbying vs. Bribery", type: "video", category: "Corruption", src: VID_2, description: "Where is the legal line when money talks to power?" },
    { id: "cor-i1", title: "Follow The Money", type: "image", category: "Corruption", src: IMG, description: "How dark money PACs funnel cash into local elections." },

    // 9. HISTORY
    { id: "his-v1", title: "The Suffrage Movement", type: "video", category: "History", src: VID_1, description: "Rights aren't given. They are demanded. How the vote was won." },
    { id: "his-i1", title: "Timeline of Democracy", type: "image", category: "History", src: IMG, description: "From Athens to modern republics: a bloody, brilliant timeline." },

    // 10. LOCAL
    { id: "loc-v1", title: "Why Mayors Matter Most", type: "video", category: "Local", src: VID_2, description: "City councils shape your daily life more than national drama." },
    { id: "loc-i1", title: "City Budget Breakdown", type: "image", category: "Local", src: IMG, description: "Potholes, parks, and police: where your property taxes actually go." },

    // 11. GLOBAL
    { id: "glo-v1", title: "What Does the UN Actually Do?", type: "video", category: "Global", src: VID_1, description: "Diplomacy, sanctions, and the limits of international law." },
    { id: "glo-i1", title: "Democracy Index Map", type: "image", category: "Global", src: IMG, description: "Who is free, who is sliding, and who is locked down." },

    // 12. ECONOMY
    { id: "eco-v1", title: "Taxes: Where Does It Go?", type: "video", category: "Economy", src: VID_2, description: "A brutalist breakdown of the federal budget." },
    { id: "eco-i1", title: "The Federal Reserve Basics", type: "image", category: "Economy", src: IMG, description: "Interest rates, inflation, and the invisible hand of the Fed." },
];