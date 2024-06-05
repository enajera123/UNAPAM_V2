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

export const enrollCoursesConfirmationAlert = (confirmedFunction: Function, option: string) => Swal.fire({
    title: `¿Desea ${option} este curso?`,
    text: '',
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