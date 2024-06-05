import { getUserByEmail, getUserByIdentification, getUserByPhoneNumber } from "@/services/usersService";

export async function validateFields(
    role: string,
    identification: string,
    firstName: string,
    firstSurname: string,
    secondSurname: string,
    phone: string,
    email: string,
    password: string,
    birthDate: string,
    isEditing: boolean
) {
    const errors = {
        role: !role ? "Role es requerido" : null,
        identification: !identification || isNaN(Number(identification)) ? "Identificación es un campo requerido y deben ser solo números" : null,
        firstName: !firstName || /\d/.test(firstName) ? "El nombre es un campo requerido y no debe contener números" : null,
        firstSurname: !firstSurname || /\d/.test(firstSurname) ? "Primer apellido es un campo requerido, no debe contener números" : null,
        secondSurname: !secondSurname || /\d/.test(secondSurname) ? "Segundo apellido es un campo requerido, no debe contener números" : null,
        phoneNumber: !phone || isNaN(Number(phone)) ? "El teléfono es requerido solo debe contener números" : null,
        email: !email ? "Email es un campo requerido" : null,
        password: !isEditing && (!password || password.length < 8) ? "La contraseña es un campo requerido y debe tener al menos 8 caracteres" : null,
        birthDate: !birthDate ? "Debe ingresar una fecha de nacimiento" : null,
    }
    return errors;
}

export async function validateUniqueFields(field: string, value: string) {
    if (field === "identification") {
        const userWithSameIdentification = await getUserByIdentification(value);
        if (userWithSameIdentification) {
            return { mensaje: "La identificación ingresada ya ha sido registrada anteriormente.", state: false };
        }
    } else if (field === "email") {
        if (!value.includes("@") || !value.includes(".")) {
            return { mensaje: "El correo electrónico ingresado no es válido.", state: false };
        }
        const userWithSameEmail = await getUserByEmail(value);
        if (userWithSameEmail) {
            return { mensaje: "El correo electrónico ingresado ya ha sido registrado anteriormente.", state: false };
        }
    } else if (field === "phoneNumber") {
        let message = "";
        let state = true;
        const userWithSamePhoneNumber = await getUserByPhoneNumber(value);
        if (userWithSamePhoneNumber) {
            message = "El número de teléfono ingresado ya ha sido registrado anteriormente.";
            state = false;
        }
        if (value.length !== 8 || isNaN(Number(value))) {
            message = "El número de teléfono ingresado no es válido.";
            state = false;
        }
        return { mensaje: message, state: state };
    }
}