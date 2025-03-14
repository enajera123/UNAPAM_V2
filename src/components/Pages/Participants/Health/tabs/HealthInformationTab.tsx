import { useParticipantDisseaseStore } from '@/store/participantDisseaseStore'
import { useParticipantMedicineStore } from '@/store/participantMedicineStore'
import { ParticipantHealth } from '@/types/prisma'
import { optionsBloodType } from '@/utils/data'
import { confirmationAlertPromise, errorAlert, successAlert } from '@/utils/sweetAlert'
import { ErrorMessage, Field, FieldArray } from 'formik'
import React from 'react'
import { BsPlus, BsTrash2 } from 'react-icons/bs'

function HealthInformationTab({ values, setInitialValues }: { values: ParticipantHealth, setInitialValues: React.Dispatch<React.SetStateAction<ParticipantHealth>> }) {
    const { deleteParticipantDisease } = useParticipantDisseaseStore()
    const { deleteParticipantMedicine } = useParticipantMedicineStore()

    const deleteDisease = async (id: number, remove: (i: number) => void, diseaseId: number | undefined) => {
        if (!diseaseId) return remove(id)
        try {
            const data = await deleteParticipantDisease(diseaseId)
            if (data) {
                setInitialValues((i) => ({
                    ...i,
                    participantDisseases: i.participantDisseases?.filter((disease) => disease.id !== diseaseId),
                }))
                successAlert("Enfermedad eliminada correctamente")
                return remove(id)
            }
            errorAlert("Error al eliminar la enfermedad")
        } catch (error) {
            console.log(error)
            errorAlert("Error al eliminar la enfermedad")
        }
    }

    const deleteMedicine = async (id: number, remove: (i: number) => void, medicineId: number | undefined) => {
        if (!medicineId) return remove(id)
        try {
            const data = await deleteParticipantMedicine(medicineId)
            if (data) {
                setInitialValues((i) => ({
                    ...i,
                    participantMedicines: i.participantMedicines?.filter((medicine) => medicine.id !== medicineId),
                }))
                successAlert("Medicina eliminada correctamente")
                return remove(id)
            }
            errorAlert("Error al eliminar la medicina")
        } catch (error) {
            errorAlert("Error al eliminar la medicina")
        }
    }
    return (
        <div>
            <div className="bg-[#575252] p-2 rounded-xl shadow-md mb-2">
                <h2 className="font-bold text-white mb-4 border-b border-gray-600 pb-2">
                    Información Médica Básica
                </h2>

                <div className="mb-4">
                    <label htmlFor="bloodType" className="block text-white font-medium mb-2">
                        Tipo de Sangre
                    </label>
                    <Field
                        name="bloodType"
                        id="bloodType"
                        component="select"
                        className="bg-dark-gray border border-gray-600 text-white text-sm rounded-lg block w-full md:w-1/3 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                        {optionsBloodType.map((item, index) => (
                            <option value={item.value} key={index}>
                                {item.label}
                            </option>
                        ))}
                    </Field>
                    <ErrorMessage component={"div"} className="text-red-400 text-sm mt-1" name="bloodType" />
                </div>
            </div>

            <div className="bg-[#575252] p-2 rounded-xl shadow-md mb-2">
                <h2 className="text-base font-bold text-white mb-4 border-b border-gray-600 pb-2">Enfermedades</h2>
                <FieldArray name="participantDisseases">
                    {({ push, remove }) => (
                        <div>
                            <div className="overflow-y-auto rounded-lg max-h-80 mb-4 bg-[#2e2b2b]">
                                {values.participantDisseases && values.participantDisseases.length > 0 ? (
                                    <table className="w-full">
                                        <thead className="bg-red-700 sticky top-0">
                                            <tr className="text-white">
                                                <th className="text-left px-4 py-1 w-2/5">Enfermedad</th>
                                                <th className="text-left px-4 py-1 w-2/5">Descripción</th>
                                                <th className="text-center px-4 py-1 w-1/5">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className='bg-[#2e2b2b]'>
                                            {values.participantDisseases.map((participantDissease, index) => (
                                                <tr className="border-b border-gray-700 text-white" key={index}>
                                                    <td className="px-4 py-3">
                                                        <Field
                                                            name={`participantDisseases.${index}.disease`}
                                                            placeholder="Enfermedad"
                                                            className="bg-[#575252] text-white placeholder:text-gray-400 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                        <ErrorMessage
                                                            component={"div"}
                                                            className="text-red-400 text-sm mt-1"
                                                            name={`participantDisseases.${index}.disease`}
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Field
                                                            name={`participantDisseases.${index}.description`}
                                                            placeholder="Descripción"
                                                            className="bg-[#575252] text-white placeholder:text-gray-400 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                        <ErrorMessage
                                                            component={"div"}
                                                            className="text-red-400 text-sm mt-1"
                                                            name={`participantDisseases.${index}.description`}
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <button
                                                            type="button"
                                                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200 inline-flex items-center gap-1 text-sm"
                                                            onClick={() =>
                                                                confirmationAlertPromise(() =>
                                                                    deleteDisease(index, remove, participantDissease.id),
                                                                )
                                                            }
                                                        >
                                                            <BsTrash2 size={16} />
                                                            <span>Eliminar</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="text-center py-8 text-gray-400">
                                        No hay enfermedades registradas. Haga clic en &quot;Agregar Enfermedad&quot; para añadir una.
                                    </div>
                                )}
                            </div>
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                                onClick={() =>
                                    push({ disease: "", description: "", participantHealth: {}, participantHealthId: 0 })
                                }
                            >
                                <BsPlus size={18} />
                                Agregar Enfermedad
                            </button>
                        </div>
                    )}
                </FieldArray>
            </div>

            <div className="bg-[#575252] p-2 rounded-xl shadow-md">
                <h2 className="text-base font-bold text-white mb-4 border-b border-gray-600 pb-2">Medicamentos</h2>

                <FieldArray name="participantMedicines">
                    {({ push, remove }) => (
                        <div>
                            <div className="overflow-y-auto rounded-lg max-h-80 mb-4 bg-[#2e2b2b]">
                                {values.participantMedicines && values.participantMedicines.length > 0 ? (
                                    <table className="w-full">
                                        <thead className="bg-red-700 sticky top-0">
                                            <tr className="text-white h-12">
                                                <th className="text-left px-4 py-2 w-2/5">Medicamento</th>
                                                <th className="text-left px-4 py-2 w-2/5">Descripción</th>
                                                <th className="text-center px-4 py-2 w-1/5">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {values.participantMedicines.map((participantMedicine, index) => (
                                                <tr className="border-b border-gray-700 text-white" key={index}>
                                                    <td className="px-4 py-3">
                                                        <Field
                                                            name={`participantMedicines.${index}.medicine`}
                                                            placeholder="Medicamento"
                                                            className="bg-[#575252] text-white placeholder:text-gray-400 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                        <ErrorMessage
                                                            component={"div"}
                                                            className="text-red-400 text-sm mt-1"
                                                            name={`participantMedicines.${index}.medicine`}
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Field
                                                            name={`participantMedicines.${index}.description`}
                                                            placeholder="Descripción"
                                                            className="bg-[#575252] text-white placeholder:text-gray-400 text-sm rounded-lg block w-full p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        />
                                                        <ErrorMessage
                                                            component={"div"}
                                                            className="text-red-400 text-sm mt-1"
                                                            name={`participantMedicines.${index}.description`}
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3 text-center">
                                                        <button
                                                            type="button"
                                                            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200 inline-flex items-center gap-1 text-sm"
                                                            onClick={() =>
                                                                confirmationAlertPromise(() =>
                                                                    deleteMedicine(index, remove, participantMedicine.id),
                                                                )
                                                            }
                                                        >
                                                            <BsTrash2 size={16} />
                                                            <span>Eliminar</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="text-center py-8 text-gray-400">
                                        No hay medicamentos registrados. Haga clic en &quot;Agregar Medicamento&quot; para añadir uno.
                                    </div>
                                )}
                            </div>
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
                                onClick={() =>
                                    push({ medicine: "", description: "", participantHealth: {}, participantHealthId: 0 })
                                }
                            >
                                <BsPlus size={18} />
                                Agregar Medicamento
                            </button>
                        </div>
                    )}
                </FieldArray>
            </div>
        </div>
    )
}

export default HealthInformationTab