import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// optional but good: run the function closer to your Neon region
export const preferredRegion = ["fra1"];

type VoteType = "up" | "down" | null;

async function getOrCreateUserId() {
	const store = await cookies();
	let uid = store.get("d101_uid")?.value;

	if (!uid) {
		uid = crypto.randomUUID();
	}

	return uid;
}

function attachUserCookie(res: NextResponse, uid: string) {
	res.cookies.set({
		name: "d101_uid",
		value: uid,
		httpOnly: true,
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
		path: "/",
		maxAge: 60 * 60 * 24 * 365, // 1 year
	});
	return res;
}

export async function GET(req: Request) {
	try {
		const uid = await getOrCreateUserId();

		const { searchParams } = new URL(req.url);
		const idsParam = searchParams.get("ids") ?? "";
		const ids = idsParam
			.split(",")
			.map((s) => s.trim())
			.filter(Boolean);

		if (ids.length === 0) {
			const res = NextResponse.json(
				{ counts: {}, userVotes: {} },
				{ headers: { "Cache-Control": "no-store" } },
			);
			return attachUserCookie(res, uid);
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

			if (v.userId === uid) {
				userVotes[v.contentId] = v.value === 1 ? "up" : "down";
			}
		}

		const res = NextResponse.json(
			{ counts, userVotes },
			{ headers: { "Cache-Control": "no-store" } },
		);

		return attachUserCookie(res, uid);
	} catch (err) {
		console.error("GET /api/votes failed:", err);
		return NextResponse.json({ error: "Votes GET failed" }, { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		const uid = await getOrCreateUserId();
		const body = await req.json();

		const contentId = body?.contentId as string | undefined;
		const vote = body?.vote as VoteType;

		if (!contentId) {
			return NextResponse.json({ error: "Missing contentId" }, { status: 400 });
		}

		if (vote !== "up" && vote !== "down" && vote !== null) {
			return NextResponse.json(
				{ error: "Invalid vote value" },
				{ status: 400 },
			);
		}

		// Write
		if (vote === null) {
			await prisma.vote.deleteMany({ where: { contentId, userId: uid } });
		} else {
			const value = vote === "up" ? 1 : -1;

			await prisma.vote.upsert({
				where: { contentId_userId: { contentId, userId: uid } },
				update: { value },
				create: { contentId, userId: uid, value },
			});
		}

		// Read back counts (single grouped query)
		const grouped = await prisma.vote.groupBy({
			by: ["value"],
			where: { contentId },
			_count: { _all: true },
		});

		const up = grouped.find((g) => g.value === 1)?._count._all ?? 0;
		const down = grouped.find((g) => g.value === -1)?._count._all ?? 0;

		const myVote = await prisma.vote.findUnique({
			where: { contentId_userId: { contentId, userId: uid } },
			select: { value: true },
		});

		const res = NextResponse.json(
			{
				up,
				down,
				userVote: myVote ? (myVote.value === 1 ? "up" : "down") : null,
			},
			{ headers: { "Cache-Control": "no-store" } },
		);

		return attachUserCookie(res, uid);
	} catch (err) {
		console.error("POST /api/votes failed:", err);
		return NextResponse.json({ error: "Votes POST failed" }, { status: 500 });
	}
}
