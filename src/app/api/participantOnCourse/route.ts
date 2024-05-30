import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const participantOnCourse = await prisma.participantOnCourse.findMany({});
        return NextResponse.json(participantOnCourse, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}



export async function POST(req: NextRequest, res: NextResponse){
    try {

       const participantOnCourse = await req.json();

        const newParticipantOnCourse = await prisma.participantOnCourse.create({
            data:{
                ...participantOnCourse
            }
        });
       return NextResponse.json(newParticipantOnCourse, {status: 201})
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}