import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterBloodType } from "@/types/api";

export async function GET(req: NextRequest, { params }: ParameterBloodType) {
  try {
    const fetchedBloodType = params.bloodType;

    const participantHealth = await prisma.participantHealth.findMany({
      where: {
        bloodType: fetchedBloodType,
      },
    });

    return NextResponse.json(participantHealth, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
