import prisma from "@/lib/prisma";
import { ParameterId } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: ParameterId) {
    try {
        const { password } = await req.json();
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(params.id),
            }
        });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(params.id),
            },
            data: {
                password,
                isPasswordChanged: 'No'
            }
        });
        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}