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

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()
    const unprotectedPaths = ['/api/users/byId', '/api/users/auth', '/api/users/changePassword', '/api/users/byAuth']
    // const publicPaths = []
    const adminClientPaths = ['/admin']
    const pathIn = (path: string) => url.pathname.startsWith(path)
    const verifyAndRedirect = async (adminOnly = false) => {
        const jwt = request.cookies.get('jwtUNAPAM')
        const payload = await verifyToken(jwt?.value ?? "")
        if (!payload || (adminOnly && (payload.role !== 'Admin' && payload.role !== 'User'))) {
            return NextResponse.redirect(new URL("/", url))
        }
        return NextResponse.next()
    }
    if (unprotectedPaths.some(pathIn)) {return NextResponse.next()}
    // if (publicPaths.some(pathIn)) return verifyAndRedirect()
    if (adminClientPaths.some(pathIn)) return verifyAndRedirect(true)
    if (url.pathname.startsWith('/api') /*&& !publicPaths.some(pathIn)*/    ) return verifyAndRedirect(true)

    return NextResponse.next()
}
export const config = {
    matcher: "/:path*",
};