import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterDisease } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterDisease) {

    try {
        const fetchedDisease = params.disease;
      
        const Participant = await prisma.participantDissease.findMany({
            where: {
                disease: fetchedDisease,
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