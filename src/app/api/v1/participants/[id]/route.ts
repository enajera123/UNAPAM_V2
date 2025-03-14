import { delete_file_firebase, upload_image } from "@/firebase/fileMethod";
import prisma from "@/lib/prisma";
import { ParameterId } from "@/types/api";
import { Participant } from "@/types/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: ParameterId) {
    try {
        const fetchedId = parseInt(params.id);
        const { photoFile, photoExtension, photo, id, participantAttachments, participantsOnCourses, participantHealths, ...values } = await req.json() as Participant;
        let image_url = photo
        if (photoFile && photoExtension && id) {
            if (image_url) await delete_file_firebase(`profile-photos/${id}`)
            image_url = await upload_image(photoFile, photoExtension, `profile-photos/${id}`)
        }
        const participantUpdated = await prisma.participant.update({
            where: {
                id: fetchedId,
            },
            data: {
                ...values as any,
                photo: image_url
            },
            include: {
                participantAttachments: true,
                participantHealths: true,
                participantsOnCourses: true,
                referenceContacts: true,
            }
        });
        return NextResponse.json(participantUpdated, { status: 200 });
    } catch (error) {
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
                participantAttachments: true,
                participantHealths: {
                    include: {
                        participantDisseases: true,
                        participantMedicines: true,
                    }

                },
                participantsOnCourses: true,
                referenceContacts: true,
            }
        });
        return NextResponse.json(participant, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
