import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const participantHealth = await prisma.participantHealth.findMany({});
        return NextResponse.json(participantHealth, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}



export async function POST(req: NextRequest, res: NextResponse){
    try {

       const participantHealth = await req.json();

        const newParticipantHealth = await prisma.participantHealth.create({
            data:{
                ...participantHealth
            }
        });
       return NextResponse.json(newParticipantHealth, {status: 201})
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}