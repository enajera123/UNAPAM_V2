import { optionsKinship } from '@/utils/data'
import { ErrorMessage, Field } from 'formik'
import React from 'react'
import { FaUser } from 'react-icons/fa'

function EmergencyContactTab() {
    return (
        <div >
            <h2 className="text-base font-bold text-white mb-2 border-b border-gray-600 pb-2">
                Contactos de Emergencia
            </h2>

            <div className="space-y-4">
                <div className="bg-[#2e2b2b] p-3 rounded-lg">
                    <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                        <FaUser size={18} />
                        Contacto #1
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div>
                            <label htmlFor="contactOne.relationship" className="block text-white font-medium mb-2 text-sm">
                                Parentesco
                            </label>
                            <Field
                                name="contactOne.relationship"
                                component="select"
                                className="bg-[#575252] border border-gray-600 text-white text-sm rounded-lg block w-full p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            >
                                {optionsKinship.map((item, index) => (
                                    <option value={item.value} key={index}>
                                        {item.label}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage
                                component={"div"}
                                className="text-red-400 text-sm mt-1"
                                name="contactOne.relationship"
                            />
                        </div>
                        <div>
                            <label htmlFor="contactOne.phoneNumber" className="block text-white font-medium mb-2 text-sm">
                                Teléfono
                            </label>
                            <Field
                                name="contactOne.phoneNumber"
                                placeholder="xxxx-xxxx"
                                className="bg-[#575252] border border-gray-600 text-white placeholder:text-gray-400 text-sm rounded-lg block w-full p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                            <ErrorMessage
                                component={"div"}
                                className="text-red-400 text-sm mt-1"
                                name="contactOne.phoneNumber"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="contactOne.firstName" className="block text-white font-medium mb-2 text-sm">
                                Nombre
                            </label>
                            <Field
                                name="contactOne.firstName"
                                placeholder="Nombre"
                                className="bg-[#575252] border border-gray-600 text-white placeholder:text-gray-400 text-sm rounded-lg block w-full p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                            <ErrorMessage
                                component={"div"}
                                className="text-red-400 text-sm mt-1"
                                name="contactOne.firstName"
                            />
                        </div>
                        <div>
                            <label htmlFor="contactOne.firstSurname" className="block text-white font-medium mb-2 text-sm">
                                Apellidos
                            </label>
                            <Field
                                name="contactOne.firstSurname"
                                placeholder="Apellido"
                                className="bg-[#575252] border border-gray-600 text-white placeholder:text-gray-400 text-sm rounded-lg block w-full p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                            <ErrorMessage
                                component={"div"}
                                className="text-red-400 text-sm mt-1"
                                name="contactOne.firstSurname"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-[#2e2b2b] p-3 rounded-lg">
                    <h3 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
                        <FaUser size={18} />
                        Contacto #2
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div>
                            <label htmlFor="contactTwo.relationship" className="block text-white font-medium mb-2">
                                Parentesco
                            </label>
                            <Field
                                name="contactTwo.relationship"
                                component="select"
                                className="bg-[#575252] border border-gray-600 text-white text-sm rounded-lg block w-full p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            >
                                {optionsKinship.map((item, index) => (
                                    <option value={item.value} key={index}>
                                        {item.label}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage
                                component={"div"}
                                className="text-red-400 text-sm mt-1"
                                name="contactTwo.relationship"
                            />
                        </div>
                        <div>
                            <label htmlFor="contactTwo.phoneNumber" className="block text-white font-medium mb-2">
                                Teléfono
                            </label>
                            <Field
                                name="contactTwo.phoneNumber"
                                placeholder="xxxx-xxxx"
                                className="bg-[#575252] border border-gray-600 text-white placeholder:text-gray-400 text-sm rounded-lg block w-full p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                            <ErrorMessage
                                component={"div"}
                                className="text-red-400 text-sm mt-1"
                                name="contactTwo.phoneNumber"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="contactTwo.firstName" className="block text-white font-medium mb-2 text-sm">
                                Nombre
                            </label>
                            <Field
                                name="contactTwo.firstName"
                                placeholder="Nombre"
                                className="bg-[#575252] border border-gray-600 text-white placeholder:text-gray-400 text-sm rounded-lg block w-full p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                            <ErrorMessage
                                component={"div"}
                                className="text-red-400 text-sm mt-1"
                                name="contactTwo.firstName"
                            />
                        </div>
                        <div>
                            <label htmlFor="contactTwo.firstSurname" className="block text-white font-medium mb-2 text-sm">
                                Apellidos
                            </label>
                            <Field
                                name="contactTwo.firstSurname"
                                placeholder="Apellido"
                                className="bg-[#575252] border border-gray-600 text-white placeholder:text-gray-400 text-sm rounded-lg block w-full p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                            <ErrorMessage
                                component={"div"}
                                className="text-red-400 text-sm mt-1"
                                name="contactTwo.firstSurname"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmergencyContactTab