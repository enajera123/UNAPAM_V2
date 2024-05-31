import Swal from 'sweetalert2'
export const confirmationAlert = (confirmedFunction: Function) => Swal.fire({
    title: '¿Estas seguro?',
    text: 'Este cambio no se puede revertir',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar'
}).then((result) => {
    if (result.isConfirmed) {
        confirmedFunction()
    } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
            'Cancelado',
            'Tu información está segura',
            'error'
        )
    }
})
