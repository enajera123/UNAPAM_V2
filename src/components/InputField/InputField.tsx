"use client";

import React from "react";
import { Field, ErrorMessage } from "formik";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  iconStart,
  iconEnd,
  className,
}) => {
  const [typeInput, setTypeInput] = useState(type);
  const [visibility, setVisibility] = useState(false);

  const handleChangeVisibility = () => {
    setTypeInput(!visibility ? "text" : "password");
    setVisibility(!visibility);
  };

  return (
    <label className="block text-sm font-medium text-white dark:text-white">
      {label}
      <div className="relative mt-1">
        {iconStart && (
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            {iconStart}
          </div>
        )}
        <Field
          className={`bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10 ${className}`}
          type={typeInput}
          name={name}
          placeholder={placeholder}
        />
        {iconEnd && (
          <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
            {iconEnd}
          </div>
        )}
        {type.includes("password") && (
          <div
            className="absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer"
            onClick={handleChangeVisibility}
          >
            {!visibility ? <MdVisibility color="white" /> : <MdVisibilityOff color="white" />}
          </div>
        )}
      </div>
      <ErrorMessage className="text-red-500 text-xs mt-1" name={name} component="div" />
    </label>
  );
};

export default InputField;
