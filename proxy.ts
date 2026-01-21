import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
	const res = NextResponse.next();

	// Give every browser a stable ID (no login required)
	const uid = req.cookies.get("d101_uid")?.value;

	if (!uid) {
		res.cookies.set("d101_uid", crypto.randomUUID(), {
			httpOnly: true,
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 24 * 365, // 1 year
		});
	}

	return res;
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
