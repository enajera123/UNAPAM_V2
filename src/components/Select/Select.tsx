import React, { SelectHTMLAttributes } from 'react'
import { Field, ErrorMessage } from 'formik'

interface CustomSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  name: string
  defaultValue?: string
  className?: string
}

const Select: React.FC<CustomSelectProps> = ({
  label,
  name,
  defaultValue,
  className,
  ...props
}) => {
  return (
    <label className='grid text-white'>
      {label}
      <Field
        as='select'
        className={`select select-sm select-bordered w-52  ${className}`}
        name={name}
        defaultValue={defaultValue}
        {...props}
      />

      <ErrorMessage className='text-secondary' name={name} component='div' />
    </label>
  )
}

export default Select