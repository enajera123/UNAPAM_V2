"use client";

import React from "react";
import { Field, ErrorMessage } from "formik";

interface TextAreaFieldProps {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  className?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  name,
  rows = 4,
  placeholder,
  className,
}) => {
  return (
    <label className="block text-sm font-medium text-white dark:text-white">
      {label}
      <div className="relative mt-1">
        <Field
          as="textarea"
          className={`bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 ${className}`}
          name={name}
          rows={rows}
          placeholder={placeholder}
        />
      </div>
      <ErrorMessage className="text-red-500 text-xs mt-1" name={name} component="div" />
    </label>
  );
};

export default TextAreaField;
