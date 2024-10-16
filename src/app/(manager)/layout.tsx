import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default function ManagerLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const userCookie = getCookie("user", { cookies });

	if (!userCookie) {
		return redirect("/signin");
	}

	return (
		<main className="mx-auto flex h-svh w-[min(75rem,100%)] flex-col gap-5 p-4">
			{children}
		</main>
	);
}
