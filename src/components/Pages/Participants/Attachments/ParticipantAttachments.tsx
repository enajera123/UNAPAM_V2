import Button from "@/components/Button/Button";
import { DefaultExtension, ImageExtension, PdfExtension } from "@/components/Icons/Icons";
import Table from "@/components/Table/Table";
import { useParticipantAttachmentStore } from "@/store/participantAttachmentStore";
import { Participant, ParticipantAttachment } from "@/types/prisma";
import { errorAlert, successAlert } from '@/utils/sweetAlert';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ParticipantAttachmentTable from "./ParticipantAttachmentTable";
import { BsArrowLeft } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
export default function Attachments({ participant }: { participant: Participant | null }) {

  const router = useRouter()
  const headersFiles = ['Nombre', 'Tipo', "Enlace"];
  const [files, setFiles] = useState<ParticipantAttachment[]>([])
  const { postParticipantAttachment, deleteParticipantAttachment } = useParticipantAttachmentStore()
  const iconsExtension = {
    "pdf": <PdfExtension />,
    "png": <ImageExtension />,
    "jpeg": <ImageExtension />,
    "jpg": <ImageExtension />,
    "svg": <ImageExtension />,
    "gif": <ImageExtension />,
    "webp": <ImageExtension />,
  } as { [key: string]: JSX.Element }

  const anchorFileDownload = (file: string, name: string, type: string, show: boolean) => {
    return show ? <a href={file} target="_blank" download={`${name}.${type}`}>Ver Archivo</a> : <p>Archivo en proceso </p>
  }

  const handleSetFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file = null
    if (event.target && event.target.files) {
      file = event.target.files[0]
    }
    if (file != null) {
      const reader = new FileReader();
      reader.onload = (item) => {
        if (item.target && item.target.result) {
          const base64String = item.target.result.toString()
            .replace("data:", "")
            .replace(/^.+,/, "");
          const f = [
            {
              name: file.name.split(".")[0],
              participantId: participant?.id!,
              attachmentFile: {
                file_name: file.name.split(".")[0],
                file_extension: file.type!,
                file_icon: iconsExtension[file.type!.split("/")[1]] || <DefaultExtension /> as JSX.Element,
                file_file: base64String,
                file_anchor: anchorFileDownload('', '', '', false)
              },
              participant: participant!
            },
            ...files
          ]
          setFiles((i) => (f));
        };
      }
      reader.readAsDataURL(file);
    }
  }


  const deleteFile = async (participantAttachment: ParticipantAttachment) => {
    if (participantAttachment?.id) {
      await deleteParticipantAttachment(participantAttachment.id)
    }
    const newList = files.filter(i => i.name !== participantAttachment.name)
    setFiles(newList)
    successAlert("Archivo eliminado exitosamente")
  }

  const saveFile = async (participantAttachment: ParticipantAttachment) => {
    delete participantAttachment.attachmentFile.file_icon
    delete participantAttachment.attachmentFile.file_anchor
    const result = refactorAttachmentFile(await postParticipantAttachment(participantAttachment))
    if (result) {
      const updatedList = files.filter(i => i.name !== participantAttachment?.name || i.id !== participantAttachment?.id)
      setFiles([...updatedList, {
        ...result,
        attachmentFile: {
          ...result.attachmentFile,
          file_icon: iconsExtension[result.type!] || <DefaultExtension /> as JSX.Element,
          file_anchor: anchorFileDownload(result.attachmentFile.file_file as string, result.name, result.attachmentFile.file_extension as string, true)
        }
      }])
      successAlert("Archivo guardado exitosamente")
    } else {
      errorAlert("Error al guardar el archivo")
    }
  }


  const refactorAttachmentFile = (attachment: ParticipantAttachment | null) => {
    if (attachment) {
      return {
        id: attachment.id,
        name: attachment.name,
        participantId: participant?.id!,
        attachmentFile: {
          file_name: attachment.name,
          file_extension: attachment.type,
          file_file: attachment.attachmentFile
        },
      } as ParticipantAttachment
    }
  }

  useEffect(() => {
    if (participant?.participantAttachments) {
      const refactorAttachments = participant?.participantAttachments.map((attachment) => ({
        ...refactorAttachmentFile(attachment),
        attachmentFile: {
          ...refactorAttachmentFile(attachment)?.attachmentFile,
          file_icon: iconsExtension[attachment.type!] || <DefaultExtension /> as JSX.Element,
          file_anchor: anchorFileDownload(attachment.attachmentFile as string, attachment.name, attachment.type!, true)
        }
      })) as ParticipantAttachment[]
      setFiles(refactorAttachments)
    }
  }, [])

  return (
    <div className="container mx-auto bg-gray-gradient p-10 h-auto max-w-6xl my-4 rounded-md gap-4 relative">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => router.push(`/admin/participantRegister/${participant?.id}`)
          }
          className="flex text-sm items-center gap-2 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-[#575252] transition-all duration-300"
        >
          <FaArrowLeft size={18} />
          <span>Volver</span>
        </button>
      </div>
      <p className="text-3xl font-bold text-white flex justify-center">Documentos Adjuntos</p>
      <div className='mt-6'>
        <ParticipantAttachmentTable deleteFile={deleteFile} saveFile={saveFile} filteredData={files!} />
      </div>
      <div className='flex justify-center'>
        <div className="flex justify-center items-center gap-3 mt-3 bg-red-gradient w-1/4 rounded-xl">
          <span className="font-bold text-white text-sm">Agregar</span>
          <label htmlFor={`image`} className={`flex items-center justify-center z-30 size-10 cursor-pointer`} onClick={(e) => e.stopPropagation()}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16C15.4477 18 15 18.4477 15 19C15 19.5523 15.4477 20 16 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H8C8.55228 20 9 19.5523 9 19C9 18.4477 8.55228 18 8 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM15.7071 13.2929L12.7071 10.2929C12.3166 9.90237 11.6834 9.90237 11.2929 10.2929L8.29289 13.2929C7.90237 13.6834 7.90237 14.3166 8.29289 14.7071C8.68342 15.0976 9.31658 15.0976 9.70711 14.7071L11 13.4142V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13.4142L14.2929 14.7071C14.6834 15.0976 15.3166 15.0976 15.7071 14.7071C16.0976 14.3166 16.0976 13.6834 15.7071 13.2929Z" fill="#ffff"></path>
              </g>
            </svg>
          </label>
          <input id={`image`} type="file" name="File" className="hidden" onChange={handleSetFiles} onClick={(e) => e.stopPropagation()} />
        </div>
      </div>
    </div>
  );
}