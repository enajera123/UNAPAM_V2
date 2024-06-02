import * as React from 'react';
import { Formik, Field, Form, FormikHelpers, FieldArray } from 'formik';
import logoUNAPAM from '@/resources/LogoWhite.webp';
import Image from 'next/image';
import { Participant, ParticipantHealth, crearParticipantHealth } from '@/types/prisma';


const initialValues: ParticipantHealth = crearParticipantHealth();

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
  { value: "A+", label: "Hijo/a" },
  { value: "A-", label: "Pareja/Conyugue" },
  { value: "B+", label: "Hermano/a" },
  { value: "B-", label: "Otro" },
];

export default function Health({ participant }: { participant: Participant | null }) {
  const onSubmit = (values: ParticipantHealth) => {
    console.log(values)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values }) => (
        <Form className=' flex gap-5 flex-col'>
          <div className="container mx-auto bg-gray-gradient p-10 my-4 rounded-3xl ">
            <div className="flex flex-row items-center">
              <div className="flex-initial w-2/6">
                <label htmlFor="bloodType">Blood Type</label>
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
                  <Image
                    src={logoUNAPAM}
                    alt="logoUNAPAM"
                    className="w-64 h-auto" />
                </div>
              </div>
            </div>
            <FieldArray name="participantDisseases">
              {({ push, remove }) => (
                <div>
                  <table className="min-w-full border-2 border-x-8 mt-5">
                    <thead>
                      <tr className=' text-white h-12'>
                        <th>Enfermedad</th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
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
                                className="bg-red-500 text-white p-1 rounded my-3"
                                onClick={() => remove(index)}>Eliminar</button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <button
                    type="button"
                    className="mt-4 w-44 bg-green-600 text-white p-2 rounded-lg"
                    onClick={() => push({ disease: '', description: '', participantHealth: {}, participantHealthId: 0 })}>Agregar Enfermedad</button>
                </div>
              )}
            </FieldArray>
            <FieldArray name="participantMedicines">
              {({ push, remove }) => (
                <div>
                  <table className="min-w-full border-2 border-x-8 mt-5">
                    <thead>
                      <tr className=' text-white h-12'>
                        <th>Medicina</th>
                        <th>Descripcion</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.participantMedicines && values.participantMedicines.length > 0 &&
                        values.participantMedicines.map((participantMedicines, index) => (
                          <tr key={index}>
                            <td>
                              <Field
                                name={`participantMedicines.${index}.medicine`}
                                placeholder="Enfermedad"
                                className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 mr-10 ml-5 my-3"
                              />
                            </td>
                            <td>
                              <Field
                                name={`participantMedicines.${index}.description`}
                                placeholder="Descripción"
                                className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 ml-10 mr-5 my-3"
                              />
                            </td>
                            <td className=' flex justify-center'>
                              <button
                                type="button"
                                className="bg-red-500 text-white p-1 rounded my-3"
                                onClick={() => remove(index)}>Eliminar</button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <button
                    type="button"
                    className="my-4 bg-green-600 text-white p-2 rounded-lg w-44"
                    onClick={() => push({ medicine: '', description: '', participantHealth: {}, participantHealthId: 0 })}>Agregar Medicina</button>
                </div>
              )}
            </FieldArray>
            <div className="flex-initial w-1/4">
              <p className="text-xl font-bold text-light-gray">Personas de Contacto</p>
              <p className="text-lg my-5 font-bold text-light-gray">Persona #1</p>
              <label htmlFor="parentesco">Parentesco</label>
              <Field name="contactOne.relationship" id="bloodType" component='select' className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10">
                {optionsKinship.map((item, index) => (
                  <option value={item.value} key={index}>{item.label}</option>
                ))}
              </Field>
            </div>
            <div className="flex items-center ">
              <div className="flex-initial w-1/3">
                <label htmlFor="contactOne.firstName">Nombre</label>
                <Field
                  name="contactOne.firstName"
                  placeholder="Ana"
                  className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10" />
              </div>
              <div className="flex-initial w-1/3 pl-5">
                <label htmlFor="primerApellido">Primer Apellido</label>
                <Field
                  name="contactOne.firstSurname"
                  placeholder="Mora"
                  className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10" />
              </div>
              <div className="flex-initial w-1/3 pl-5">
                <label htmlFor="telefono">Teléfono</label>
                <Field
                  name="contactOne.phoneNumber"
                  placeholder="xxxx-xxxx"
                  className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10" />
              </div>
            </div>
            <div className="flex-initial w-1/4">
              <p className="text-lg my-5 font-bold text-light-gray">Persona #2</p>
              <label htmlFor="parentesco">Parentesco</label>
              <Field name="contactTwo.relationship" component='select' className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10">
                {optionsKinship.map((item, index) => (
                  <option value={item.value} key={index}>{item.label}</option>
                ))}
              </Field>
            </div>
            <div className="flex items-center ">
              <div className="flex-initial w-1/3">
                <label htmlFor="nombre">Nombre</label>
                <Field
                  name="contactTwo.firstName"
                  placeholder="Ana"
                  className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10" />
              </div>
              <div className="flex-initial w-1/3 pl-5">
                <label htmlFor="primerApellido">Primer Apellido</label>
                <Field
                  name="contactTwo.firstSurname"
                  placeholder="Mora"
                  className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10" />
              </div>
              <div className="flex-initial w-1/3 pl-5">
                <label htmlFor="telefono">Teléfono</label>
                <Field
                  name="contactTwo.phoneNumber"
                  placeholder="xxxx-xxxx"
                  className="bg-dark-gray border border-gray-300 text-white placeholder:text-white text-sm rounded-lg block w-full p-2.5 pl-10 pr-10" />
              </div>
            </div>
            <div className="flex mt-10 justify-end items-end gap-5">
              <div className=' w-60 flex justify-end gap-5'>
                <div className="flex-initial w-full ">
                  <button className='text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 bg-red-gradient hover:bg-hover-red-gradient' type="submit" >Submit</button>
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
