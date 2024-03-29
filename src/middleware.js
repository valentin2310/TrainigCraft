import { NextResponse } from "next/server";
import { getAuthUser, isLoggedIn } from "@/app/lib/auth";

export function middleware(request) {
    //const isLogged = isLoggedIn()
    const isLogged = true

    const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard')

    if (isOnDashboard && !isLogged) {
        return NextResponse.redirect(new URL('/', request.url))

    } else if (isLogged) {
        return NextResponse.rewrite(new URL('/dashboard', request.url))
    }
}

export const config = {
    matcher: [
        '/dashboard',
    ]
}