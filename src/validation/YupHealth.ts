import * as Yup from 'yup';

export const validationSchemeHealth = Yup.object().shape({
    bloodType: Yup.string().required("El tipo de sangre es requerido"),
    participantDisseases:Yup.array().of(Yup.object().shape({
        disease: Yup.string().required("Campo requerido"),
        description:Yup.string().required("Campo requerido")
    })),
    participantMedicines:Yup.array().of(Yup.object().shape({
        medicine: Yup.string().required("Campo requerido"),
        description: Yup.string().required("Campo requerido"),
    })),
    contactOne: Yup.object().shape({
      firstName: Yup.string().required("Campo requerido"),
      firstSurname: Yup.string().required("Campo requerido"),
      secondSurname: Yup.string().required("Campo requerido"),
      phoneNumber: Yup.string().required("Campo requerido"),
      relationship: Yup.string().required("Campo requerido")
    }),
    contactTwo: Yup.object().shape({
        firstName: Yup.string().required("Campo requerido"),
        firstSurname: Yup.string().required("Campo requerido"),
        secondSurname: Yup.string().required("Campo requerido"),
        phoneNumber: Yup.string().required("Campo requerido"),
        relationship: Yup.string().required("Campo requerido")
    }),
})