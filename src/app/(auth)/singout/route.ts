import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const cookie = cookies();

	cookie.delete("user");

	const url = new URL(req.nextUrl.clone());

	url.pathname = "/signin";

	return NextResponse.redirect(url);
}
