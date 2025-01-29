import { auth } from "@/auth";
import { NextResponse } from "next/server";

const publivRoutes = [
  '/'
];

const authRoutes = [
  '/login',
  '/register'
];

export default auth((req) => {
  const {nextUrl} = req;
  const isLoggedIn = !!req.auth;

  const isPublic = publivRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  console.log('nextUrl.pathname', nextUrl.pathname);
  console.log('isPublic', isPublic);
  console.log('isAuthRoute', isAuthRoute);

  if (isPublic) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/members", nextUrl.origin));
    }
    return NextResponse.next();
  }

  if (!isPublic && !isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl.origin));
  }

});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/members/:path*',
    '/login',
    '/register'
  ],
};
