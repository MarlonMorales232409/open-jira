import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

	if (request.nextUrl.pathname.startsWith("/api/entries/")) {
		const id = request.nextUrl.pathname.replace("/api/entries/", "");

		if (!checkMongoIDRegExp.test(id)) {
			const url = request.nextUrl.clone();
			url.pathname = "/api/bad-request";
			url.search = `?message=${id} is not a valid MongoID`;
			return NextResponse.rewrite(url);
		}
	}

	return NextResponse.next();
}

export const config = {
	//   matcher: '/about/:path*',
	matcher: [
		// '/api/:path',
		"/api/entries/:path",
	],
};
