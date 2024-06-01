import { UploadMetadata, deleteObject, getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/firebase/config';
import firebase from 'firebase/compat/app';


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

export const delete_image_firebase = async(path:string)=>{
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
}

export const upload_file= async (file:Uint8Array,file_type:string,path:string)=>{
    const storageRef = firebase.storage().ref(`${path}`);
    const metadata = {
      contentType: file_type
    };
  
    return await storageRef.put(file, metadata)
      .then(() => {
        console.log('Archivo subido correctamente!');
        return true
      })
      .catch((error) => {
        console.error('Error al subir el archivo:', error);
        return false
      });
}