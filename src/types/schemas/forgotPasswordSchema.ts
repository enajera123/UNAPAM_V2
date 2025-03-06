import * as Yup from 'yup'
import { ForgotPasswordInterface } from './interfaces/interfaces'

export const ForgotPasswordSchema = Yup.object<ForgotPasswordInterface>().shape({
    identification: Yup.string().required('Requerido'),
})
export const getInitialValuesForgorPassword = (
) => {
    return {
        identification: '',
    } as ForgotPasswordInterface
}