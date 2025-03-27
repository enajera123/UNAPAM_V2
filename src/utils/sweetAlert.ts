import { Course, Participant } from '@/types/prisma'
import Swal from 'sweetalert2'
export const confirmationAlert = async (confirmedFunction: Function) => Swal.fire({
    title: '¿Estas seguro?',
    text: 'Este cambio no se puede revertir',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    confirmButtonColor: 'green',
    cancelButtonColor: 'red',
    cancelButtonText: 'Cancelar'
}).then((result) => {
    if (result.isConfirmed) {
        confirmedFunction()
    }
})

export const confirmationAlertPromise = (confirmedFunction: () => Promise<void>) => Swal.fire({
    title: '¿Estas seguro?',
    text: 'Este cambio no se puede revertir',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    confirmButtonColor: 'green',
    cancelButtonColor: 'red',
    cancelButtonText: 'Cancelar'
}).then(async (result) => {
    if (result.isConfirmed) {
        console.log("e")
        await confirmedFunction();
    }
})
export const warningAlert = (message: string) => Swal.mixin({
    icon: 'warning',
    position: 'top-end',
    showConfirmButton: false,
    showCloseButton: true,
    timer: 3000,
    timerProgressBar: true,
    title: 'Éxito',
    text: message,
    toast: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
}).fire()
export const successAlert = (message: string) => Swal.mixin({
    icon: 'success',
    position: 'top-end',
    showConfirmButton: false,
    showCloseButton: true,
    timer: 2000,
    timerProgressBar: true,
    title: 'Éxito',
    text: message,
    toast: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
}).fire()
export const errorAlert = (message: string) => Swal.mixin({
    icon: 'error',
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    title: 'Error',
    text: message,
    toast: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
}).fire()
export const enrollCoursesConfirmationAlert = (
    confirmedFunction: Function,
    option: string,
    courseInfo?: Course,
    participantInfo?: Participant
) => {
    const courseDetails = courseInfo
        ? `<div style="text-align: left; margin-top: 10px;">
            <p><strong>Nombre:</strong> ${participantInfo?.firstName}</p>
            <p><strong>Curso:</strong> ${courseInfo.name || "N/A"}</p>
            <p><strong>Horario:</strong> ${courseInfo.initialDate + " " + courseInfo.description || "N/A"}</p>
            <p><strong>Aula:</strong> ${courseInfo.location || "N/A"}</p>
        </div>`
        : "";
    Swal.fire({
        title: `¿Desea ${option} este curso?`,
        html: `${courseDetails}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            confirmedFunction();
        }
    });
};