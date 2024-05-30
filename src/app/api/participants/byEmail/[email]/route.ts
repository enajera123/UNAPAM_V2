import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterEmail } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterEmail) {

    try {
        const fetchedEmail = params.email;
      
        const Participant = await prisma.participant.findMany({
            where: {
                email: fetchedEmail,
            },
        });

        return NextResponse.json(Participant, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}