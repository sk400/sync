import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await auth();
  const token = request.cookies.get("passwordless-signin-token");

  const pathname = request.nextUrl.pathname;

  const authenticated = session?.user.email || token;

  const isPublicPage =
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/verify" ||
    pathname === "/reset-password" ||
    pathname === "/forgot-password" ||
    pathname === "/signin-with-email" ||
    pathname === "/verify-link";

  if (!isPublicPage && !authenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isPublicPage && authenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/sign-up",
    "/sign-in",
    "/verify",
    "/reset-password",
    "/forgot-password",
    "/signin-with-email",
    "/verify-link",
  ],
};
