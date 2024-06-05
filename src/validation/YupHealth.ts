import * as Yup from 'yup';

export const validationSchemeHealth = Yup.object().shape({
    bloodType: Yup.string().notRequired(),
    participantDisseases:Yup.array().of(Yup.object().shape({
        disease: Yup.string().notRequired().max(191),
        description:Yup.string().notRequired().max(191)
    })),
    participantMedicines:Yup.array().of(Yup.object().shape({
        medicine: Yup.string().notRequired().max(191),
        description: Yup.string().notRequired().max(191),
    })),
    contactOne: Yup.object().shape({
      firstName: Yup.string().notRequired().max(191),
      firstSurname: Yup.string().notRequired().max(191),
      secondSurname: Yup.string().notRequired().max(191),
      phoneNumber: Yup.string().notRequired().max(191),
      relationship: Yup.string().notRequired().max(191)
    }).notRequired(),
    contactTwo: Yup.object().shape({
        firstName: Yup.string().notRequired().max(191),
        firstSurname: Yup.string().notRequired().max(191),
        secondSurname: Yup.string().notRequired().max(191),
        phoneNumber: Yup.string().notRequired().max(191),
        relationship: Yup.string().notRequired().max(191)
    }).notRequired(),
})