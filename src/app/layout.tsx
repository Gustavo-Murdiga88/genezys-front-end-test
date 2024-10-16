/* eslint-disable simple-import-sort/imports */

import { Providers } from "@/providers";
import "./globals.css";

import type { Metadata, Viewport } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Poppins } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
	title: {
		template: "%s | Genezys",
		default: "Genezys",
	},
	description:
		"An test create to show my skills to investment company, called Genezys.",
};

export const viewport: Viewport = {
	maximumScale: 1,
	minimumScale: 1,
	height: "device-height",
	width: "device-width",
	initialScale: 1,
	colorScheme: "dark light",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#f4f4f4" },
		{ media: "(prefers-color-scheme: dark)", color: "#121214" },
	],
	viewportFit: "auto",
};

const PoppinsSans = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-Poppins-sans",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<ViewTransitions>
			<html lang="pt-br" className="dark">
				<body
					className={`antialiased ${PoppinsSans.variable} font-popins font-bold`}
				>
					<Providers>{children}</Providers>
					<Toaster />
				</body>
			</html>
		</ViewTransitions>
	);
}
