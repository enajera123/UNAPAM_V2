import { upload_file } from "@/firebase/fileMethod";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const participantAttachment = await prisma.participantAttachment.findMany({});
        return NextResponse.json(participantAttachment, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const participantAttachmentData = await req.json();
        const filePath = await upload_file(participantAttachmentData.attachmentFile.file_file,
                                          participantAttachmentData.attachmentFile.file_extension,
                                         `attachments/user_${participantAttachmentData.participant.id}/${participantAttachmentData.attachmentFile.file_name}`)
        const refactorData = {
            name:participantAttachmentData.attachmentFile.file_name,
            attachmentFile:filePath,
            type:participantAttachmentData.attachmentFile.file_extension.split("/")[1],
            participant:{
                connect:{
                    id:participantAttachmentData.participant.id
                }
            }
        }
        const newParticipantAttachment = await prisma.participantAttachment.create({
            data: {
                ...refactorData
            }
        });
        return NextResponse.json(newParticipantAttachment, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
