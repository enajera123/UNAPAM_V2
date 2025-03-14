import { Participant } from '@/types/prisma'
import * as Yup from 'yup'

export const ParticipantSchema = Yup.object<Participant>().shape({
    participantNumber: Yup.string().required('Requerido'),
    finalDate: Yup.string().required('Requerido'),
    initialDate: Yup.string().required('Requerido'),
    location: Yup.string().required('Requerido'),
    name: Yup.string().required('Requerido'),
    state: Yup.string().required('Requerido'),
    needMedicalReport: Yup.string().required('Requerido'),
    professor: Yup.string().required('Requerido'),
    quota: Yup.number().required('Requerido'),
})
export const getInitialValuesParticipant = (
    participantEdited: Participant | null
) => {
    return {
        id: participantEdited?.id,
        birthDate: participantEdited?.birthDate || '',
        email: participantEdited?.email || '',
        firstName: participantEdited?.firstName || '',
        firstSurname: participantEdited?.firstSurname || '',
        grade: participantEdited?.grade || '',
        hasWhatsApp: participantEdited?.hasWhatsApp || 'No',
        identification: participantEdited?.identification || '',
        phoneNumber: participantEdited?.phoneNumber || '',
        secondSurname: participantEdited?.secondSurname || '',
        typeIdentification: participantEdited?.typeIdentification || 'Nacional',
        expirationDateMedicalInsurance: participantEdited?.expirationDateMedicalInsurance || '',
        expirationDateMedicalReport: participantEdited?.expirationDateMedicalReport || '',
        participantAttachments: participantEdited?.participantAttachments || [],
        participantHealths: participantEdited?.participantHealths || [],
        participantsOnCourses: participantEdited?.participantsOnCourses || [],
        photo: participantEdited?.photo || '',
        hasMedicalInsurance: (participantEdited?.expirationDateMedicalInsurance?.length ?? 0) > 0 ? true : false,
        hasMedicalReport: (participantEdited?.expirationDateMedicalReport?.length ?? 0) > 0 ? true : false,
    } as Participant & { hasMedicalInsurance: boolean; hasMedicalReport: boolean }
}