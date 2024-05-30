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
        console.log(participant)
        const newParticipant = await prisma.participant.create({
            data: {
                ...participant,
            }
        });
        return NextResponse.json(newParticipant, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status: 500 });
    }
}