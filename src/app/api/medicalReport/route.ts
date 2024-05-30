import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const medicalReports = await prisma.medicalReport.findMany({});
        return NextResponse.json(medicalReports, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}



export async function POST(req: NextRequest, res: NextResponse){
    try {

       const medicalReport = await req.json();

        const newmedicalReport = await prisma.medicalReport.create({
            data:{
                ...medicalReport
            }
        });
       return NextResponse.json(newmedicalReport, {status: 201})
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}