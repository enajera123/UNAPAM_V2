'use client'
import React, { useState } from 'react'
import Button from '@/components/Button/Button';
import InputField from '@/components/InputField/InputField';
import logoUNAPAM from '@/resources/LogoColorful.webp';
import Image from 'next/image';
import { GoKey } from 'react-icons/go';
import { useUsersStore } from '@/store/usersStore';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useMainStore } from '@/store/MainStore/mainStore';
import { errorAlert, successAlert } from '@/utils/sweetAlert';

function ChangePassword() {

    const [newPassword, setNewPassword] = useState<string>('');
    const { putUserPassword } = useUsersStore();
    const router = useRouter();
    const { setLoader } = useMainStore();
    const searchParams = useSearchParams();

    const handleChangePassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const token = searchParams.get('token');
        const idParam = searchParams.get('id');
        const userId = Number(idParam);
        if (isNaN(userId)) {
            errorAlert("Error con el ID ingresado");
            return;
        }
        e.preventDefault()
        setLoader(true);
        const response = await putUserPassword(userId, token ?? '', newPassword);
        setLoader(false);
        if (response) {
            successAlert('Nueva contraseña establecida correctamente');
            router.push('/');
            return;
        }
        errorAlert('Contraseña temporal digitada incorrecta, intente nuevamente');
    }

    return (
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
                        <InputField label='Ingrese su nueva contraseña'
                            placeholder="Nueva contraseña"
                            iconStart={<GoKey color="white" />}
                            onChange={(e) => { setNewPassword(e.target.value) }}
                        />
                        <div className="flex justify-center mt-24">
                            <Button onClick={(e) => handleChangePassword(e)} className="bg-dark-red w-full max-w-md">Guardar</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword