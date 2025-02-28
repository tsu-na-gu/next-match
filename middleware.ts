import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const publivRoutes = [
  '/'
];

const authRoutes = [
  '/login',
  '/register'
];

export default auth(async function middleware(req: NextRequest) {
  const {nextUrl} = req
  const isLoggedIn = !!req.cookies.get('authjs.session-token');

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
      return NextResponse.redirect(new URL("/members', nextUrl))"))
    }
    return NextResponse.next();
  }
  if (!isPublic && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl))
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};