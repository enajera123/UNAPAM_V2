import { UploadMetadata, deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/firebase/config';


export const upload_image=async(file:string,image_extension:string,path:string)=>{
    try {
        const file_image= Buffer.from(file, 'base64')
        const metadata:UploadMetadata={
                contentType:`image/${image_extension}`
        }
        const storageRef= ref(storage, path)
        await uploadBytes(storageRef, file_image, metadata)
        return await getDownloadURL(storageRef)
    } catch (error) {
        throw error
    }
}

export const delete_file_firebase = async(path:string)=>{
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
}

export const upload_file= async (file:string,file_type:string,path:string)=>{
    const storageRef= ref(storage, path)
    const file_buffer= Buffer.from(file, 'base64')
    const metadata = {
      contentType: file_type
    };
    await uploadBytes(storageRef, file_buffer, metadata)
    return await getDownloadURL(storageRef)
}