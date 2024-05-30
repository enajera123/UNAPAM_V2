import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterParticipantId } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterParticipantId) {

    try {
        const fetchedParticipantId = parseInt(params.participantId);
      
        const participantOnCourse = await prisma.participantOnCourse.findMany({
            where: {
                participantId: fetchedParticipantId,
            },
        });

        return NextResponse.json(participantOnCourse, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}