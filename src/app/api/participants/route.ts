import { delete_image_firebase, upload_image } from "@/firebase/fileMethod";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const participants = await prisma.participant.findMany({
        });
        return NextResponse.json(participants, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}



export async function POST(req: NextRequest, res: NextResponse) {
    let image_url = null
    try {
        const participant = await req.json();
       
        const refactorData = {
            ...participant,
            photo: image_url
        } 
         //Se quitan variables que no se usan al crear el objeto
        const photoExtension =refactorData.photoExtension
        const photoFile = refactorData.photoFile  
        delete refactorData.photoExtension
        delete refactorData.photoFile

        const newParticipant = await prisma.participant.create({
            data: {
                ...refactorData,
                photo: image_url
            }
        });

        if(photoFile && photoExtension && newParticipant.id){
            image_url = await upload_image(participant.photoFile, participant.photoExtension, `profile-photos/${newParticipant.id}`)
        }
       if(image_url){
           await prisma.participant.update({
                where:{
                    id:newParticipant.id
                },
                data:{
                    photo:image_url
                }
            })
       }

        return NextResponse.json({...newParticipant,photo:image_url}, { status: 201 })
    } catch (error) {
        if(image_url){
            delete_image_firebase(image_url)
        }
        return NextResponse.json(error, { status: 500 });
    }
}