import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterMedicine, ParameterParticipantId } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterMedicine) {

    try {
        const fetchedMedicine= params.medicine;
      
        const participantMedicine = await prisma.participantMedicine.findMany({
            where: {
                medicine: fetchedMedicine,
            },
        });

        return NextResponse.json(participantMedicine, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}