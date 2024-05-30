import { Participant } from './../../../../../../node_modules/.prisma/client/index.d';
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterFirstName } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterFirstName) {

    try {
        const fetchedName = params.firstName;
      
        const Participant = await prisma.participant.findMany({
            where: {
                firstName: fetchedName,
            },
        });

        return NextResponse.json(Participant, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}