import * as React from 'react';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import logoUNAPAM from '@/resources/LogoWhite.webp';
import Image from 'next/image';
import { Participant, ParticipantHealth, crearParticipantHealth } from '@/types/prisma';
import { useParticipantHealthStore } from '@/store/participantHealthStore';
import { confirmationAlertPromise, errorAlert, successAlert } from '@/utils/sweetAlert';
import { useParticipantDisseaseStore } from '@/store/participantDisseaseStore';
import { useParticipantMedicineStore } from '@/store/participantMedicineStore';
import { DeleteIcon, PlusIcon } from '@/components/Icons/Icons';
import { validationSchemeHealth } from '@/validation/YupHealth';




const optionsBloodType = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
  { value: "NA", label: "Sin proporcionar" },
];

const optionsKinship = [
  { value: "Hijo/a", label: "Hijo/a" },
  { value: "Pareja/Conyugue", label: "Pareja/Conyugue" },
  { value: "Hermano/a", label: "Hermano/a" },
  { value: "Otro", label: "Otro" },
];

export default function Health({ participant }: { participant: Participant | null }) {
  const { postParticipantHealth, putParticipantHealth } = useParticipantHealthStore()
  const { deleteParticipantDisease } = useParticipantDisseaseStore()
  const { deleteParticipantMedicine } = useParticipantMedicineStore()

  const [initialValues, setInitialValues] = React.useState<ParticipantHealth>(crearParticipantHealth());

  React.useEffect(() => {
    if (participant?.participantHealths) {
      const referenceContactOne = participant?.referenceContacts?.find((contact, index) => index === 0);
      const referenceContactTwo = participant?.referenceContacts?.find((contact, index) => index === 1);
      setInitialValues((i) => ({
        ...participant.participantHealths,
        contactOne: referenceContactOne || i.contactOne,
        contactTwo: referenceContactTwo || i.contactTwo,
        bloodType: participant.participantHealths?.bloodType || '',
        participantId: participant.id,
      }));
    }
  }, [participant]);


  const onSubmit = async (values: ParticipantHealth) => {
    try {
      if (!participant?.id) return errorAlert("No se ha seleccionado un participante")
      if (!values.id) {
        const data = await postParticipantHealth({ ...values, participantId: participant?.id! })
        if (data) {
          setInitialValues(data)
          return successAlert("Información de salud guardada correctamente")
        }
      } else {
        const data = await putParticipantHealth(values.id, { ...values, participantId: participant?.id! })
        if (data) {
          setInitialValues(data)
          return successAlert("Información de salud guardada correctamente")
        }
      }
      errorAlert("Error al guardar la información de salud")
    } catch (error) {
      console.log(error)
      errorAlert("Error al guardar la información de salud")
    }
  }


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
    <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize validationSchema={validationSchemeHealth}>
      {({ values }) => (
        <Form className=' flex gap-5 flex-col'>
          <div className="container mx-auto bg-gray-gradient p-10 my-4 rounded-3xl ">
            <div className="flex flex-row items-center">
              <div className="flex-initial w-2/6 text-white">
                <label htmlFor="bloodType">Tipo de Sangre</label>
                <Field
                  name="bloodType"
                  id="bloodType"
                  component='select'
                  className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10">
                  {optionsBloodType.map((item, index) => (
                    <option
                      value={item.value}
                      key={index}>{item.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage component={"div"} className='text-red-400 text-sm' name="bloodType" />
              </div>
              <div className="w-2/3 flex justify-end">
                <div className="ml-auto">
                  <Image src={logoUNAPAM} alt="logoUNAPAM" className="size-32 mb-1 " />
                </div>
              </div>
            </div>
            <div className='space-y-6 my-5'>
              <FieldArray name="participantDisseases">
                {({ push, remove }) => (
                  <div className='bg-gray-dark rounded-lg' >
                    <div className='overflow-y-auto rounded-lg max-h-80'>
                      <table className="w-full ">
                        <thead className='bg-red-700' >
                          <tr className='flex justify-around text-center mx-10 items-center text-white h-12'>
                            <th className='w-full'>Enfermedad</th>
                            <th className='w-full'>Descripcion</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody >
                          {values.participantDisseases && values.participantDisseases.length > 0 &&
                            values.participantDisseases.map((participantDissease, index) => (
                              <tr className='flex justify-between space-x-5 mx-10 items-center text-white h-12' key={index}>
                                <td className='w-full'>
                                  <Field
                                    name={`participantDisseases.${index}.disease`}
                                    placeholder="Enfermedad"
                                    className="bg-dark-gray my-3 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 "
                                  />
                                  <ErrorMessage component={"div"} className='text-red-400 text-sm' name={`participantDisseases.${index}.disease`} />
                                </td>
                                <td className='w-full'>
                                  <Field
                                    name={`participantDisseases.${index}.description`}
                                    placeholder="Descripción"
                                    className="bg-dark-gray my-3 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 "
                                  />
                                  <ErrorMessage component={"div"} className='text-red-400 text-sm' name={`participantDisseases.${index}.description`} />
                                </td>
                                <td className=' text-center'>
                                  <button
                                    type="button"
                                    className="bg-red-500 text-white p-1 rounded my-3 flex justify-center items-center"
                                    onClick={() => confirmationAlertPromise(() => deleteDisease(index, remove, participantDissease.id))}>Eliminar <DeleteIcon size='size-8' /> </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      type="button"
                      className="m-4 w-44 bg-green-600 text-white flex gap-3 p-2 rounded-lg"
                      onClick={() => push({ disease: '', description: '', participantHealth: {}, participantHealthId: 0 })}>Agregar Enfermedad<PlusIcon /></button>
                  </div>
                )}
              </FieldArray>
              <FieldArray name="participantMedicines">
                {({ push, remove }) => (
                  <div className='bg-gray-dark rounded-lg' >
                    <div className='overflow-y-auto rounded-lg max-h-80'>
                      <table className="w-full">
                        <thead className='bg-red-700 rounded-lg sticky top-0'>
                          <tr className='flex justify-around text-center mx-10 items-center text-white h-12'>
                            <th className='w-full'>Medicina</th>
                            <th className='w-full'>Descripcion</th>
                            <th >Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {values.participantMedicines && values.participantMedicines.length > 0 &&
                            values.participantMedicines.map((participantMedicines, index) => (
                              <tr className='flex justify-between space-x-5 mx-10 items-center text-white h-12' key={index}>
                                <td className='w-full'>
                                  <Field
                                    name={`participantMedicines.${index}.medicine`}
                                    placeholder="Enfermedad"
                                    className="bg-dark-gray my-3 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 "
                                  />
                                  <ErrorMessage component={"div"} className='text-red-400 text-sm' name={`participantMedicines.${index}.medicine`} />
                                </td>
                                <td className='w-full'>
                                  <Field
                                    name={`participantMedicines.${index}.description`}
                                    placeholder="Descripción"
                                    className="bg-dark-gray my-3 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 "
                                  />
                                  <ErrorMessage component={"div"} className='text-red-400 text-sm' name={`participantMedicines.${index}.description`} />
                                </td>
                                <td className=' flex justify-center'>
                                  <button
                                    type="button" className="bg-red-500 text-white p-1 rounded my-3 flex justify-center items-center"
                                    onClick={() => confirmationAlertPromise(() => deleteMedicine(index, remove, participantMedicines.id))}>Eliminar <DeleteIcon size='size-8' /></button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      type="button"
                      className="m-4 w-44 bg-green-600 text-white p-2 flex gap-3 rounded-lg"
                      onClick={() => push({ medicine: '', description: '', participantHealth: {}, participantHealthId: 0 })}>Agregar Medicina<PlusIcon /></button>
                  </div>
                )}
              </FieldArray>
            </div>
            <div className="flex-initial w-1/4 text-white">
              <p className="text-xl font-bold text-light-gray">Personas de Contacto</p>
              <p className="text-lg my-5 font-bold text-light-gray">Persona #1</p>
              <label htmlFor="parentesco">Parentesco</label>
              <Field name="contactOne.relationship" id="bloodType" component='select' className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10">
                {optionsKinship.map((item, index) => (
                  <option value={item.value} key={index}>{item.label}</option>
                ))}
              </Field>
              <ErrorMessage component={"div"} className='text-red-400 text-sm' name={`contactOne.relationship`} />
            </div>
            <div className="flex items-center text-white">
              <div className="flex-initial w-1/3">
                <label htmlFor="contactOne.firstName">Nombre</label>
                <Field
                  name="contactOne.firstName" placeholder="Nombre"
                  className="bg-dark-gray placeholder:text-white/35 border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10" />
              <ErrorMessage component={"div"}  className='text-red-400 text-sm' name={`contactOne.firstName`} />
              </div>
              <div className="flex-initial w-1/3 pl-5 text-white">
                <label htmlFor="primerApellido">Primer Apellido</label>
                <Field
                  name="contactOne.firstSurname" placeholder="Apellido"
                  className="bg-dark-gray placeholder:text-white/35 border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10" />
                 <ErrorMessage component={"div"}  className='text-red-400 text-sm' name={`contactOne.firstSurname`} />
              </div>
              <div className="flex-initial w-1/3 pl-5 text-white">
                <label htmlFor="telefono">Teléfono</label>
                <Field
                  name="contactOne.phoneNumber" placeholder="xxxx-xxxx"
                  className="bg-dark-gray placeholder:text-white/35 border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10" />
                <ErrorMessage component={"div"}  className='text-red-400 text-sm' name={`contactOne.phoneNumber`} />
              </div>
            </div>
            <div className="flex-initial w-1/4 text-white">
              <p className="text-lg my-3 font-bold text-light-gray">Persona #2</p>
              <label htmlFor="parentesco">Parentesco</label>
              <Field name="contactTwo.relationship" component='select' className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10">
                {optionsKinship.map((item, index) => (
                  <option value={item.value} key={index}>{item.label}</option>
                ))}
              </Field>
            </div>
            <div className="flex items-center ">
              <div className="flex-initial w-1/3 text-white">
                <label htmlFor="nombre">Nombre</label>
                <Field
                  name="contactTwo.firstName" placeholder="Nombre"
                  className="bg-dark-gray border placeholder:text-white/35 border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10" />
               <ErrorMessage component={"div"}  className='text-red-400 text-sm' name={`contactTwo.firstName`} />
              </div>
              <div className="flex-initial w-1/3 pl-5 text-white">
                <label htmlFor="primerApellido">Primer Apellido</label>
                <Field
                  name="contactTwo.firstSurname" placeholder="Apellido"
                  className="bg-dark-gray placeholder:text-white/35 border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10" />
                <ErrorMessage component={"div"} className='text-red-400 text-sm' name={`contactTwo.firstSurname`} />
              </div>
              <div className="flex-initial w-1/3 pl-5 text-white">
                <label htmlFor="telefono">Teléfono</label>
                <Field
                  name="contactTwo.phoneNumber" placeholder="xxxx-xxxx"
                  className="bg-dark-gray placeholder:text-white/35 border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10" />
              <ErrorMessage component={"div"}  className='text-red-400 text-sm'  name={`contactTwo.phoneNumber`} />
              </div>
            </div>
            <div className="flex mt-10 justify-end items-end gap-5">
              <div className=' w-60 flex justify-end gap-5'>
                <div className="flex-initial w-full ">
                  <button className='text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 bg-red-gradient hover:bg-hover-red-gradient' type="submit" >Guardar</button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
