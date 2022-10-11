// middleware.ts
import { NextRequest, NextResponse, URLPattern } from "next/server";

// const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/api/entries/")) {
		const id = request.nextUrl.pathname.replace("/api/entries/", "");
		console.log(id);
	}

	// return NextResponse.redirect(new URL("/entries", request.url));

	// return new Response(JSON.stringify({ message: `Your id is ${25}` }), {
	// 	status: 200,
	// 	headers: {
	// 		"Content-Type": "application/json",
	// 	},
	// });
}
