import { faker } from "@faker-js/faker"
import { Grade, PrismaClient, State, StateParticipantOnCourse, TypeIdentification, YesOrNo } from "@prisma/client";
const prisma = new PrismaClient();
async function seedDatabase() {
    try {
        for (let index = 0; index < 500; index++) {
            await prisma.participant.create({
                data: {
                    email: faker.internet.email(),
                    birthDate: faker.date.birthdate().toISOString(),
                    firstName: faker.person.firstName(),
                    firstSurname: faker.person.lastName(),
                    secondSurname: faker.person.lastName(),
                    hasWhatsApp: faker.helpers.arrayElement([YesOrNo.Yes, YesOrNo.No]),
                    phoneNumber: faker.phone.number(),
                    identification: faker.string.uuid(),
                    typeIdentification: faker.helpers.arrayElement([TypeIdentification.DIMEX, TypeIdentification.Nacional]),
                    grade: faker.helpers.arrayElement([Grade.Primaria_Completa, Grade.Primaria_Incompleta, Grade.Secundaria_Completa, Grade.Secundaria_Incompleta, Grade.Sin_Estudio, Grade.Universidad_Completa, Grade.Universidad_Incompleta])
                }
            })
        }
        // Array.from({ length: 500 }).forEach(async (_, index) => {
        for (let index = 0; index < 500; index++) {
            await prisma.course.create({
                data: {
                    name: faker.lorem.words(),
                    description: faker.lorem.paragraph(),
                    initialDate: faker.date.past().toISOString(),
                    finalDate: faker.date.future().toISOString(),
                    courseNumber: faker.string.uuid(),
                    needMedicalReport: faker.helpers.arrayElement([YesOrNo.Yes, YesOrNo.No]),
                    professor: faker.person.fullName(),
                    quota: faker.helpers.rangeToNumber({ max: 20, min: 1 }),
                    location: faker.location.city(),
                    state: faker.helpers.arrayElement([State.Active, State.Inactive]),
                }
            })
        }
        // })
        // Array.from({ length: 500 }).forEach(async (_, index) => {
        for (let index = 0; index < 100; index++) {
            await prisma.participantOnCourse.create({
                data: {
                    participantId: faker.helpers.rangeToNumber({ max: 500, min: 1 }),
                    courseId: faker.helpers.rangeToNumber({ max: 500, min: 1 }),
                    state: faker.helpers.arrayElement([StateParticipantOnCourse.Finished, StateParticipantOnCourse.Registered, StateParticipantOnCourse.Retired]),
                }
            })
        }

        // })
        console.log("Database seeding completed successfully.");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

seedDatabase();
