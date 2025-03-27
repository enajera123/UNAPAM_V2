"use client";
import React, { useEffect } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useField, useFormikContext } from "formik";
import { FaRegCalendarAlt } from "react-icons/fa";

interface CustomDatePickerProps {
    label: string;
    name: string;
    placeholder?: string;
    className?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
    label,
    name,
    placeholder,
    className,
}) => {
    const [field, meta] = useField<string>(name);
    const { setFieldValue } = useFormikContext();

    useEffect(() => {
        setFieldValue(name, field.value || new Date());
    }, []);

    return (
        <label className="block text-sm font-medium text-white dark:text-white">
            {label}
            <div className="relative mt-1">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    {/* <FaRegCalendarAlt color="white" /> */}
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) =>
                            setFieldValue(name, date ? dayjs(date).format("YYYY-MM-DD") : "")
                        }
                        slotProps={{
                            openPickerButton(ownerState) {
                                return {
                                    className: "absolute inset-y-0 end-0 flex items-center pe-3",
                                    style: { color: "white" },
                                };
                            },
                            textField: {
                                variant: "outlined",
                                InputProps: {
                                    disableUnderline: true,
                                    style: {
                                        fontSize: "0.875rem",
                                        color: "white",
                                        borderRadius: "0.5rem", // Asegura que el borde tenga esquinas redondeadas
                                    },
                                },
                                placeholder: placeholder || "",
                                sx: {
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "white", // Aplica el color blanco al borde
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "white", // Mantén el borde blanco al pasar el mouse
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "white", // Mantén el borde blanco cuando esté enfocado
                                        },
                                    },
                                },
                            },
                        }}
                    />
                </LocalizationProvider>
            </div>
            {meta.touched && meta.error && (
                <div className="text-red-500 text-xs mt-1">{meta.error}</div>
            )}
        </label>
    );
};

export default CustomDatePicker;