import prisma from "@/lib/prisma";
import { ParameterParticipantHealthId } from "@/types/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: ParameterParticipantHealthId) {

    try {
        const fetchedParticipantId = parseInt(params.participantHealthId);
      
        const participantMedicine = await prisma.participantMedicine.findMany({
            where: {
                participantHealthId: fetchedParticipantId,
            },
        });

        return NextResponse.json(participantMedicine, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}