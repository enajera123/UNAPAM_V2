import * as React from 'react';
import { Formik, Form } from 'formik';
import logoUNAPAM from '@/resources/LogoWhite.webp';
import Image from 'next/image';
import { Participant, ParticipantHealth, crearParticipantHealth } from '@/types/prisma';
import { useParticipantHealthStore } from '@/store/participantHealthStore';
import { errorAlert, successAlert } from '@/utils/sweetAlert';
import { validationSchemeHealth } from '@/validation/YupHealth';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaUser } from 'react-icons/fa';
import { BsHeart } from 'react-icons/bs';
import HealthInformationTab from './tabs/HealthInformationTab';
import EmergencyContactTab from './tabs/EmergencyContactTab';





export default function Health({ participant }: { participant: Participant | null }) {
  const { createParticipantHealth, updateParticipantHealth } = useParticipantHealthStore()
  const router = useRouter()
  const [activeTab, setActiveTab] = React.useState("health")

  const [initialValues, setInitialValues] = React.useState<ParticipantHealth>(crearParticipantHealth());

  React.useEffect(() => {
    if (participant?.participantHealths) {
      const referenceContactOne = participant?.referenceContacts?.find((contact, index) => index === 0);
      const referenceContactTwo = participant?.referenceContacts?.find((contact, index) => index === 1);
      setInitialValues((i) => ({
        ...participant.participantHealths,
        contactOne: referenceContactOne || i.contactOne,
        contactTwo: referenceContactTwo || i.contactTwo,
        bloodType: participant.participantHealths?.bloodType || '',
        participantId: participant.id,
      }));
    }
  }, [participant]);
  const goParticipantRegister = () => {
    router.push(`/admin/participantRegister/${participant?.id}`)
  }

  const onSubmit = async (values: ParticipantHealth) => {
    try {
      if (!participant?.id) return errorAlert("No se ha seleccionado un participante")
      if (!values.id) {
        const data = await createParticipantHealth({ ...values, participantId: participant?.id! })
        if (data) {
          setInitialValues(data)
          return successAlert("Información de salud guardada correctamente")
        }
      } else {
        const data = await updateParticipantHealth(values.id, { ...values, participantId: participant?.id! })
        if (data) {
          setInitialValues(data)
          return successAlert("Información de salud guardada correctamente")
        }
      }
      errorAlert("Error al guardar la información de salud")
    } catch (error) {
      console.log(error)
      errorAlert("Error al guardar la información de salud")
    }
  }


  return (
    <div className="w-[90%] mx-auto bg-dark-gray p-8 my-3 rounded-xl shadow-xl">
      <div className="flex justify-between items-center ">
        <button
          onClick={goParticipantRegister}
          className="flex text-sm items-center gap-2 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-[#575252] transition-all duration-300"
        >
          <FaArrowLeft size={18} />
          <span>Volver</span>
        </button>
        <Image src={logoUNAPAM || "/placeholder.svg"} alt="logoUNAPAM" className="h-14 w-auto" />
      </div>

      {/* Tabs Navigation */}
      <div className="flex mb-2 border-b border-[#504b4b]">
        <button
          className={`flex items-center gap-2 px-6 py-2 font-medium text-sm rounded-t-lg transition-all duration-200 ${activeTab === "health" ? "bg-red-600 text-white" : "bg-[#575252] text-gray-300 hover:bg-[#423f3f]"
            }`}
          onClick={() => setActiveTab("health")}
        >
          <BsHeart size={18} />
          Información de Salud
        </button>
        <button
          className={`flex items-center gap-2 px-6 py-2 font-medium text-sm rounded-t-lg transition-all duration-200 ${activeTab === "contacts" ? "bg-red-600 text-white" : "bg-[#575252] text-gray-300 hover:bg-[#423f3f]"
            }`}
          onClick={() => setActiveTab("contacts")}
        >
          <FaUser size={18} />
          Contactos de Emergencia
        </button>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        enableReinitialize
        validationSchema={validationSchemeHealth}
      >
        {({ values }) => (
          <Form>
            {/* Health Information Tab */}
            <div className={activeTab === "health" ? "block" : "hidden"}>
              <HealthInformationTab values={values} setInitialValues={setInitialValues} />
            </div>

            {/* Emergency Contacts Tab */}
            <div className={activeTab === "contacts" ? "block" : "hidden"}>
              <EmergencyContactTab />
            </div>

            {/* Submit Button - Always visible */}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium rounded-lg text-sm transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Guardar Información
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
