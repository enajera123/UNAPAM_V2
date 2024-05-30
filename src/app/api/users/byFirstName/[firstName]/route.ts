import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterFirstName } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterFirstName) {

    try {
        const fetchedName = params.firstName;
      
        const users = await prisma.user.findMany({
            where: {
                firstName: fetchedName,
            },
        });

        const userData = users.map(({ password, ...user }) => user);

        return NextResponse.json(userData, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}