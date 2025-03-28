import { faker } from "@faker-js/faker"
import { Grade, PrismaClient, State, StateParticipantOnCourse, TypeIdentification, YesOrNo } from "@prisma/client";
import * as fs from "fs/promises";
import * as path from "path";
import { data } from "./data";
const prisma = new PrismaClient();
// import data from "./data.json" assert { type: "json" };
async function seed() {
    try {
        // const filePath = "data.json"
        // const fileContent = await fs.readFile(filePath, "utf-8");
        // const data = JSON.parse(fileContent);
        console.log(data)
        for (const course of data.cursos) {
            await prisma.course.create({
                data: {
                    courseNumber: course.courseNumber,
                    name: course.name,
                    description: course.description,
                    location: course.location,
                    professor: course.professor,
                    quota: 12,
                    needMedicalReport: YesOrNo.No,
                    state: State.Active,
                    initialDate: course.intialDate,
                    finalDate: course.finalDate,

                    // initialDate: new Date(coourse.intialDate),
                    // finalDate: new Date(coourse.finalDate),
                }
            })
        }
        // for (const participant of data.participants) {
        //     await prisma.participant.create({
        //         data: participant,
        //     });
        // }

        // for (const course of data.courses) {
        //     await prisma.course.create({
        //         data: course,
        //     });
        // }

        // for (const participantOnCourse of data.participantsOnCourses) {
        //     await prisma.participantOnCourse.create({
        //         data: participantOnCourse,
        //     });
        // }

        console.log("Database seeding from JSON completed successfully.");
    } catch (error) {
        console.error("Error seeding database from JSON:", error);
    }
}
async function seedDatabase() {
    try {
        await prisma.participant.deleteMany()
        await prisma.course.deleteMany()

        // for (let index = 0; index < 500; index++) {
        //     await prisma.participant.create({
        //         data: {
        //             email: faker.internet.email(),
        //             birthDate: faker.date.birthdate().toISOString(),
        //             firstName: faker.person.firstName(),
        //             firstSurname: faker.person.lastName(),
        //             secondSurname: faker.person.lastName(),
        //             hasWhatsApp: faker.helpers.arrayElement([YesOrNo.Yes, YesOrNo.No]),
        //             phoneNumber: faker.phone.number(),
        //             identification: faker.string.uuid(),
        //             typeIdentification: faker.helpers.arrayElement([TypeIdentification.DIMEX, TypeIdentification.Nacional]),
        //             grade: faker.helpers.arrayElement([Grade.Primaria_Completa, Grade.Primaria_Incompleta, Grade.Secundaria_Completa, Grade.Secundaria_Incompleta, Grade.Sin_Estudio, Grade.Universidad_Completa, Grade.Universidad_Incompleta])
        //         }
        //     })
        // }
        // // Array.from({ length: 500 }).forEach(async (_, index) => {
        // for (let index = 0; index < 500; index++) {
        //     await prisma.course.create({
        //         data: {
        //             name: faker.lorem.words(),
        //             description: faker.lorem.paragraph(),
        //             initialDate: faker.date.past().toISOString(),
        //             finalDate: faker.date.future().toISOString(),
        //             courseNumber: faker.string.uuid(),
        //             needMedicalReport: faker.helpers.arrayElement([YesOrNo.Yes, YesOrNo.No]),
        //             professor: faker.person.fullName(),
        //             quota: faker.helpers.rangeToNumber({ max: 20, min: 1 }),
        //             location: faker.location.city(),
        //             state: faker.helpers.arrayElement([State.Active, State.Inactive]),
        //         }
        //     })
        // }
        // // })
        // // Array.from({ length: 500 }).forEach(async (_, index) => {
        // for (let index = 0; index < 100; index++) {
        //     await prisma.participantOnCourse.create({
        //         data: {
        //             participantId: faker.helpers.rangeToNumber({ max: 500, min: 1 }),
        //             courseId: faker.helpers.rangeToNumber({ max: 500, min: 1 }),
        //             state: faker.helpers.arrayElement([StateParticipantOnCourse.Finished, StateParticipantOnCourse.Registered, StateParticipantOnCourse.Retired]),
        //         }
        //     })
        // }

        // })
        console.log("Database seeding completed successfully.");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

// seedDatabase();
seed()