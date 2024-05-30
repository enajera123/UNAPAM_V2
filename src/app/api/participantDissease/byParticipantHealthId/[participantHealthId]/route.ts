import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterParticipantHealthId } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterParticipantHealthId) {

    try {
        const fetchedParticipantHealthId = parseInt(params.participantHealthId);
      
        const participantDissease = await prisma.participantDissease.findMany({
            where: {
                participantHealthId: fetchedParticipantHealthId
            },
        });

        return NextResponse.json(participantDissease, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}