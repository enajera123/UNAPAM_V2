import { getCourseByCourseNumber } from "@/services/coursesService";
export async function validateFields(
    inDate: string,
    fnDate: string,
    location: string,
    description: string,
    courseNumber: string,
    name: string,
    quota: string,
    teacher: string,
) {
    const startDate = new Date(inDate);
    const endDateObj = new Date(fnDate);
    const errors = {
        inDate: !inDate ? "Por favor, ingresa una fecha de inicio." : null,
        fnDate: !fnDate ? "Por favor, ingresa una fecha de finalización." : null,
        location: !location ? "Por favor, ingresa una locación para el curso." : null,
        description: !description ? "Por favor, ingresa una descripción." : null,
        courseNumber: !courseNumber || isNaN(Number(courseNumber)) ? "Por favor, ingresa un número de curso válido." : null,
        name: !name ? "Por favor, ingresa un nombre." : null,
        quota: !quota || isNaN(Number(quota)) ? "Por favor, ingresa un cupo válido." : null,
        teacher: !teacher || /\d/.test(teacher) ? "Por favor, ingresa un nombre de profesor válido." : null,
        errorDates: startDate > endDateObj ? "La fecha de inicio no puede ser posterior a la fecha de finalización." : null
    }
    return errors;
}

export async function validateUniqueFields(value: string) {
    const result = await getCourseByCourseNumber(value);
    if (result?.id) {
        return { mensaje: "El número de curso ingresado, ya ha sido registrado anteriormente.", state: false };
    }
}