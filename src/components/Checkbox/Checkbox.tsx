import { CheckboxProps } from "./type"

const Checkbox = ({label,onChange,checked} : CheckboxProps) => {
  return (
    <div className="bg-dark-gray flex items-center mb-4 p-2.5 rounded-lg border border-gray-300 mt-4">
        <input checked={checked} onChange={onChange} id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-white bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
        <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-white">{label}</label>
    </div>
  )
}

export default Checkbox