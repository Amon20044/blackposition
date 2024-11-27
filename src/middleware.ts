import {NextResponse} from 'next/server'
import type {NextRequest} from 'next/server'
import {auth} from "@/functions/auth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    try {
        if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
            const payload = await auth(request)
            if (payload.role !== "admin") {
                return NextResponse.redirect(new URL('/', request.url))

            }
        }
    } catch (e) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - icon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|icon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}