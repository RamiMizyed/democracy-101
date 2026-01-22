import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type VoteType = "up" | "down" | null;

function makeUid() {
	// Node runtime supports crypto.randomUUID()
	return crypto.randomUUID();
}

async function getOrCreateUserId() {
	const store = await cookies();
	const existing = store.get("d101_uid")?.value;

	if (existing) {
		return { userId: existing, isNew: false };
	}

	return { userId: makeUid(), isNew: true };
}

function withNoStore(res: NextResponse) {
	res.headers.set("Cache-Control", "no-store, max-age=0");
	return res;
}

export async function GET(req: Request) {
	try {
		const { userId, isNew } = await getOrCreateUserId();

		const { searchParams } = new URL(req.url);
		const idsParam = searchParams.get("ids") ?? "";
		const ids = idsParam
			.split(",")
			.map((x) => x.trim())
			.filter(Boolean)
			.slice(0, 200); // safety limit

		if (ids.length === 0) {
			const res = NextResponse.json({ counts: {}, userVotes: {} });
			if (isNew) {
				res.cookies.set("d101_uid", userId, {
					httpOnly: true,
					sameSite: "lax",
					secure: process.env.NODE_ENV === "production",
					path: "/",
					maxAge: 60 * 60 * 24 * 365,
				});
			}
			return withNoStore(res);
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

		const res = NextResponse.json({ counts, userVotes });

		// ✅ set cookie if it's a first-time visitor
		if (isNew) {
			res.cookies.set("d101_uid", userId, {
				httpOnly: true,
				sameSite: "lax",
				secure: process.env.NODE_ENV === "production",
				path: "/",
				maxAge: 60 * 60 * 24 * 365,
			});
		}

		return withNoStore(res);
	} catch (err) {
		console.error("GET /api/votes failed:", err);
		return NextResponse.json({ error: "Votes GET failed" }, { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
		const { userId, isNew } = await getOrCreateUserId();
		const body = await req.json().catch(() => null);

		const contentId = (body?.contentId as string | undefined)?.trim();
		const vote = body?.vote as VoteType;

		if (!contentId) {
			return NextResponse.json({ error: "Missing contentId" }, { status: 400 });
		}

		// ✅ validate vote input
		const allowed = vote === null || vote === "up" || vote === "down";
		if (!allowed) {
			return NextResponse.json(
				{ error: "Invalid vote value" },
				{ status: 400 },
			);
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

		const res = NextResponse.json({
			up,
			down,
			userVote: myVote ? (myVote.value === 1 ? "up" : "down") : null,
		});

		// ✅ set cookie if first time visitor
		if (isNew) {
			res.cookies.set("d101_uid", userId, {
				httpOnly: true,
				sameSite: "lax",
				secure: process.env.NODE_ENV === "production",
				path: "/",
				maxAge: 60 * 60 * 24 * 365,
			});
		}

		return withNoStore(res);
	} catch (err) {
		console.error("POST /api/votes failed:", err);
		return NextResponse.json({ error: "Votes POST failed" }, { status: 500 });
	}
}
