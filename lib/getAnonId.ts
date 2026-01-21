export function getAnonId() {
	if (typeof window === "undefined") return "server";
	const key = "d101_uid";
	let uid = localStorage.getItem(key);
	if (!uid) {
		uid = crypto.randomUUID();
		localStorage.setItem(key, uid);
	}
	return uid;
}
