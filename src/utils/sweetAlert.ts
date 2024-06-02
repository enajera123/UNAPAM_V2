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
}).then( (result) => {
    if (result.isConfirmed) {
         confirmedFunction()
    }
})

export const confirmationAlertPromise = async (confirmedFunction: Promise<void>) => Swal.fire({
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
        await confirmedFunction;
    }
})
export const successAlert = (message: string) => Swal.mixin({
    icon: 'success',
    position: 'top-end',
    showConfirmButton: false,
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