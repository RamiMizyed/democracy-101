import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type VoteType = "up" | "down" | null;

function getUserId(req: NextRequest) {
	return req.cookies.get("d101_uid")?.value ?? "anon";
}

// ✅ Load counts + myVote for multiple IDs
export async function GET(req: NextRequest) {
	const userId = getUserId(req);

	const { searchParams } = new URL(req.url);
	const idsParam = searchParams.get("ids") || "";
	const ids = idsParam.split(",").filter(Boolean);

	if (!ids.length) {
		return NextResponse.json({ counts: {}, userVotes: {} });
	}

	const votes = await prisma.vote.findMany({
		where: { contentId: { in: ids } },
		select: { contentId: true, userId: true, value: true },
	});

	const counts: Record<string, { up: number; down: number }> = {};
	const userVotes: Record<string, "up" | "down" | null> = {};

	for (const id of ids) counts[id] = { up: 0, down: 0 };

	for (const v of votes) {
		if (v.value === 1) counts[v.contentId].up += 1;
		if (v.value === -1) counts[v.contentId].down += 1;

		if (v.userId === userId) {
			userVotes[v.contentId] = v.value === 1 ? "up" : "down";
		}
	}

	return NextResponse.json({ counts, userVotes });
}

// ✅ Toggle vote up/down/remove
export async function POST(req: NextRequest) {
	const userId = getUserId(req);
	const { contentId, vote }: { contentId: string; vote: VoteType } =
		await req.json();

	if (!contentId) {
		return NextResponse.json({ error: "Missing contentId" }, { status: 400 });
	}

	// Remove vote
	if (vote === null) {
		await prisma.vote.deleteMany({ where: { contentId, userId } });
	} else {
		const value = vote === "up" ? 1 : -1;

		await prisma.vote.upsert({
			where: { contentId_userId: { contentId, userId } },
			update: { value },
			create: { contentId, userId, value },
		});
	}

	const [up, down] = await Promise.all([
		prisma.vote.count({ where: { contentId, value: 1 } }),
		prisma.vote.count({ where: { contentId, value: -1 } }),
	]);

	const myVote = await prisma.vote.findUnique({
		where: { contentId_userId: { contentId, userId } },
	});

	return NextResponse.json({
		up,
		down,
		userVote: myVote ? (myVote.value === 1 ? "up" : "down") : null,
	});
}
