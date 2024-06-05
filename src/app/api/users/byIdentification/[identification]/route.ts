import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterIdentification } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterIdentification) {
    try {
        const fetchedIdentification = params.identification;

        const user = await prisma.user.findFirst({
            where: {
                identification: fetchedIdentification
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