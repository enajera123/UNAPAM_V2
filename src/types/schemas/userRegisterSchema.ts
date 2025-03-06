import { User } from '@prisma/client'
import * as Yup from 'yup'

export const UserSchema = Yup.object<User>().shape({
    firstName: Yup.string().required('Requerido'),
    secondSurname: Yup.string().required('Requerido'),
    identification: Yup.string().required('Requerido'),
    firstSurname: Yup.string().required('Requerido'),
    state: Yup.string().required('Requerido'),
    birthDate: Yup.string().required('Requerido'),
    email: Yup.string().required('Requerido'),
    isPasswordChanged: Yup.string().required('Requerido'),
    password: Yup.string().required('Requerido'),
    phoneNumber: Yup.string().required('Requerido'),
    role: Yup.string().required('Requerido'),
})
export const getInitialValuesUser = (
    userEdited: User | null
) => {
    return {
        id: userEdited?.id,
        firstName: userEdited?.firstName || '',
        secondSurname: userEdited?.secondSurname || '',
        identification: userEdited?.identification || '',
        firstSurname: userEdited?.firstSurname || '',
        state: userEdited?.state || 'Active',
        birthDate: userEdited?.birthDate || "",
        email: userEdited?.email || "",
        isPasswordChanged: userEdited?.isPasswordChanged || "No",
        password: userEdited?.password || "",
        phoneNumber: userEdited?.phoneNumber || "",
        role: userEdited?.role || "User",
    } as User
}