import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const participantMedicine = await prisma.participantMedicine.findMany({});
        return NextResponse.json(participantMedicine, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const participantMedicineData = await req.json();
        const newParticipantMedicine = await prisma.participantMedicine.create({
            data: {
                ...participantMedicineData
            }
        });
        return NextResponse.json(newParticipantMedicine, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
