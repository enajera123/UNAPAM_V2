import { SignJWT } from 'jose';
import { NextRequest, NextResponse } from "next/server";
import { User } from '@prisma/client';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest) {
    try {
        const { ...body } = await req.json() as User
        console.log("body")
        const user = await prisma.user.findFirst({
            where: {
                AND: [
                    { identification: body.identification },
                    { password: body.password }
                ]
            }
        })
        if (user) {
            const token = await signToken(user)
            return NextResponse.json({ ...token }, { status: 200 })
        }
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: error }, { status: 500 })
    }
}

async function signToken(user: User) {
    const JWT_SECRET = process.env.JWT_SECRET;
    const jwt = new SignJWT(user)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('5h')
        .sign(new TextEncoder().encode(JWT_SECRET));
    const userToken = {
        user: user,
        token: await jwt
    }

    return userToken;
}