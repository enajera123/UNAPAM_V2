import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterId } from "@/types/api";
export async function PUT(req: NextRequest, { params }: ParameterId) {
    try {
        const fetchedId = parseInt(params.id);
        const participant = await req.json();
        const { Policy } = participant
        const [updatedParticipant, policy] = await prisma.$transaction([
            prisma.participant.update({
                where: {
                    id: fetchedId,
                },
                data: {
                    ...participant,
                    Policy: {
                        update: {
                            ...Policy,
                        },
                    },
                },
                include: {
                    Policy: true,
                    MedicalReport: true,
                    ParticipantAttachments: true,
                    ParticipantHealths: true,
                    ParticipantsOnCourses: true,
                    ReferenceContacts: true,
                }
            }),
            prisma.policy.upsert({
                where: {
                    id: fetchedId,
                },
                update: {
                    ...Policy,
                },
                create: {
                    ...Policy,
                    id: fetchedId,
                },
            }),
        ]);
        updatedParticipant.Policy = policy;
        console.log(updatedParticipant)

        return NextResponse.json(updatedParticipant, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
export async function DELETE(req: NextRequest, { params }: ParameterId) {
    try {
        const fetchedId = parseInt(params.id);
        const response = await prisma.participant.delete({
            where: {
                id: fetchedId,
            },
        });

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
export async function GET(req: NextRequest, { params }: ParameterId) {
    try {
        const fetchedId = parseInt(params.id);
        const participant = await prisma.participant.findUnique({
            where: {
                id: fetchedId,
            },
            include: {
                Policy: true,
                MedicalReport: true,
                ParticipantAttachments: true,
                ParticipantHealths: true,
                ParticipantsOnCourses: true,
                ReferenceContacts: true,
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
