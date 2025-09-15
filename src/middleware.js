// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  // console.log("🌐 middleware is running");
  // console.log("🍪 token:", token);

  if (!token) {
    console.log("❌ No token found → redirecting...");
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/users", "/settings"],
};
