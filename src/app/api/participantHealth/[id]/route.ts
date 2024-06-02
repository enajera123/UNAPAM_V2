import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterId } from "@/types/api";
import { ParticipantDissease, ParticipantMedicine } from "@prisma/client";

export async function PUT(req: NextRequest, { params }: ParameterId) {
    try {
        const fetchedId = parseInt(params.id);
        const participantHealth = await req.json();

        const data = await prisma.$transaction(async (prisma) => {
            const response = await prisma.participantHealth.update({
                where: {
                    id: fetchedId,
                },
                data: {
                    bloodType: participantHealth.bloodType,                
                },
            });

            const diseases = await Promise.all(
                participantHealth.participantDisseases.map(async (disease: ParticipantDissease) => {
                    if (disease.id) {
                        return await prisma.participantDissease.update({
                            where: {
                                id: disease.id,
                            },
                            data: {
                                disease: disease.disease,
                                description: disease.description,
                            },
                        });
                    } else {
                        return await prisma.participantDissease.create({
                            data: {
                                disease: disease.disease,
                                description: disease.description,
                                participantHealthId: fetchedId,
                            },
                        });
                    }
                })
            );

            const medicine = await Promise.all(
                participantHealth.participantMedicines.map(async (medicine:ParticipantMedicine) => {
                    if (medicine.id) {
                        return await prisma.participantMedicine.update({
                            where: {
                                id: medicine.id,
                            },
                            data: {
                                medicine: medicine.medicine,
                                description: medicine.description,
                            },
                        });
                    } else {
                        return await prisma.participantMedicine.create({
                            data: {
                                medicine: medicine.medicine,
                                description: medicine.description,
                                participantHealthId: fetchedId,
                            },
                        });
                    }
                })
            );

            const contactOne = await prisma.referenceContact.update({
                where: {
                    id: participantHealth.contactOne.id,
                },
                data: {
                    firstName: participantHealth.contactOne.firstName,
                    firstSurname: participantHealth.contactOne.firstSurname,
                    secondSurname: participantHealth.contactOne.secondSurname,
                    phoneNumber: participantHealth.contactOne.phoneNumber,
                    relationship: participantHealth.contactOne.relationship,
                },
            });

            const contactTwo = await prisma.referenceContact.update({
                where: {
                    id: participantHealth.contactTwo.id,
                },
                data: {
                    firstName: participantHealth.contactTwo.firstName,
                    firstSurname: participantHealth.contactTwo.firstSurname,
                    secondSurname: participantHealth.contactTwo.secondSurname,
                    phoneNumber: participantHealth.contactTwo.phoneNumber,
                    relationship: participantHealth.contactTwo.relationship,
                },
            });

            return {
                ...response,
                participantDisseases: diseases,
                participantMedicines: medicine,
                contactOne: contactOne,
                contactTwo: contactTwo,
            };
    });
        
            

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
export async function DELETE(req: NextRequest, { params }: ParameterId) {
    try {
        const fetchedId = parseInt(params.id);
        const response = await prisma.participantHealth.delete({
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
        const user = await prisma.participantHealth.findUnique({
            where: {
                id: fetchedId,
            },
        });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
