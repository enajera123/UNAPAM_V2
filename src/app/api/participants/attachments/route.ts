import prisma from "@/lib/prisma";
import { upload_file } from "@/firebase/fileMethod"

export async  function POST(req:Request){

    const {file, fileName,email,file_type} =  await req.json() as {file:string,fileName:string,email:string,file_type:string}
    const emailFormat = email.replace('.','').replace('@','').replace('#','')
    const path =  `${emailFormat}/${fileName}`
    const fileBuffer= Buffer.from(file, 'base64')
    const attachmentFile = await upload_file(fileBuffer,file_type,path)

    
}

