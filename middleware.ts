import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextResponse } from "next/server";

// Create the NextAuth middleware using the provided configuration
const { auth: middleware } = NextAuth(authConfig)

// Rutas publicas
const publicRoutes = [
  "/",
  "/auth",
  "/api/verify-email",
];
// Middleware
export default middleware((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!auth?.user;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = nextUrl.pathname.startsWith("/auth");

  // If user is logged in and trying to access auth pages, redirect to dashboard
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // If user is not logged in and trying to access protected routes, redirect to login
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth", nextUrl));
  }

  return NextResponse.next();
});

// Define the paths where the middleware should be applied
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};