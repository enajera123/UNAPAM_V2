import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ParameterId } from "@/types/api";
import { ParticipantDissease, ParticipantMedicine } from "@prisma/client";
export async function PUT(req: NextRequest, { params }: ParameterId) {
    try {
        const fetchedId = parseInt(params.id);
        const participantHealth = await req.json();

        const updatedHealth = await prisma.participantHealth.update({
            where: { id: fetchedId },
            data: { bloodType: participantHealth.bloodType },
        });
        const diseasePromises = participantHealth.participantDisseases.map((disease: ParticipantDissease) =>
            prisma.participantDissease.upsert({
                where: { id: disease.id || 0 }, // Si no tiene ID, siempre crea
                update: { disease: disease.disease, description: disease.description },
                create: {
                    disease: disease.disease,
                    description: disease.description,
                    participantHealthId: fetchedId
                },
            })
        );

        // Manejar medicamentos en paralelo
        const medicinePromises = participantHealth.participantMedicines.map((medicine: ParticipantMedicine) =>
            prisma.participantMedicine.upsert({
                where: { id: medicine.id || 0 },
                update: { medicine: medicine.medicine, description: medicine.description },
                create: {
                    medicine: medicine.medicine,
                    description: medicine.description,
                    participantHealthId: fetchedId
                },
            })
        );

        // Manejar contactos en paralelo
        const contactPromises = [
            prisma.referenceContact.update({
                where: { id: participantHealth.contactOne.id },
                data: { ...participantHealth.contactOne },
            }),
            prisma.referenceContact.update({
                where: { id: participantHealth.contactTwo.id },
                data: { ...participantHealth.contactTwo },
            }),
        ];

        // Ejecutar todas las promesas en paralelo
        const [updatedDiseases, updatedMedicines, contactOne, contactTwo] = await Promise.all([
            Promise.all(diseasePromises),
            Promise.all(medicinePromises),
            ...contactPromises,
        ]);

        return NextResponse.json(
            {
                ...updatedHealth,
                participantDisseases: updatedDiseases,
                participantMedicines: updatedMedicines,
                contactOne,
                contactTwo,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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
