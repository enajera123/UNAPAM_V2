import { ReactNode } from "react"


type Options = {
    value: any,
    label: string
}

export type SelectProps = {
    value?: string,
    label: string,
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    placeholder: string,
    icon: ReactNode,
    options: Array<Options>,
}