import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const participantHealth = await prisma.participantHealth.findMany({});
        return NextResponse.json(participantHealth, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}



export async function POST(req: NextRequest){
    try {

       const participantHealth = await req.json();

       const data = await  prisma.$transaction(async (prisma) => {
            const newParticipantHealth = await prisma.participantHealth.create({
                data:{
                    bloodType: participantHealth.bloodType,
                    participantId: participantHealth.participantId,
                }
            });
            
            const medicenes =  await Promise.all( participantHealth.participantMedicines.map(async (medicine:any) => {
                return await prisma.participantMedicine.create({
                    data:{
                        medicine: medicine.medicine,
                        description: medicine.description,
                        participantHealthId: newParticipantHealth.id
                    }
                });
            }));
            

            const diseases =  await Promise.all( participantHealth.participantDisseases.map(async (disease:any) => {
                return  prisma.participantDissease.create({
                    data:{
                        disease: disease.disease,
                        description: disease.description,
                        participantHealthId: newParticipantHealth.id
                    }
                });
            }));

            const contactOne =  await prisma.referenceContact.create({
                data:{
                    firstName: participantHealth.contactOne.firstName,
                    firstSurname: participantHealth.contactOne.firstSurname,
                    secondSurname: participantHealth.contactOne.secondSurname,
                    phoneNumber: participantHealth.contactOne.phoneNumber,
                    relationship: participantHealth.contactOne.relationship,
                    participantId: participantHealth.participantId
                }
            });

            const contactTwo =  await prisma.referenceContact.create({
                data:{
                    firstName: participantHealth.contactTwo.firstName,
                    firstSurname: participantHealth.contactTwo.firstSurname,
                    secondSurname: participantHealth.contactTwo.secondSurname,
                    phoneNumber: participantHealth.contactTwo.phoneNumber,
                    relationship: participantHealth.contactTwo.relationship,
                    participantId: participantHealth.participantId
                }
            });

            return  {
                ...newParticipantHealth,
                participantMedicines: medicenes,
                participantDisseases: diseases,
                contactOne: contactOne,
                contactTwo: contactTwo
            }
    });
       

       return NextResponse.json(data, {status: 201})
    } catch (error) {
        console.log(error);
        return NextResponse.json(error, { status: 500 });
    }
}