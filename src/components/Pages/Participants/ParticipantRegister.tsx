"use client";
import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import Select from "@/components/Select/Select";
import { FaArrowLeft, FaRegCalendarAlt } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { GoPerson } from 'react-icons/go';
import { FiPhoneCall } from 'react-icons/fi';
import { RiWhatsappLine } from 'react-icons/ri';
import { MdOutlineEmail } from 'react-icons/md';
import React, { useEffect, useState } from 'react';
import { Participant } from '@/types/prisma';
import { useParticipantsStore } from '@/store/participantsStore';
import { errorAlert, successAlert } from '@/utils/sweetAlert';
import { useRouter } from 'next/navigation';
import ProfileImage from "./ProfileImage/ProfileImage";
import useImageStore from "@/hooks/Stores/ImageStore/useImageStore";
import EnrollCourses from "./EnrollCourses/EnrollCourses";
import { ParticipantOnCourse } from "@/types/prisma";
import { Field, Form, Formik } from "formik";
import { getInitialValuesParticipant } from "@/types/schemas/participantRegisterSchema";
import { optionsScholarship } from "@/utils/data";

export default function ParticipantRegister({ participant }: { participant: Participant | null }) {
  const router = useRouter();
  const { createParticipant, updateParticipant } = useParticipantsStore();
  const { image, onChangeImage, setImage } = useImageStore();
  const [activeTab, setActiveTab] = useState("general");

  useEffect(() => {
    console.log(participant)
    setImage(i => ({ ...i, image_url: participant?.photo || i.image_url }));
  }, [participant]);



  const onLoadFiles = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (participant?.id) {
      const id = participant?.id
      router.push(`/admin/participantRegister/attachments/${id}`)
    } else {
      errorAlert("Primero debe guardar el participante para agregarle documentos")
    }
  }
  const onLoadHealth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (participant?.id) {
      const id = participant?.id
      router.push(`/admin/participantRegister/health/${id}`)
    } else {
      errorAlert("Primero debe guardar el participante para agregarle registro de salud")
    }
  }

  const handleSubmit = async (values: Participant & { hasMedicalInsurance: boolean, hasMedicalReport: boolean }) => {
    const { hasMedicalInsurance, hasMedicalReport, ...data } = values
    successAlert("Guardando Participante");
    const newParticipant = {
      ...data,
      photoFile: image.image_file,
      photoExtension: image.image_extension,
      expirationDateMedicalInsurance: hasMedicalInsurance ? values.expirationDateMedicalInsurance : "",
      expirationDateMedicalReport: hasMedicalReport ? values.expirationDateMedicalReport : ""
    } as Participant;
    const response = participant?.id ? await updateParticipant(participant.id, newParticipant) : await createParticipant(newParticipant);
    if (response?.id) {
      router.push(`/admin/participantRegister/${response.id}`)
    }
  };

  return (
    <div className="w-[90%] mx-auto bg-dark-gray p-8 my-3 rounded-xl shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => router.push("/admin/participants")}
          className="flex text-sm items-center gap-2 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-[#575252] transition-all duration-300"
        >
          <FaArrowLeft size={18} />
          <span>Volver</span>
        </button>
      </div>

      <div className="flex mb-2 border-b border-[#504b4b]">
        <button
          className={`flex items-center gap-2 px-6 py-2 font-medium text-sm rounded-t-lg transition-all duration-200 ${activeTab === "general" ? "bg-red-600 text-white" : "bg-[#575252] text-gray-300 hover:bg-[#423f3f]"
            }`}
          onClick={() => setActiveTab("general")}
        >
          Información General
        </button>
        {participant?.id && (
          <button
            className={`flex items-center gap-2 px-6 py-2 font-medium text-sm rounded-t-lg transition-all duration-200 ${activeTab === "courses" ? "bg-red-600 text-white" : "bg-[#575252] text-gray-300 hover:bg-[#423f3f]"
              }`}
            onClick={() => setActiveTab("courses")}
          >
            Matricula de Cursos
          </button>
        )}
      </div>

      <Formik clas enableReinitialize onSubmit={handleSubmit} initialValues={getInitialValuesParticipant(participant)}>
        {({ values, setFieldValue }) => (
          <Form>
            <div className={activeTab === "general" ? "block" : "hidden"}>
              <div className="grid grid-cols-4 gap-5 items-center mb-3">
                <Select className="bg-dark-gray border border-white text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-dark-gray dark:border-white dark:placeholder-gray-400 dark:text-white" label="Tipo de identificación" name="typeIdentification">
                  <option value="DIMEX">DIMEX</option>
                  <option value="Nacional">Nacional</option>
                </Select>
                <InputField name="identification" label="Identificación" type="text" placeholder="Identificación" iconStart={<HiOutlineIdentification color="white" />} />
                <InputField name="birthDate" label="Fecha de nacimiento" placeholder="Fecha de nacimiento" type="date" iconStart={<FaRegCalendarAlt color="white" />} />
                <ProfileImage image={image} onChangeImage={onChangeImage} />
              </div>
              <div className="grid grid-cols-3 gap-5">
                <InputField name="firstName" label="Nombre" placeholder="Nombre" iconStart={<GoPerson color="white" />} />
                <InputField name="firstSurname" label="Primer Apellido" placeholder="Primer Apellido" iconStart={<GoPerson color="white" />} />
                <InputField name="secondSurname" label="Segundo Apellido" placeholder="Segundo Apellido" iconStart={<GoPerson color="white" />} />
              </div>
              <div className="grid grid-cols-3 gap-5 mt-6">
                <div>
                  <div className="flex gap-1 items-center">
                    <RiWhatsappLine color="green" size={20} />
                    <label className="text-green-500" htmlFor="hasWhatsapp">Tiene Whatsapp</label>
                    <input className="h-6 w-6 cursor-pointer rounded border-gray-300 checked:bg-blue-600" onChange={() => setFieldValue('hasWhatsApp', values.hasWhatsApp === "Yes" ? "No" : "Yes")} checked={values.hasWhatsApp === "Yes"} type="checkbox" name="hasWhatsapp" id="hasWhatsapp" />
                  </div>
                  <InputField name="phoneNumber" label="" placeholder="Telefono" iconStart={<FiPhoneCall color="white" />} />
                </div>
                <InputField name="email" label="Email" placeholder="Email" iconStart={<MdOutlineEmail color="white" />} />
                <Select className="bg-dark-gray border border-white text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-dark-gray dark:border-white dark:placeholder-gray-400 dark:text-white" name="grade" label="Escolaridad">
                  {optionsScholarship.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                </Select>
              </div>
              <div>
                <div className='flex items-center justify-between text-white w-52 my-4'>
                  <h3 className="text-sm">Posee Póliza</h3>
                  <Field type="checkbox" name="hasMedicalInsurance" checked={values.hasMedicalInsurance} className="h-6 w-6 cursor-pointer rounded border-gray-300 checked:bg-blue-600" onChange={() => setFieldValue("hasMedicalInsurance", values.hasMedicalInsurance ? false : true)} />
                </div>
                {values.hasMedicalInsurance && (
                  <InputField name="expirationDateMedicalInsurance" label="Vencimiento de Poliza" placeholder="Fecha de Vencimiento" type="date" iconStart={<FaRegCalendarAlt color="white" />} />
                )}
                <div className='flex items-center justify-between text-white w-52 my-4'>
                  <h3 className="text-sm">Posee Dictamen Médico</h3>
                  <Field type="checkbox" name="hasMedicalReport" checked={values.hasMedicalReport} className="h-6 w-6 cursor-pointer rounded border-gray-300 checked:bg-blue-600" onChange={() => setFieldValue("hasMedicalReport", values.hasMedicalReport ? false : true)} />
                </div>
                {values.hasMedicalReport && (
                  <InputField name="expirationDateMedicalReport" label="Vencimiento de Dictamen Medico" placeholder="Fecha de Vencimiento" type="date" iconStart={<FaRegCalendarAlt color="white" />} />
                )}
              </div>
            </div>
            <div className={activeTab === "courses" ? "block" : "hidden"}>
              {participant?.id && <EnrollCourses participant={participant} />}
            </div>
            <div className="flex justify-between mt-5">
              <Button type="button" onClick={onLoadHealth} className="bg-red-gradient w-52">Salud</Button>
              <Button type="button" onClick={onLoadFiles} className="bg-red-gradient w-52">Documentos Adjuntos</Button>
              <Button
                type="submit"
                format
                className="bg-gradient-to-r from-green-500 to-green-600 rounded-md transition-all hover:from-green-600 hover:to-green-700 text-white w-52"
              >
                Guardar
              </Button>
            </div>

          </Form>
        )}
      </Formik>
    </div >
  );
}
