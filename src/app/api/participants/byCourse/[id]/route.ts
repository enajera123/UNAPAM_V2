import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterId } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterId) {
    try {
        const fetchedId = parseInt(params.id);
        const participant = await prisma.participant.findMany({
            where: {
                participantsOnCourses: {
                    some: {
                        courseId: fetchedId
                    }
                }
            },
            // include: {
            //     participantAttachments: true,
            //     participantHealths: true,
            //     participantsOnCourses: true,
            //     referenceContacts: true,
            // }
        });

        return NextResponse.json(participant, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
