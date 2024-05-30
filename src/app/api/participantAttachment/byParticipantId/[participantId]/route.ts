import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterParticipantId } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterParticipantId) {

    try {
        const fetchedParticipantId = parseInt(params.participantId);
      
        const participantAttachment = await prisma.participantAttachment.findMany({
            where: {
                participantId: fetchedParticipantId,
            },
        });

        return NextResponse.json(participantAttachment, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}