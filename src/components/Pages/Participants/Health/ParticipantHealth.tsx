import * as React from 'react';
import { Formik, Field, Form, FormikHelpers, FieldArray } from 'formik';
import logoUNAPAM from '@/resources/LogoWhite.webp';
import Image from 'next/image';
import { Participant, ParticipantHealth, crearParticipantHealth } from '@/types/prisma';
import { useParticipantHealthStore } from '@/store/participantHealthStore';
import { confirmationAlert, confirmationAlertPromise, errorAlert, successAlert } from '@/utils/sweetAlert';
import { useParticipantDisseaseStore } from '@/store/participantDisseaseStore';
import { useParticipantMedicineStore } from '@/store/participantMedicineStore';
import { DeleteIcon, PlusIcon } from '@/components/Icons/Icons';




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
  const {postParticipantHealth,putParticipantHealth} =  useParticipantHealthStore()
  const {deleteParticipantDisease} = useParticipantDisseaseStore()
  const {deleteParticipantMedicine} = useParticipantMedicineStore()
  
  const [initialValues,setInitialValues] = React.useState<ParticipantHealth>(crearParticipantHealth());

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


  const onSubmit =async (values: ParticipantHealth) => {
    try {
      if(!participant?.id) return errorAlert("No se ha seleccionado un participante")
      if(!values.id){
        const data = await postParticipantHealth({...values,participantId:participant?.id!})
        if(data){
          console.log(data)
          setInitialValues(data)
          return successAlert("Información de salud guardada correctamente")
        }
      }else{
        const data = await putParticipantHealth(values.id,{...values,participantId:participant?.id!})
        if(data){
          console.log(data)
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


  const deleteDisease = async (id:number, remove:(i:number)=>void,diseaseId:number|undefined) => {
    if(!diseaseId) return remove(id)
    try {
      const data = await deleteParticipantDisease(diseaseId)
      if(data){
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

  const deleteMedicine = async (id:number, remove:(i:number)=>void,medicineId:number|undefined) => {
    if(!medicineId) return remove(id)
    try {
      const data = await deleteParticipantMedicine(medicineId)
      if(data){
        setInitialValues((i) => ({
          ...i,
          participantMedicines: i.participantMedicines?.filter((medicine) => medicine.id !== medicineId),
        }))
        successAlert("Medicina eliminada correctamente")
        return remove(id)
      }
      errorAlert("Error al eliminar la medicina")
    } catch (error) {
      console.log(error)
      errorAlert("Error al eliminar la medicina")
    }
  }


  React.useEffect(() => {
    console.log(participant)
  }, [participant]);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
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
              </div>
              <div className="w-2/3 flex justify-end">
                <div className="ml-auto">
                  <Image src={logoUNAPAM} alt="logoUNAPAM" className="size-32 " />
                </div>
              </div>
            </div>
            <FieldArray name="participantDisseases">
              {({ push, remove }) => (
                <div className='bg-gray-dark overflow-y-auto max-h-80 '>
                  <table className="min-w-full">
                    <thead className='bg-red-gradient sticky top-0'>
                      <tr className=' text-white h-12'>
                        <th>Enfermedad</th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody className=''>
                      {values.participantDisseases && values.participantDisseases.length > 0 &&
                        values.participantDisseases.map((participantDissease, index) => (
                          <tr key={index}>
                            <td>
                              <Field
                                name={`participantDisseases.${index}.disease`}
                                placeholder="Enfermedad"
                                className="bg-dark-gray my-3 border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 mr-10 ml-5"
                              />
                            </td>
                            <td>
                              <Field
                                name={`participantDisseases.${index}.description`}
                                placeholder="Descripción"
                                className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 ml-10 mr-5 my-3"
                              />
                            </td>
                            <td className=' flex justify-center'>
                              <button
                                type="button"
                                className="bg-red-500 text-white p-1 rounded my-3 flex justify-center items-center"
                                onClick={() => confirmationAlertPromise(deleteDisease(index,remove,participantDissease.id))}>Eliminar <DeleteIcon size='size-8' /> </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <button
                    type="button"
                    className="mt-4 w-52 bg-green-600 text-white p-2 rounded-lg m-5 flex justify-center items-center gap-1 "
                    onClick={() => push({ disease: '', description: '', participantHealth: {}, participantHealthId: 0 })}>Agregar Enfermedad <PlusIcon size='size-7'/></button>
                </div>
              )}
            </FieldArray>
            <FieldArray name="participantMedicines">
              {({ push, remove }) => (
                <div className='bg-gray-dark overflow-y-auto max-h-80 mt-5 '>
                  <table className="min-w-full  ">
                    <thead className='bg-red-gradient sticky top-0'>
                      <tr className=' text-white h-12'>
                        <th>Medicina</th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody >
                      {values.participantMedicines && values.participantMedicines.length > 0 &&
                        values.participantMedicines.map((participantMedicines, index) => (
                          <tr key={index}>
                            <td>
                              <Field
                                name={`participantMedicines.${index}.medicine`} placeholder="Medicina"
                                className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 mr-10 ml-5 my-3"
                              />
                            </td>
                            <td>
                              <Field
                                name={`participantMedicines.${index}.description`} placeholder="Descripción"
                                className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 ml-10 mr-5 my-3"
                              />
                            </td>
                            <td className=' flex justify-center'>
                              <button
                                type="button" className="bg-red-500 text-white p-1 rounded my-3 flex justify-center items-center"
                                onClick={() => confirmationAlertPromise(deleteMedicine(index,remove,participantMedicines.id))}>Eliminar <DeleteIcon size='size-8' /></button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <button
                    type="button" className="my-4 bg-green-600 text-white p-2 rounded-lg w-52 m-5 flex justify-center items-center gap-1"
                    onClick={() => push({ medicine: '', description: '', participantHealth: {}, participantHealthId: 0 })}>Agregar Medicina <PlusIcon size='size-7'/></button>
                </div>
              )}
            </FieldArray>
            <div className="flex-initial w-1/4 text-white">
              <p className="text-xl font-bold text-light-gray">Personas de Contacto</p>
              <p className="text-lg my-5 font-bold text-light-gray">Persona #1</p>
              <label htmlFor="parentesco">Parentesco</label>
              <Field name="contactOne.relationship" id="bloodType" component='select' className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10">
                {optionsKinship.map((item, index) => (
                  <option value={item.value} key={index}>{item.label}</option>
                ))}
              </Field>
            </div>
            <div className="flex items-center text-white">
              <div className="flex-initial w-1/3">
                <label htmlFor="contactOne.firstName">Nombre</label>
                <Field
                  name="contactOne.firstName" placeholder="Nombre"
                  className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10" />
              </div>
              <div className="flex-initial w-1/3 pl-5 text-white">
                <label htmlFor="primerApellido">Primer Apellido</label>
                <Field
                  name="contactOne.firstSurname" placeholder="Apellido"
                  className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10" />
              </div>
              <div className="flex-initial w-1/3 pl-5 text-white">
                <label htmlFor="telefono">Teléfono</label>
                <Field
                  name="contactOne.phoneNumber" placeholder="xxxx-xxxx"
                  className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10" />
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
                  className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10" />
              </div>
              <div className="flex-initial w-1/3 pl-5 text-white">
                <label htmlFor="primerApellido">Primer Apellido</label>
                <Field
                  name="contactTwo.firstSurname"placeholder="Apellido"
                  className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10" />
              </div>
              <div className="flex-initial w-1/3 pl-5 text-white">
                <label htmlFor="telefono">Teléfono</label>
                <Field
                  name="contactTwo.phoneNumber" placeholder="xxxx-xxxx"
                  className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10" />
              </div>
            </div>
            <div className="flex mt-10 justify-end items-end gap-5">
              <div className=' w-60 flex justify-end gap-5'>
                <div className="flex-initial w-full ">
                  <button className='text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 bg-red-gradient hover:bg-hover-red-gradient' type="submit" >Guardar</button>
                </div>
                <div className="flex-initial w-full">
                  <button className='text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 bg-red-gradient hover:bg-hover-red-gradient'>Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
