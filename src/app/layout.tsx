/* eslint-disable simple-import-sort/imports */

import { Providers } from "@/providers";
import "./globals.css";

import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Poppins } from "next/font/google";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
	title: "Singin | Genezys",
	description:
		"An test create to show my skills to investment company, called Genezys.",
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
