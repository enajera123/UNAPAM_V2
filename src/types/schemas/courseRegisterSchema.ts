import { Course } from '@/types/prisma'
import * as Yup from 'yup'

export const CourseSchema = Yup.object<Course>().shape({
    courseNumber: Yup.string().required('Requerido'),
    // description: Yup.string().required('Requerido'),
    finalDate: Yup.string().required('Requerido'),
    initialDate: Yup.string().required('Requerido'),
    location: Yup.string().required('Requerido'),
    name: Yup.string().required('Requerido'),
    state: Yup.string().required('Requerido'),
    needMedicalReport: Yup.string().required('Requerido'),
    professor: Yup.string().required('Requerido'),
    quota: Yup.number().required('Requerido'),
})
export const getInitialValuesCourse = (
    courseEdited: Course | null
) => {
    console.log(courseEdited)
    return {
        id: courseEdited?.id,
        courseNumber: courseEdited?.courseNumber || '',
        description: courseEdited?.description || '',
        finalDate: courseEdited?.finalDate || '',
        initialDate: courseEdited?.initialDate || '',
        location: courseEdited?.location || '',
        name: courseEdited?.name || '',
        state: courseEdited?.state || 'Active',
        needMedicalReport: courseEdited?.needMedicalReport || 'No',
        professor: courseEdited?.professor || '',
        quota: courseEdited?.quota || 20,
        // participantsOnCourses: courseEdited?.participantsOnCourses || [],
    } as Course
}