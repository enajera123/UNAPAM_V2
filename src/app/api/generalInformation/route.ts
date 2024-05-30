import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const generalInformations = await prisma.generalInformation.findMany({});
        return NextResponse.json(generalInformations, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function POST(req: NextRequest, res: NextResponse){
    try {
        const information = await req.json();
        const newInformation = await prisma.generalInformation.create({
            data: {
               ...information,
            },
        });
        return NextResponse.json(newInformation, { status: 201 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
