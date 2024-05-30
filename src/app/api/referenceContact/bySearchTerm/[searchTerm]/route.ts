import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { searchTerm } }: { params: { searchTerm?: string } }) {
    try {
        if (!searchTerm) {
            return NextResponse.json({ error: "Search term is required" }, { status: 400 });
        }

        const contacts = await prisma.referenceContact.findMany({
            where: {
                OR: [
                    { firstName: { contains: searchTerm } },
                    { firstSurname: { contains: searchTerm } },
                    { secondSurname: { contains: searchTerm } },
                    { phoneNumber: { contains: searchTerm } },
                ],
            },
        });

        if (!contacts || contacts.length === 0) {
            return NextResponse.json({ error: "No contacts found" }, { status: 404 });
        }

        return NextResponse.json(contacts, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
