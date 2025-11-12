// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Democracy‑101 | Civic Education for All",
	description: "Community‑powered civic education: watch, vote, contribute.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} antialiased bg-grid`}>
				{children}
			</body>
		</html>
	);
}
