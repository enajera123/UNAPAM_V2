import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const courses = await prisma.course.findMany({
            include: {
                participantsOnCourses: true
            }
        });
        return NextResponse.json(courses, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}



export async function POST(req: NextRequest, res: NextResponse) {
    try {

        const course = await req.json();
        console.log(course)
        const newCourse = await prisma.course.create({
            data: {
                ...course
            }
        });
        return NextResponse.json(newCourse, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status: 500 });
    }
}