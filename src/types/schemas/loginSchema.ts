import * as Yup from 'yup'
import { LoginInterface } from './interfaces/interfaces'

export const LoginSchema = Yup.object<LoginInterface>().shape({
    identification: Yup.string().required('Requerido'),
    password: Yup.string().required('Requerido')
})
export const getInitialValuesLogin = (
) => {
    return {
        identification: '',
        password: '',
    } as LoginInterface
}