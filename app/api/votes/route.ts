import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import crypto from "crypto";

export const runtime = "nodejs"; // ✅ IMPORTANT: Prisma must run on Node

type VoteType = "up" | "down" | null;

function normalizeIds(idsParam: string) {
	return Array.from(
		new Set(
			idsParam
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean),
		),
	);
}

async function getUserId() {
	const cookieStore = await cookies(); // ✅ Next 16 requires await
	let uid = cookieStore.get("d101_uid")?.value;

	if (!uid) uid = crypto.randomUUID();
	return uid;
}

async function ensureCookie(res: NextResponse, userId: string) {
	const cookieStore = await cookies();
	if (!cookieStore.get("d101_uid")?.value) {
		res.cookies.set("d101_uid", userId, {
			httpOnly: true,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			path: "/",
			maxAge: 60 * 60 * 24 * 365, // 1 year
		});
	}
}

// ✅ GET totals + my vote
export async function GET(req: Request) {
	const userId = await getUserId();
	const { searchParams } = new URL(req.url);

	const ids = normalizeIds(searchParams.get("ids") || "");
	if (ids.length === 0) {
		const res = NextResponse.json({ counts: {}, userVotes: {} });
		await ensureCookie(res, userId);
		return res;
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

	const res = NextResponse.json({ counts, userVotes });
	await ensureCookie(res, userId);
	return res;
}

// ✅ POST toggle vote (up/down/null)
export async function POST(req: Request) {
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

	const [up, down, myVote] = await Promise.all([
		prisma.vote.count({ where: { contentId, value: 1 } }),
		prisma.vote.count({ where: { contentId, value: -1 } }),
		prisma.vote.findUnique({
			where: { contentId_userId: { contentId, userId } },
		}),
	]);

	const res = NextResponse.json({
		up,
		down,
		userVote: myVote ? (myVote.value === 1 ? "up" : "down") : null,
	});

	await ensureCookie(res, userId);
	return res;
}
