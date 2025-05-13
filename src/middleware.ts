import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from "@/functions/auth"

export async function middleware(request: NextRequest) {
  try {
    const payload = await auth(request)

    // If user is logged in and tries to access "/", redirect to dashboard
    if (
      (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/login") &&
      payload?.role === "admin"
    ) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }

    // If user tries to access protected admin routes without admin role
    if (
      request.nextUrl.pathname.startsWith("/admin/dashboard") &&
      payload?.role !== "admin"
    ) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
  } catch (e) {
    // Not authenticated and trying to access protected route
    if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next() // let them access public pages like "/"
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|icon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
