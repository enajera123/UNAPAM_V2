import * as Yup from 'yup';

export const validationSchemeHealth = Yup.object().shape({
    bloodType: Yup.string().required("El tipo de sangre es requerido"),
    participantDisseases:Yup.array().of(Yup.object().shape({
        disease: Yup.string().required("Campo requerido").max(191),
        description:Yup.string().required("Campo requerido").max(191)
    })),
    participantMedicines:Yup.array().of(Yup.object().shape({
        medicine: Yup.string().required("Campo requerido").max(191),
        description: Yup.string().required("Campo requerido").max(191),
    })),
    contactOne: Yup.object().shape({
      firstName: Yup.string().required("Campo requerido").max(191),
      firstSurname: Yup.string().required("Campo requerido").max(191),
      secondSurname: Yup.string().required("Campo requerido").max(191),
      phoneNumber: Yup.string().required("Campo requerido").max(191),
      relationship: Yup.string().required("Campo requerido").max(191)
    }),
    contactTwo: Yup.object().shape({
        firstName: Yup.string().required("Campo requerido").max(191),
        firstSurname: Yup.string().required("Campo requerido").max(191),
        secondSurname: Yup.string().required("Campo requerido").max(191),
        phoneNumber: Yup.string().required("Campo requerido").max(191),
        relationship: Yup.string().required("Campo requerido").max(191)
    }),
})