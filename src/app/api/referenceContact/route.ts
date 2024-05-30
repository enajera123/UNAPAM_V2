import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const referenceContacts = await prisma.referenceContact.findMany({});
        return NextResponse.json(referenceContacts, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}


export async function POST(req: NextRequest, res: NextResponse){
    try {
        const referenceContactData = await req.json();
        const newReferenceContact = await prisma.referenceContact.create({
            data: {
                ...referenceContactData, 
            },
        });
        return NextResponse.json(newReferenceContact, { status: 201 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
