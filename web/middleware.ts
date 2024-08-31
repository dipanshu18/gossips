import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const sessionCookie = cookies().get("session")?.value;
  const { pathname } = request.nextUrl;

  // Define paths that require authentication
  const restrictedPaths = ["/home", "/profile"];
  const publicPaths = ["/login", "/signup", "/"];

  // If no session cookie and accessing restricted paths, redirect to /login
  if (
    !sessionCookie &&
    restrictedPaths.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If session cookie exists and accessing public paths, redirect to /home
  if (sessionCookie && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next(); // Allow the request to continue if no conditions are met
}

export const config = {
  matcher: ["/home/:path*", "/profile/:path*", "/login", "/signup", "/"],
};
