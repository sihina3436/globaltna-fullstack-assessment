import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isProtectedPath(pathname: string) {
  // Protect:
  //  /home
  //  /jobs/new
  //  /jobs/[id]
  if (pathname === "/home") return true;
  if (pathname.startsWith("/jobs")) return true;

  return false;
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // If not logged in, block protected routes
  if (isProtectedPath(pathname) && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/"; 
    return NextResponse.redirect(url);
  }

  // if logged in, don't let user open "/"
  if (pathname === "/" && token) {
    const url = req.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Run middleware only on these paths
export const config = {
  matcher: ["/", "/home", "/jobs/:path*"],
};