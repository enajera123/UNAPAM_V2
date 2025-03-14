import { delete_file_firebase, upload_image } from "@/firebase/fileMethod";
import prisma from "@/lib/prisma";
import { Participant } from "@/types/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const participants = await prisma.participant.findMany({
            include: {
                participantsOnCourses: true
            }
        });
        return NextResponse.json(participants, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}



export async function POST(req: NextRequest, res: NextResponse) {
    let image_url = null
    try {
        const { photoFile, photoExtension, photo, id, participantAttachments, participantsOnCourses, participantHealths, ...values } = await req.json() as Participant;
        const newParticipant = await prisma.participant.create({
            data: {
                ...values as any,
                photo: image_url
            }
        });

        if (photoFile && photoExtension && newParticipant.id) {
            image_url = await upload_image(photoFile, photoExtension, `profile-photos/${newParticipant.id}`)
        }
        if (image_url) {
            await prisma.participant.update({
                where: {
                    id: newParticipant.id
                },
                data: {
                    photo: image_url
                }
            })
        }

        return NextResponse.json({ ...newParticipant, photo: image_url }, { status: 201 })
    } catch (error) {
        if (image_url) {
            delete_file_firebase(image_url)
        }
        console.log(error)
        return NextResponse.json(error, { status: 500 });
    }
}