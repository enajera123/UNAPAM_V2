"use client";

import { useState } from "react";
import { InputFieldProps } from "./type";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const InputField = ({
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  iconStart,
  iconEnd,
}: InputFieldProps) => {

  const [typeInput, setTypeInput] = useState(type)
  const [visibility, setVisibility] = useState(false)

  const handleChangeVisibility = () => {
    setTypeInput(!visibility ? "text" : 'password');
    setVisibility(!visibility)
  }

  return (
    <div>
      <label
        htmlFor="input-group-1"
        className="block mb-2 text-sm font-medium text-white dark:text-white"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          {iconStart}
        </div>
        <input
          value={value}
          onChange={onChange}
          type={typeInput}
          id="input-group-1"
          className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10"
          placeholder={placeholder}
        />
        {iconEnd ? (
          <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
            {iconEnd}
          </div>
        ) : null}
        {type.includes("password") ? (
          <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer" onClick={handleChangeVisibility}>
            {!visibility ? <MdVisibility color="white" /> : <MdVisibilityOff color="white" />}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InputField;
