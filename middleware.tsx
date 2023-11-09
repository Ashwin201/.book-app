import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/post") {
        return NextResponse.rewrite(new URL('/', request.url))
    }
    if (request.nextUrl.pathname === "/categories") {
        return NextResponse.rewrite(new URL('/', request.url))
    }
    if (request.nextUrl.pathname === "/editpost") {
        return NextResponse.rewrite(new URL('/', request.url))
    }


}