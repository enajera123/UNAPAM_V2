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
        const newParticipantAttachment = await prisma.participantAttachment.create({
            data: {
                ...participantAttachmentData
            }
        });
        return NextResponse.json(newParticipantAttachment, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
