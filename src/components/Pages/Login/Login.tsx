'use client'
import React, { useState } from 'react'
import Button from '@/components/Button/Button';
import InputField from '@/components/InputField/InputField';
import logoUNAPAM from '@/resources/LogoColorful.webp';
import Image from 'next/image';
import Link from 'next/link';
import { GoKey } from 'react-icons/go';
import { HiOutlineIdentification } from 'react-icons/hi';
import { useUsersStore } from '@/store/usersStore'
import { useRouter } from 'next/navigation';
import { errorAlert, warningAlert, successAlert } from '@/utils/sweetAlert';
import { Form, Formik } from 'formik';
import { LoginInterface } from '@/types/schemas/interfaces/interfaces';
import { getInitialValuesLogin, LoginSchema } from '@/types/schemas/loginSchema';
import { useMainStore } from '@/store/MainStore/mainStore';
import { User } from '@prisma/client';

function Login() {
    const { authenticateUser, changePassword } = useUsersStore();
    const router = useRouter();
    const { setLoader } = useMainStore();
    const [passwordChangeRequired, setPasswordChangeRequired] = useState(false);
    const [userId, setUserId] = useState<number | null>(null);

    const handleLogin = async ({ identification, password }: LoginInterface) => {
        setLoader(true);
        try {
            const user: User | null = await authenticateUser(identification, password);
            if (!user) return errorAlert('Identificación o contraseña incorrecta, intente nuevamente');

            if (user.isPasswordChanged === 'Yes') {
                setUserId(user.id);
                setPasswordChangeRequired(true);
                return warningAlert('Su contraseña ha sido modificada. Por favor, establezca una nueva contraseña.');
            }

            router.push('/admin/information');
        } catch {
            errorAlert('Identificación o contraseña incorrecta, intente nuevamente');
        } finally {
            setLoader(false);
        }
    };

    const handlePasswordChange = async ({ newPassword }: { newPassword: string }) => {
        if (!userId) return;
        setLoader(true);
        try {
            const response = await changePassword(userId, newPassword);
            if (!response?.id) return errorAlert('Error al actualizar la contraseña. Intente nuevamente.');
            successAlert('Contraseña actualizada con éxito. Inicie sesión nuevamente.');
            setPasswordChangeRequired(false);
            router.push('/admin/information');
        } catch {
            errorAlert('Error al actualizar la contraseña. Intente nuevamente.');
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="bg-light-gray h-screen flex items-center">
            <div className="container grid grid-cols-3 items-center mx-auto max-w-3xl">
                <div className="col-span-1 grid grid-col-2">
                    <div className="container bg-white p-4 flex flex-col items-center rounded-l-3xl">
                        <p className="text-2xl font-bold text-medium-gray text-center">
                            {passwordChangeRequired ? 'Cambiar Contraseña' : 'Ingreso al sistema'}
                        </p>
                        <Image src={logoUNAPAM} alt="logoUNAPAM" className="w-64 h-auto" />
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="container bg-gray-gradient px-10 py-20 rounded-3xl">
                        {!passwordChangeRequired ? (
                            <Formik initialValues={getInitialValuesLogin()} onSubmit={handleLogin} validationSchema={LoginSchema}>
                                <Form>
                                    <InputField
                                        name='identification'
                                        label="Identificación"
                                        placeholder="Identificación"
                                        iconStart={<HiOutlineIdentification color="white" />}
                                    />
                                    <InputField
                                        name='password'
                                        label="Contraseña"
                                        placeholder="Contraseña"
                                        type="password"
                                        iconStart={<GoKey color="white" />}
                                    />
                                    <Link href="/forgotPassword">
                                        <div className="text-white text-lg text-right">¿Recuperar contraseña?</div>
                                    </Link>
                                    <div className="flex justify-center mt-24">
                                        <Button type='submit' className="bg-dark-red w-full max-w-md">Ingresar</Button>
                                    </div>
                                </Form>
                            </Formik>
                        ) : (
                            <Formik initialValues={{ newPassword: '' }} onSubmit={handlePasswordChange}>
                                <Form>
                                    <InputField
                                        name='newPassword'
                                        label="Nueva Contraseña"
                                        placeholder="Ingrese su nueva contraseña"
                                        type="password"
                                        iconStart={<GoKey color="white" />}
                                    />
                                    <div className="flex justify-center mt-24">
                                        <Button type='submit' className="bg-dark-red w-full max-w-md">Actualizar Contraseña</Button>
                                    </div>
                                </Form>
                            </Formik>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;