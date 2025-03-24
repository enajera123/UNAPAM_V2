import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';
async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))
        return payload
    } catch (error) {
        return null
    }
}
const unprotectedPaths = ['/api/v1/users/auth', '/api/v1/users/auth/sendRecoveryEmail']
export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()
    if (unprotectedPaths.includes(url.pathname)) return NextResponse.next()
    const token = request.cookies.get('jwtUNAPAM')
    if (!token) return NextResponse.redirect(new URL("/", url))
    const payload = await verifyToken(token.value)
    console.log(payload)
    if (!payload) return NextResponse.redirect(new URL("/", url))
    return NextResponse.next()
}
export const config = {
    matcher: [
        '/api/:path*',
        '/admin/:path*',
    ]
};