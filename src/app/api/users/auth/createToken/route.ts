import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { serialize } from "cookie";

export async function POST(req: NextRequest, _res: NextResponse) {
    try {
        const body = await req.json();
        const { identification, role } = body;
        const encoder = new TextEncoder();
        const jwt = await new SignJWT({ identification, role })
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("1d")
            .sign(encoder.encode(process.env.JWT_SECRET));

        const serializedToken = serialize("jwtUNAPAM", jwt, {
            // httpOnly: true,
            sameSite: "strict",
            path: "/",
            maxAge: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
        });

        const response = new NextResponse("Login succesfully", { status: 201 });
        response.headers.set("Set-Cookie", serializedToken);
        console.log(serializedToken)
        return response;

    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}