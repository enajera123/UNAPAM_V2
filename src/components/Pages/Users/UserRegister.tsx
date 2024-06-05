import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import Select from "@/components/Select/Select";
import { BsDiagram3 } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import logoUNAPAM from '@/resources/LogoColorful.webp';
import Image from 'next/image';
import { HiOutlineIdentification } from "react-icons/hi";
import { GoKey, GoPerson } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { useEffect, useState } from "react";
import { useUsersStore } from "@/store/usersStore";
import { useRouter } from "next/navigation";
import { Role, State, User } from "@/types/prisma";
import { validateFields, validateUniqueFields } from "./validateUserFields";
import { errorAlert } from "@/utils/sweetAlert";
import { useMainStore } from "@/store/MainStore/mainStore";

function UserRegister({ user }: { user: User | null }) {
    const [rol, setRol] = useState("User");
    const [identification, setIdentification] = useState("");
    const [name, setName] = useState("");
    const [firstSurname, setFirstSurname] = useState("");
    const [secondSurname, setSecondSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [date, setDate] = useState("");
    const { putUser, postUser } = useUsersStore()
    const router = useRouter();

    const optionsRol = [
        { value: "Admin", label: "Administrador" },
        { value: "User", label: "Usuario" },
    ];
    const handleSaveUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const isEditing = !!user?.id;
        const errors = await validateFields(rol, identification, name, firstSurname, secondSurname, phone, email, password, date, isEditing)
        if (Object.values(errors).some(error => error)) {
            const firstError = Object.values(errors).find(Boolean);
            errorAlert(firstError ?? "Por favor, complete todos los campos correctamente");
            return;
        }
        if (!user?.id || user && (user.identification !== identification || user.email !== email || user.phoneNumber !== phone)) {
        
            if (user?.identification !== identification) {
                const uniqueFieldValidation = await validateUniqueFields('identification', identification);
                if (!uniqueFieldValidation?.state && uniqueFieldValidation?.mensaje) {
                    errorAlert(uniqueFieldValidation.mensaje)
                    return;
                }
            }
        
            if (user?.email !== email) {
                const uniqueFieldValidation = await validateUniqueFields('email', email);
                if (!uniqueFieldValidation?.state && uniqueFieldValidation?.mensaje) {
                    errorAlert(uniqueFieldValidation.mensaje)
                    return;
                }
            }
        
            if (user?.phoneNumber !== phone) {
                const uniqueFieldValidation = await validateUniqueFields('phoneNumber', phone);
                if (!uniqueFieldValidation?.state && uniqueFieldValidation?.mensaje) {
                    errorAlert(uniqueFieldValidation.mensaje)
                    return;
                }
            }
        }
        const newUser = {
            role: rol as unknown as Role,
            identification,
            firstName: name,
            firstSurname,
            secondSurname,
            phoneNumber: phone,
            email,
            password,
            isPasswordChanged: "n",
            birthDate: date,
            state: "Active" as unknown as State
        }
        const response = user !== null ? await putUser(user?.id ?? 0, newUser) : await postUser(newUser)
        if (response) {
            router.push('/admin/users')
        }
    }
    useEffect(() => {
        if (user) {
            setIdentification(user.identification)
            setName(user.firstName)
            setFirstSurname(user.firstSurname)
            setSecondSurname(user.secondSurname)
            setPhone(user.phoneNumber)
            setEmail(user.email)
            setPassword(user.password)
            setDate(user.birthDate)
            setRol(user.role.toString())
        }
    }, [user])
    return (
        <div className="container grid grid-cols-3 gap-0 mx-auto px-36 my-4 items-center">
            <div className="col-span-1 ">
                <div className="container bg-light-gray max-h-sm p-6 flex flex-col items-center justify-center rounded-l-3xl">
                    <p className="text-3xl font-bold text-medium-gray text-center">Registro</p>
                    <Image src={logoUNAPAM} alt="logoUNAPAM" className="w-64 h-auto" />
                </div>
            </div>
            <div className="col-span-2">
                <div className="container bg-gray-gradient grid grid-cols-2 gap-4 p-10 rounded-3xl">
                    <div className="col-span-1">
                        <InputField
                            value={identification}
                            onChange={(e) => setIdentification(e.target.value)}
                            label="Identificación"
                            placeholder="Identificación"
                            iconStart={<HiOutlineIdentification color="white" />} />
                        <InputField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Nombre"
                            placeholder="Nombre"
                            iconStart={<GoPerson color="white" />} />
                    </div>
                    <div>
                        <Select
                            label="Rol"
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                            placeholder="Roles"
                            icon={<BsDiagram3 color="white" />}
                            options={optionsRol} />
                    </div>
                    <div>
                        <InputField
                            value={firstSurname}
                            onChange={(e) => setFirstSurname(e.target.value)}
                            label="Primer Apellido"
                            placeholder="Primer Apellido"
                            iconStart={<GoPerson color="white" />}
                        />
                    </div>
                    <div>
                        <InputField
                            value={secondSurname}
                            onChange={(e) => setSecondSurname(e.target.value)}
                            label="Segundo Apellido"
                            placeholder="Segundo Apellido"
                            iconStart={<GoPerson color="white" />} />
                    </div>
                    <div>
                        <InputField
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            label="Teléfono"
                            placeholder="Teléfono"
                            iconStart={<FiPhoneCall color="white" />} />
                        <InputField
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            label="Fecha de nacimiento"
                            placeholder="Fecha de nacimiento"
                            type="date"
                            iconStart={<FaRegCalendarAlt color="white" />} />
                    </div>
                    <div>
                        <InputField
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            placeholder="Email"
                            iconStart={<MdOutlineEmail color="white" />} />
                        <InputField
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Contraseña"
                            placeholder="Contraseña"
                            type="password"
                            iconStart={<GoKey color="white" />} />
                    </div>
                    <Button onClick={(e) => handleSaveUser(e)} className="bg-red-gradient">Registrar</Button>
                </div>
            </div>
        </div>
    )
}

export default UserRegister