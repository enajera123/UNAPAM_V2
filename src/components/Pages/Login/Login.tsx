'use client'
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button/Button';
import InputField from '@/components/InputField/InputField';
import logoUNAPAM from '@/resources/LogoColorful.png';
import Image from 'next/image';
import Link from 'next/link';
import { GoKey } from 'react-icons/go';
import { HiOutlineIdentification } from 'react-icons/hi';
import { useUsersStore } from '@/store/usersStore'
import { useRouter } from 'next/navigation';
import { User } from '@/types/prisma';
import useAuthState from '@/store/MainStore/userLoggedStore';

function Login() {

    const [identificacion, setIdentificacion] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { authenticateUser } = useUsersStore();
    const { setUser, setUserLoggued } = useAuthState();
    const router = useRouter();

    const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const authenticatedUser:User|null = await authenticateUser(identificacion, password);
        if (authenticatedUser) {
            setUser(authenticatedUser);
            setUserLoggued(true);
            if(authenticatedUser.isPasswordChanged === 's') {
                router.push('/admin/changePassword');
                return;
            }
            router.push('/admin/information');
        }
        else {
            alert('Credenciales incorrectas');
        }
    };

    return (
        <div className="bg-light-gray h-screen flex items-center">
            <div className="container grid grid-cols-3 items-center mx-auto max-w-3xl">
                <div className="col-span-1 grid grid-col-2">
                    <div className="container bg-white  p-4 flex flex-col items-center rounded-l-3xl">
                        <p className="text-2xl font-bold text-medium-gray text-center">Ingreso al sistema</p>
                        <Image src={logoUNAPAM} alt="logoUNAPAM" className="w-64 h-auto" />
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="container bg-gray-gradient px-10 py-20 rounded-3xl">
                        <InputField
                            label="Identificación"
                            placeholder="Identificación"
                            iconStart={<HiOutlineIdentification color="white" />} 
                            onChange={(e) => {setIdentificacion(e.target.value)}}
                            />
                        <InputField
                            label="Contraseña"
                            placeholder="Contraseña"
                            type="password"
                            iconStart={<GoKey color="white" />} 
                            onChange={(e) => {setPassword(e.target.value)}}
                            />
                        <Link href="/forgotPassword">
                            <div className="text-white text-lg text-right">¿Recuperar contraseña?</div>
                        </Link>
                        <Link href="/admin/information" >
                            <div className="flex justify-center mt-24">
                                <Button onClick={handleSave} className="bg-dark-red w-full max-w-md">Ingresar</Button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login