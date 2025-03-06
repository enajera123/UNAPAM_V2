'use client'
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button/Button';
import InputField from '@/components/InputField/InputField';
import logoUNAPAM from '@/resources/LogoColorful.webp';
import Image from 'next/image';
import { HiOutlineIdentification } from 'react-icons/hi';
import { useUsersStore } from '@/store/usersStore'
import { useMainStore } from "@/store/MainStore/mainStore";
import { useRouter } from 'next/navigation';
import { errorAlert, successAlert } from '@/utils/sweetAlert';
import { Form, Formik } from 'formik';
import { ForgotPasswordSchema, getInitialValuesForgorPassword } from '@/types/schemas/forgotPasswordSchema';
import { ForgotPasswordInterface } from '@/types/schemas/interfaces/interfaces';

function ForgotPassword() {
    const { sendRecoveryEmail } = useUsersStore();
    const { setLoader } = useMainStore()
    const router = useRouter();
    const handleSubmit = async (values: ForgotPasswordInterface) => {
        setLoader(true);
        try {
            const response = await sendRecoveryEmail(values.identification);
          console.log(response)
            if (response) {
                successAlert('Correo con su contraseña temporal, enviado correctamente');
                router.push('/');
            } else {
                errorAlert('Identificación no encontrada, intente nuevamente');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoader(false);
        }
    }
    return (
        <Formik validationSchema={ForgotPasswordSchema} initialValues={getInitialValuesForgorPassword()} onSubmit={handleSubmit}>
            <Form>
                <div className="bg-light-gray h-screen flex items-center">
                    <div className="container grid grid-cols-3 items-center mx-auto max-w-3xl">
                        <div className="col-span-1 grid grid-col-2">
                            <div className="container bg-white  p-4 flex flex-col items-center rounded-l-3xl">
                                <p className="text-2xl font-bold text-medium-gray text-center">Recuperación de contraseña</p>
                                <Image src={logoUNAPAM} alt="logoUNAPAM" className="w-64 h-auto" />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="container bg-gray-gradient px-10 py-20 rounded-3xl">
                                <InputField
                                    name='identification'
                                    label=''
                                    placeholder="Identificación"
                                    iconStart={<HiOutlineIdentification color="white" />}
                                />
                                <div className="text-white text-lm text-right mt-5">Ingrese su identificación para realizar el envío de
                                    una nueva contraseña, al correo electrónico registrado.</div>
                                <div className="flex justify-center mt-24">

                                    <Button type='submit' className="bg-dark-red w-full max-w-md">Enviar</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default ForgotPassword