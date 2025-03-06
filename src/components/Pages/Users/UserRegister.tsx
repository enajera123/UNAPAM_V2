import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import Select from "@/components/Select/Select";
import { FaRegCalendarAlt } from "react-icons/fa";
import logoUNAPAM from '@/resources/LogoColorful.webp';
import Image from 'next/image';
import { HiOutlineIdentification } from "react-icons/hi";
import { GoKey, GoPerson } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { useUsersStore } from "@/store/usersStore";
import { useRouter } from "next/navigation";
import { Form, Formik } from "formik";
import { User } from "@prisma/client";
import { getInitialValuesUser, UserSchema } from "@/types/schemas/userRegisterSchema";

function UserRegister({ user }: { user: User | null }) {
    const { createUser, updateUser } = useUsersStore()
    const router = useRouter();

    const handleSubmit = async (values: User) => {
        const newUser = {
            ...values,
        } as User

        const response = user !== null ? await updateUser(user?.id ?? 0, newUser) : await createUser(newUser)
        if (response) {
            router.push('/admin/users')
        }
    }
    return (
        <Formik enableReinitialize validationSchema={UserSchema} onSubmit={handleSubmit} initialValues={getInitialValuesUser(user)} >
            <Form>
                <div className="container grid grid-cols-3 gap-0 mx-auto px-36 my-4 items-center">
                    <div className="col-span-1 ">
                        <div className="container bg-light-gray max-h-sm p-6 flex flex-col items-center justify-center rounded-l-3xl">
                            <p className="text-3xl font-bold text-gray-600 text-center">Registro de Usuarios</p>
                            <Image src={logoUNAPAM} alt="logoUNAPAM" className="w-64 h-auto" />
                        </div>
                    </div>
                    <div className="col-span-2">
                        <div className="container bg-gray-gradient grid grid-cols-2 gap-4 p-10 rounded-3xl">
                            <div className="col-span-1">
                                <InputField
                                    name="identification"
                                    label="Identificación"
                                    placeholder="Identificación"
                                    iconStart={<HiOutlineIdentification color="white" />} />
                                <InputField
                                    name="firstName"
                                    label="Nombre"
                                    placeholder="Nombre"
                                    iconStart={<GoPerson color="white" />} />
                            </div>
                            <div>
                                <Select
                                    className={`bg-dark-gray border border-white text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-dark-gray dark:border-white dark:placeholder-gray-400 dark:text-white `}
                                    label="Rol"
                                    name="role"
                                >
                                    <option value="Admin">Administrador</option>
                                    <option value="User">Usuario</option>
                                </Select>
                            </div>
                            <div>
                                <InputField
                                    name="firstSurname"
                                    label="Primer Apellido"
                                    placeholder="Primer Apellido"
                                    iconStart={<GoPerson color="white" />}
                                />
                            </div>
                            <div>
                                <InputField
                                    name="secondSurname"
                                    label="Segundo Apellido"
                                    placeholder="Segundo Apellido"
                                    iconStart={<GoPerson color="white" />} />
                            </div>
                            <div>
                                <InputField
                                    name="phoneNumber"
                                    label="Teléfono"
                                    placeholder="Teléfono"
                                    iconStart={<FiPhoneCall color="white" />} />
                                <InputField
                                    name="birthDate"
                                    label="Fecha de nacimiento"
                                    placeholder="Fecha de nacimiento"
                                    type="date"
                                    iconStart={<FaRegCalendarAlt color="white" />} />
                            </div>
                            <div>
                                <InputField
                                    name="email"
                                    label="Email"
                                    placeholder="Email"
                                    iconStart={<MdOutlineEmail color="white" />} />
                                {user === null && <InputField
                                    name="password"
                                    label="Contraseña"
                                    placeholder="Contraseña"
                                    type="password"
                                    iconStart={<GoKey color="white" />} />}
                            </div>
                            <Button type="submit" className="bg-red-gradient">Registrar</Button>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

export default UserRegister