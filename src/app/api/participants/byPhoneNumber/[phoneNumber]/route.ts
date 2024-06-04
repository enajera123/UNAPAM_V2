import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterPhoneNumber } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterPhoneNumber) {

    try {
        const phoneNumber = params.phoneNumber;
      
        const participant = await prisma.participant.findFirst({
            where: {
                phoneNumber: phoneNumber,
            },
        });

        return NextResponse.json(participant, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}