import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await auth();

  const pathname = request.nextUrl.pathname;

  const isPublicPage =
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/verify" ||
    pathname === "/reset-password" ||
    pathname === "/forgot-password" ||
    pathname === "/login-with-email";

  if (!isPublicPage && !session?.user.email) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isPublicPage && session?.user.email) {
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
    "/login-with-email",
  ],
};
