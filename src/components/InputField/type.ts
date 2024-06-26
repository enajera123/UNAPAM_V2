import { ReactNode } from "react"

export type InputFieldProps = {
    id?: string,
    label: string,
    placeholder: string,
    type?: string,
    iconStart?: ReactNode,
    iconEnd?: ReactNode,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}