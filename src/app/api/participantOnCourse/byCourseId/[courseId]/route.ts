import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterCourseId } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterCourseId) {

    try {
        const fetchedCourseId = parseInt(params.courseId);
      
        const participantOnCourse = await prisma.participantOnCourse.findMany({
            where: {
                courseId: fetchedCourseId,
            },
        });

        return NextResponse.json(participantOnCourse, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}