import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterCourseNumber } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterCourseNumber) {
  try {
    const fetchedCourseNumber = params.courseNumber;

    const course = await prisma.course.findMany({
      where: {
        courseNumber: fetchedCourseNumber,
      },
    });

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
