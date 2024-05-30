'use client'
import Button from '@/components/Button/Button';
import InputField from '@/components/InputField/InputField';
import Select from '@/components/Select/Select';
import TextArea from '@/components/TextArea/TextArea';
import logoUNAPAM from '@/resources/LogoWhite.png';
import Image from 'next/image';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { HiOutlineIdentification } from 'react-icons/hi';
import { LuUserCircle2 } from "react-icons/lu";
import { GoPerson } from 'react-icons/go';
import { FiPhoneCall } from 'react-icons/fi';
import { RiGraduationCapLine, RiWhatsappLine } from 'react-icons/ri';
import { MdOutlineEmail } from 'react-icons/md';
import Checkbox from '@/components/Checkbox/Checkbox';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Grade, Participant, YesOrNo, TypeIdentification } from '@/types/prisma';
import { useParticipantsStore } from '@/store/participantsStore';
const optionsScholarship = [
    { value: "Sin_Estudio", label: "Sin estudio" },
    { value: "Primaria_Completa", label: "Primaria completa" },
    { value: "Primaria_Incompleta", label: "Primaria incompleta" },
    { value: "Secundaria_Completa", label: "Secundaria completa" },
    { value: "Secundaria_Incompleta", label: "Secundaria incompleta" },
    { value: "Universidad_Incompleta", label: "Universidad completa" },
    { value: "Universidad_Completa", label: "Universidad incompleta" },
];
export default function Record({ participant }: { participant: Participant | null }) {
    const [hasPolicy, setHasPolicy] = useState(false)
    const [identification, setIdentification] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [scholarship, setScholarship] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [firstLastName, setFirstLastName] = useState('')
    const [secondLastName, setSecondLastName] = useState('')
    const [email, setEmail] = useState('')
    const [hasWhatsApp, setHasWhatsApp] = useState("")
    const [expirationDatePolicy, setExpirationDatePolicy] = useState('')
    // const [address, setAddress] = useState('')
    const { postParticipant, putParticipant } = useParticipantsStore()
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
            setHasWhatsApp(participant.hasWhatsApp ? "Yes" : "No")
            setHasPolicy(participant.policy ? true : false)
            setExpirationDatePolicy(participant.policy?.expirationDate || '')
        }
    }, [participant])
    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const newParticipant: Participant = {
            identification,
            hasWhatsApp: hasWhatsApp as unknown as YesOrNo,
            birthDate,
            grade: scholarship as unknown as Grade,
            firstName: name,
            phoneNumber: phone,
            firstSurname: firstLastName,
            secondSurname: secondLastName,
            email,
            typeIdentification: "Nacional" as unknown as TypeIdentification,
            policy: hasPolicy ? { expirationDate: expirationDatePolicy } : undefined
        }
        const response = participant !== null ? await putParticipant(participant?.id ?? 0, newParticipant) : await postParticipant(newParticipant)
        participant = response ? null : participant

    }
    return (
        <div className="container mx-auto bg-gray-gradient p-10 h-auto max-w-4xl my-4 rounded-md gap-4">
            <div>

                <div className='grid grid-cols-3 gap-5 items-center mb-3'>
                    <InputField
                        value={identification}
                        onChange={(e) => setIdentification(e.target.value)}
                        label="Identificación"
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
                    <div className='w-full flex justify-center'>
                        <Image src={logoUNAPAM} alt="logoUNAPAM" height={150} width={150} />
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-5'>
                    <div>
                        <div className='flex gap-1 items-center'>
                            <RiWhatsappLine color='green' size={20} />
                            <label className='text-green-500' htmlFor="hasWhatsapp">Tiene Whatsapp</label>
                            <input onChange={(e) => setHasWhatsApp(e.target.checked ? "Yes" : "No")} checked={hasWhatsApp === "Yes" ? true : false} type="checkbox" name="hasWhatsapp" id="hasWhatsapp" />
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
            <div className='grid grid-cols-3 grid-rows-2 gap-5'>
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
                <Checkbox
                    checked={hasPolicy}
                    onChange={(e) => setHasPolicy(e.target.checked ? true : false)}
                    label="Tiene Poliza"
                    placeholder="Tiene Poliza"
                />
                {hasPolicy && <div className='col-span-1'>
                    <InputField
                        value={expirationDatePolicy}
                        onChange={(e) => setExpirationDatePolicy(e.target.value)}
                        label="Vencimiento de Poliza"
                        placeholder="Fecha de Vencimiento"
                        type="date"
                        iconStart={<FaRegCalendarAlt color="white" />} />
                </div>}
            </div>
            <div className='grid grid-cols-2'>
                <TextArea
                    placeholder="Dirección"
                    rows={6}
                >Direccion</TextArea>
                <div className='flex flex-col items-center justify-center'>
                    <LuUserCircle2 className="w-32 h-auto text-white" />
                    <Button className="bg-red-gradient">Foto</Button>
                </div>
            </div>
            <div className='flex justify-between mt-5'>
                <Link href="/admin/record/1/health">
                    <Button className="bg-red-gradient w-52">Salud</Button>
                </Link>
                <Link href="/admin/record/2/attachments">
                    <Button className="bg-red-gradient w-52">Documentos Adjuntos</Button>
                </Link>
                <Button onClick={handleSave} format className="bg-gradient-to-r from-green-500 to-green-600 rounded-md transition-all hover:from-green-600 hover:to-green-700 text-white w-52">Guardar</Button>
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