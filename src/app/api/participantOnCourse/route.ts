import prisma from "@/lib/prisma";
import { ParticipantOnCourse, StateParticipantOnCourse } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const participantOnCourse = await prisma.participantOnCourse.findMany({});
        return NextResponse.json(participantOnCourse, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { ...body } = await req.json() as ParticipantOnCourse;
        const course = await prisma.course.findFirst({
            where: {
                id: body.courseId,
            },
            include: {
                participantsOnCourses: true
            }
        });
        console.log(course?.quota, course?.participantsOnCourses.length && body.state == StateParticipantOnCourse.Registered)
        if ((course?.quota ?? 0) <= (course?.participantsOnCourses.filter(participant => participant.state === StateParticipantOnCourse.Registered)?.length ?? 0) && body.state == StateParticipantOnCourse.Registered) {
            return NextResponse.json({ message: "No hay cupos disponibles" }, { status: 400 })
        }
        const newParticipantOnCourse = await prisma.participantOnCourse.create({
            data: {
                ...body
            }
        });
        return NextResponse.json(newParticipantOnCourse, { status: 201 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { participantId, courseId, state } = await req.json();

        const course = await prisma.course.findFirst({
            where: {
                id: courseId,
            },
            include: {
                participantsOnCourses: true
            }
        });
        console.log(course?.quota, course?.participantsOnCourses.length)

        if ((course?.quota ?? 0) <= (course?.participantsOnCourses.filter(participant => participant.state === StateParticipantOnCourse.Registered)?.length ?? 0) && state == StateParticipantOnCourse.Registered) {
            return NextResponse.json({ message: "No hay cupos disponibles" }, { status: 400 })
        }
        const newParticipantOnCourse = await prisma.participantOnCourse.update({
            where: {
                participantId_courseId: {
                    participantId, courseId
                }
            },
            data: {
                state: state
            }
        });
        return NextResponse.json(newParticipantOnCourse, { status: 201 })
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}