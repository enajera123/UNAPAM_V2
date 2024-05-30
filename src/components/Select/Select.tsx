import React from "react";
import { SelectProps } from "./type";

const Select = ({ label, placeholder, icon, options, onChange, value }: SelectProps) => {
  return (
    <form>
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="relative mb-6">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          {icon}
        </div>
        <select
          onChange={onChange}
          id="countries"
          value={value}
          className="bg-dark-gray border border-white text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-dark-gray dark:border-white dark:placeholder-gray-400 dark:text-white"
        >
          <option value={placeholder} disabled>{placeholder}</option>
          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default Select;

