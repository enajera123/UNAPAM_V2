import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest,res: NextResponse) {
    try {

        const user = await req.json();

        const existingUser = await prisma.user.findFirst({
            where: {
                email: user.email
            },
        });

        if (!existingUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const passwordMatch = await bcrypt.compare( user.password,existingUser.password);

        if (!passwordMatch) {
            return NextResponse.json({ error: "Incorrect credentials" }, { status: 401 });
        }
        const {password, ...userDatas} = existingUser as {
            password:string;
        }
        return NextResponse.json(userDatas, { status: 200 });
    } catch (error) {
        console.error("Error while logging in:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
