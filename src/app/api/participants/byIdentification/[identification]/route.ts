import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterIdentification } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterIdentification) {

    try {
        const fetchedIdentification = params.identification;
      
        const participant = await prisma.participant.findMany({
            where: {
                identification: fetchedIdentification,
            },
        });

        return NextResponse.json(participant, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}