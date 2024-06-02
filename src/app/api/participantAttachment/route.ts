import { delete_file_firebase, upload_file } from "@/firebase/fileMethod";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const participantAttachment = await prisma.participantAttachment.findMany({});
        return NextResponse.json(participantAttachment, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    let  filePath = null
    const participantAttachmentData = await req.json();
    try { 
        filePath = await upload_file(participantAttachmentData.attachmentFile.file_file,
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
        if(filePath){
            delete_file_firebase(`attachments/user_${participantAttachmentData.participant.id}/${participantAttachmentData.attachmentFile.file_name}`)
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
