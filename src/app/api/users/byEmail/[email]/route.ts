import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterEmail } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterEmail) {
    try {
        const fetchedEmail = params.email;

        const user = await prisma.user.findUnique({
            where: {
                email: fetchedEmail
            }
        });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}