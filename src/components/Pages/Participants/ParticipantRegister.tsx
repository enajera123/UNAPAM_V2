"use client";
import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import Select from "@/components/Select/Select";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { GoPerson } from 'react-icons/go';
import { FiPhoneCall } from 'react-icons/fi';
import { RiGraduationCapLine, RiWhatsappLine } from 'react-icons/ri';
import { MdOutlineEmail } from 'react-icons/md';
import Checkbox from '@/components/Checkbox/Checkbox';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Grade, Participant, YesOrNo, TypeIdentification } from '@/types/prisma';
import { useParticipantsStore } from '@/store/participantsStore';
import { useRouter } from 'next/navigation';
import { errorAlert, successAlert } from '@/utils/sweetAlert';
import ProfileImage from "./ProfileImage/ProfileImage";
import useImageStore from "@/hooks/Stores/ImageStore/useImageStore";
const optionsScholarship = [
  { value: "Sin_Estudio", label: "Sin estudio" },
  { value: "Primaria_Completa", label: "Primaria completa" },
  { value: "Primaria_Incompleta", label: "Primaria incompleta" },
  { value: "Secundaria_Completa", label: "Secundaria completa" },
  { value: "Secundaria_Incompleta", label: "Secundaria incompleta" },
  { value: "Universidad_Incompleta", label: "Universidad completa" },
  { value: "Universidad_Completa", label: "Universidad incompleta" },
];
const optionsTypeIdentification = [
  { value: "Nacional", label: "Nacional" },
  { value: "DIMEX", label: "DIMEX" },
];
export default function ParticipantRegister({ participant }: { participant: Participant | null }) {
    const router = useRouter()
    const [hasMedicalInsurance, setHasMedicalInsurance] = useState(false)
    const [hasMedicalReport, setHasMedicalReport] = useState(false)
    const [identification, setIdentification] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [scholarship, setScholarship] = useState('Primaria_Completa')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [firstLastName, setFirstLastName] = useState('')
    const [secondLastName, setSecondLastName] = useState('')
    const [email, setEmail] = useState('')
    const [hasWhatsApp, setHasWhatsApp] = useState(false)
    const [expirationDateMedicalInsurance, setExpirationDateMedicalInsurance] = useState('')
    const [expirationDateMedicalReport, setExpirationDateMedicalReport] = useState('')
    const [typeIdentification, setTypeIdentification] = useState('Nacional')
    const { postParticipant, putParticipant } = useParticipantsStore()
    const {image,onChangeImage} = useImageStore()


    useEffect(() => {
        if (participant) {
            setIdentification(participant.identification)
            setBirthDate(participant.birthDate)
            setScholarship(participant.grade.toString())
            setName(participant.firstName)
            setPhone(participant.phoneNumber)
            setFirstLastName(participant.firstName)
            setSecondLastName(participant.secondSurname)
            setEmail(participant.email)
            setHasWhatsApp(participant.hasWhatsApp === "Yes" as unknown as YesOrNo)
            setHasMedicalInsurance(participant.expirationDateMedicalInsurance !== null)
            setHasMedicalReport(participant.expirationDateMedicalReport !== null)
            setTypeIdentification(participant.typeIdentification.toString())
            setExpirationDateMedicalInsurance(participant.expirationDateMedicalInsurance || '')
            setExpirationDateMedicalReport(participant.expirationDateMedicalReport || '')
        }
    }, [participant])
    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const newParticipant: Participant = {
            identification,
            hasWhatsApp: hasWhatsApp ? "Yes" as unknown as YesOrNo : "No" as unknown as YesOrNo,
            birthDate,
            grade: scholarship as unknown as Grade,
            firstName: name,
            phoneNumber: phone,
            firstSurname: firstLastName,
            secondSurname: secondLastName,
            email,
            typeIdentification: typeIdentification as unknown as TypeIdentification,
            expirationDateMedicalInsurance: hasMedicalInsurance ? expirationDateMedicalInsurance : null as unknown as undefined,
            expirationDateMedicalReport: hasMedicalReport ? expirationDateMedicalReport : null as unknown as undefined
        }
        const response = participant !== null ? await putParticipant(participant?.id ?? 0, newParticipant) : await postParticipant(newParticipant)
        if (response) {
            successAlert("Participante guardado exitosamente")
        }else{
            errorAlert("Error al guardar el participante")
        
        }
    }
  
  return (
    <div className="container mx-auto bg-gray-gradient p-10 h-auto max-w-4xl my-4 rounded-md gap-4">
      <div>
        <div className="grid grid-cols-4 gap-5 items-center mb-3">
          <Select
            value={typeIdentification}
            onChange={(e) => setTypeIdentification(e.target.value)}
            label="Tipo de identificación"
            placeholder="Tipo de identificación"
            icon={<HiOutlineIdentification color="white" />}
            options={optionsTypeIdentification}
          />
          <InputField
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
            label="Identificación"
            type="text"
            placeholder="Identificación"
            iconStart={<HiOutlineIdentification color="white" />}
          />
          <InputField
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            label="Fecha de nacimiento"
            placeholder="Fecha de nacimiento"
            type="date"
            iconStart={<FaRegCalendarAlt color="white" />}
          />
          <div className="flex flex-col items-center justify-center">
            <ProfileImage image={image} onChangeImage={onChangeImage} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mb-6">
          <div>
            <div className="flex gap-1 items-center">
              <RiWhatsappLine color="green" size={20} />
              <label className="text-green-500" htmlFor="hasWhatsapp">
                Tiene Whatsapp
              </label>
              <input
                onChange={(e) =>
                  setHasWhatsApp(e.target.checked ? true : false)
                }
                checked={hasWhatsApp}
                type="checkbox"
                name="hasWhatsapp"
                id="hasWhatsapp"
              />
            </div>
            <InputField
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              label=""
              placeholder="Telefono"
              iconStart={<FiPhoneCall color="white" />}
            />
          </div>
          <InputField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="Email"
            iconStart={<MdOutlineEmail color="white" />}
          />
          <Select
            value={scholarship}
            onChange={(e) => setScholarship(e.target.value)}
            label="Escolaridad"
            placeholder="Escolaridad"
            icon={<RiGraduationCapLine color="white" />}
            options={optionsScholarship}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-1 gap-5">
        <InputField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Nombre"
          placeholder="Nombre"
          iconStart={<GoPerson color="white" />}
        />
        <InputField
          value={firstLastName}
          onChange={(e) => setFirstLastName(e.target.value)}
          label="Primer Apellido"
          placeholder="Primer Apellido"
          iconStart={<GoPerson color="white" />}
        />
        <InputField
          value={secondLastName}
          onChange={(e) => setSecondLastName(e.target.value)}
          label="Segundo Apellido"
          placeholder="Segundo Apellido"
          iconStart={<GoPerson color="white" />}
        />
      </div>
      <div>
        <div>
          <Checkbox
            checked={hasMedicalInsurance}
            id="hasMedicalInsurance"
            onChange={(e) =>
              setHasMedicalInsurance(e.target.checked ? true : false)
            }
            label="Tiene Poliza"
            placeholder="Tiene Poliza"
          />

          {hasMedicalInsurance && (
            <div>
              <InputField
                value={expirationDateMedicalInsurance}
                onChange={(e) =>
                  setExpirationDateMedicalInsurance(e.target.value)
                }
                label="Vencimiento de Poliza"
                placeholder="Fecha de Vencimiento"
                type="date"
                iconStart={<FaRegCalendarAlt color="white" />}
              />
            </div>
          )}
        </div>
        <div className="h-auto">
          <Checkbox
            id="hasMedicalReport"
            checked={hasMedicalReport}
            onChange={(e) =>
              setHasMedicalReport(e.target.checked ? true : false)
            }
            label="Tiene Dictamen Medico"
            placeholder="Tiene Dictamen Medico"
          />
          {hasMedicalReport && (
            <div>
              <InputField
                value={expirationDateMedicalReport}
                onChange={(e) => setExpirationDateMedicalReport(e.target.value)}
                label="Vencimiento de Dictamen Medico"
                placeholder="Fecha de Vencimiento"
                type="date"
                iconStart={<FaRegCalendarAlt color="white" />}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between mt-5">
        <Link href="/admin/participantRegister/1/health">
          <Button className="bg-red-gradient w-52">Salud</Button>
        </Link>
        <Link href="/admin/participantRegister/2/attachments">
          <Button className="bg-red-gradient w-52">Documentos Adjuntos</Button>
        </Link>
        <Button
          onClick={handleSave}
          format
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-md transition-all hover:from-green-600 hover:to-green-700 text-white w-52"
        >
          Guardar
        </Button>
      </div>
      {/* <div className='flex justify-between mt-4'>
                    <Link href="/health">
                        <Button className="bg-red-gradient w-52">Salud</Button>
                    </Link>
                    <Button className="bg-red-gradient w-52">Desactivar</Button>
                    <Button className="bg-red-gradient w-52">Eliminar</Button>
                </div>
                <div className='flex justify-center mt-6'>
                    <Button className="bg-red-gradient w-1/3">Registrar</Button>
                </div>
                <div className='container bg-white mt-6 p-4 rounded-xl'>
                    <p className="text-3xl font-bold text-dark-gray flex justify-center">Documentos Adjuntos</p>
                    <div className='mt-6'>
                        <Table keys={[]} data={[]} headers={headersFiles} itemsPerPage={3} />
                    </div>
                    <div className='flex justify-center mt-6'>
                        <Button className="bg-red-gradient w-1/3">Agregar</Button>
                    </div>
                </div>
                <div className='container bg-white mt-6 p-4 rounded-xl'>
                    <p className="text-3xl font-bold text-dark-gray flex justify-center">Cursos</p>
                    <div className='mt-6'>
                        <Table keys={[]} data={[]} headers={headers} itemsPerPage={3} />
                    </div>
                    <div className='flex justify-center mt-6'>
                        <Button className="bg-red-gradient w-1/3">Agregar</Button>
                    </div>
                </div> */}
    </div>
  );
}
