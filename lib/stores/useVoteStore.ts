"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type VoteType = "up" | "down";
type Counts = { up: number; down: number };

type VoteStore = {
	counts: Record<string, Counts>;
	userVotes: Record<string, VoteType | null>;
	pending: Record<string, boolean>;

	hydrate: (ids: string[]) => Promise<void>;
	toggleVote: (contentId: string, vote: VoteType) => Promise<void>;
};

const clamp = (n: number) => Math.max(0, n);

export const useVoteStore = create<VoteStore>()(
	persist(
		(set, get) => ({
			counts: {},
			userVotes: {},
			pending: {},

			// ✅ pull real totals + myVote from server on load
			hydrate: async (ids) => {
				if (!ids.length) return;

				const uniqueIds = Array.from(new Set(ids));

				const res = await fetch(`/api/votes?ids=${uniqueIds.join(",")}`, {
					method: "GET",
					cache: "no-store",
				});

				if (!res.ok) return;

				const data: {
					counts: Record<string, Counts>;
					userVotes: Record<string, VoteType | null>;
				} = await res.json();

				set((state) => ({
					counts: { ...state.counts, ...data.counts },
					userVotes: { ...state.userVotes, ...data.userVotes },
				}));
			},

			// ✅ toggle vote (spam-proof + undo)
			toggleVote: async (contentId, vote) => {
				if (get().pending[contentId]) return;

				const prevVote = get().userVotes[contentId] ?? null;
				const prevCounts = get().counts[contentId] ?? { up: 0, down: 0 };

				let nextVote: VoteType | null = vote;
				let nextCounts: Counts = { ...prevCounts };

				// If clicking same vote again -> remove
				if (prevVote === vote) {
					nextVote = null;
					nextCounts[vote] = clamp(nextCounts[vote] - 1);
				} else {
					// Switch or add
					if (prevVote) nextCounts[prevVote] = clamp(nextCounts[prevVote] - 1);
					nextCounts[vote] = clamp(nextCounts[vote] + 1);
				}

				// Optimistic UI update
				set((state) => ({
					userVotes: { ...state.userVotes, [contentId]: nextVote },
					counts: { ...state.counts, [contentId]: nextCounts },
					pending: { ...state.pending, [contentId]: true },
				}));

				try {
					const res = await fetch("/api/votes", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ contentId, vote: nextVote }),
					});

					if (!res.ok) throw new Error("Vote request failed");

					const data: { up: number; down: number; userVote: VoteType | null } =
						await res.json();

					set((state) => ({
						counts: {
							...state.counts,
							[contentId]: { up: data.up, down: data.down },
						},
						userVotes: { ...state.userVotes, [contentId]: data.userVote },
						pending: { ...state.pending, [contentId]: false },
					}));
				} catch {
					// rollback on failure
					set((state) => ({
						counts: { ...state.counts, [contentId]: prevCounts },
						userVotes: { ...state.userVotes, [contentId]: prevVote },
						pending: { ...state.pending, [contentId]: false },
					}));
				}
			},
		}),
		{
			name: "d101-vote-store",
			partialize: (state) => ({
				userVotes: state.userVotes, // persist user choices for snappy UI
			}),
		},
	),
);
