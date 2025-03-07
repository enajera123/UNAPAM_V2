import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterId } from "@/types/api";
import { Course } from "@/types/prisma";
export async function PUT(req: NextRequest, { params }: ParameterId) {
    try {
        const fetchedId = parseInt(params.id);
        const { participantsOnCourses, id, ...course } = await req.json() as Course;
        const response = await prisma.course.update({
            where: {
                id: fetchedId,
            },
            data: {
                ...course,
            },
        });

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
export async function DELETE(req: NextRequest, { params }: ParameterId) {
    try {
        const fetchedId = parseInt(params.id);
        const response = await prisma.course.delete({
            where: {
                id: fetchedId,
            },
        });

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
export async function GET(req: NextRequest, { params }: ParameterId) {
    try {
        const fetchedId = parseInt(params.id);
        const course = await prisma.course.findUnique({
            where: {
                id: fetchedId,
            },
            include: {
                participantsOnCourses: {
                    include: {
                        participants: true
                    }
                }

            }
        });

        return NextResponse.json(course, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
