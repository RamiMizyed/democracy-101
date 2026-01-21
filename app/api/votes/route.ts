import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type VoteType = "up" | "down" | null;

async function getUserId() {
	// Next 16 can require await here
	const store = await cookies();
	return store.get("d101_uid")?.value ?? "anon";
}

export async function GET(req: Request) {
	try {
		const userId = await getUserId();

		const { searchParams } = new URL(req.url);
		const idsParam = searchParams.get("ids") ?? "";
		const ids = idsParam.split(",").filter(Boolean);

		if (ids.length === 0) {
			return NextResponse.json(
				{ counts: {}, userVotes: {} },
				{ headers: { "Cache-Control": "no-store" } },
			);
		}

		const votes = await prisma.vote.findMany({
			where: { contentId: { in: ids } },
			select: { contentId: true, userId: true, value: true },
		});

		const counts: Record<string, { up: number; down: number }> = {};
		const userVotes: Record<string, VoteType> = {};

		for (const id of ids) counts[id] = { up: 0, down: 0 };

		for (const v of votes) {
			if (v.value === 1) counts[v.contentId].up += 1;
			if (v.value === -1) counts[v.contentId].down += 1;

			if (v.userId === userId) {
				userVotes[v.contentId] = v.value === 1 ? "up" : "down";
			}
		}

		return NextResponse.json(
			{ counts, userVotes },
			{ headers: { "Cache-Control": "no-store" } },
		);
	} catch (err) {
		console.error("GET /api/votes failed:", err);
		return NextResponse.json({ error: "Votes GET failed" }, { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		const userId = await getUserId();
		const body = await req.json();

		const contentId = body?.contentId as string | undefined;
		const vote = body?.vote as VoteType;

		if (!contentId) {
			return NextResponse.json({ error: "Missing contentId" }, { status: 400 });
		}

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

		// ✅ counts for THIS content only
		const [up, down] = await Promise.all([
			prisma.vote.count({ where: { contentId, value: 1 } }),
			prisma.vote.count({ where: { contentId, value: -1 } }),
		]);

		const myVote = await prisma.vote.findUnique({
			where: { contentId_userId: { contentId, userId } },
		});

		return NextResponse.json(
			{
				up,
				down,
				userVote: myVote ? (myVote.value === 1 ? "up" : "down") : null,
			},
			{ headers: { "Cache-Control": "no-store" } },
		);
	} catch (err) {
		console.error("POST /api/votes failed:", err);
		return NextResponse.json({ error: "Votes POST failed" }, { status: 500 });
	}
}
