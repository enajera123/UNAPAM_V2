import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const users = await prisma.user.findMany({});

        const userData = users.map(({ password, ...user }) => user);

        return NextResponse.json(userData, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}


export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const user = await req.json();
        const existingUser = await prisma.user.findFirst({
            where: {
                email: user.email
            }
        });

        if (existingUser) {
            return NextResponse.json({ error: "Email already in use" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(user.password, 10); 
        console.log(user)
        const newUser = await prisma.user.create({
            data: {
                ...user,
                password: hashedPassword 
            }
        });
        const { password, ...userData } =  newUser as {
            password: string;
        }
        return NextResponse.json(userData, { status: 201 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}