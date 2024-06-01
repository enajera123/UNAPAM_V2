import { upload_image } from "@/firebase/fileMethod";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const participants = await prisma.participant.findMany({
        });
        return NextResponse.json(participants, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}



export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const participant = await req.json();
        let image_url = null
        if(participant.photoFile && participant.photoExtension && participant.email){
            image_url = await upload_image(participant.photoFile, participant.photoExtension, `profile-photos/${participant.email}`)
         }
        const newParticipant = await prisma.participant.create({
            data: {
                ...participant,
                photo: image_url
            }
        });
        return NextResponse.json(newParticipant, { status: 201 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}