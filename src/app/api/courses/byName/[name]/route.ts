import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterName } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterName) {
  try {
    const fetchedName = params.name;

    const course = await prisma.course.findMany({
      where: {
        name: fetchedName,
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
