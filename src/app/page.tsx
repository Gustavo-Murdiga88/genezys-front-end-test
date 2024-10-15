import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function HomePage() {
	const userCookie = getCookie("user", { cookies });

	if (userCookie) {
		return redirect("/home");
	}

	return redirect("/signin");
}
