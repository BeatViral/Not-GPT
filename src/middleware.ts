import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isDemoAdmin = process.env.DEMO_ADMIN_ACCESS === "true";
  const hasCookie = request.cookies.get("notgpt_admin")?.value === "1";

  if (!isDemoAdmin && !hasCookie) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/goo/:path*"]
};
