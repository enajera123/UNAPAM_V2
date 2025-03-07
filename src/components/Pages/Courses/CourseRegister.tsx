import Button from "@/components/Button/Button";
import InputField from "@/components/InputField/InputField";
import TextArea from "@/components/TextArea/TextArea";
import { useCourseStore } from "@/store/coursesStore";
import { Course, StateParticipantOnCourse } from "@/types/prisma";
import { generateCoursePDF } from "@/utils/reports/generatePDF";
import { useRouter } from "next/navigation";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { FaArrowLeft, FaHashtag, FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { Field, Form, Formik } from "formik";
import { CourseSchema, getInitialValuesCourse } from "@/types/schemas/courseRegisterSchema";

export default function CourseRegister({ course }: { course: Course | null }) {
    const { createCourse, updateCourse } = useCourseStore()
    const router = useRouter()
    const restQuota = course !== null ? course?.quota - (course?.participantsOnCourses?.filter(participant => participant.state === StateParticipantOnCourse.Registered)?.length ?? 0) : null
    const handleGenerateReport = async () => {
        generateCoursePDF(course as Course)
    }
    const handleSubmit = async (values: Course) => {
        const newCourse = {
            ...values
        } as Course
        const response = course !== null ? await updateCourse(course?.id ?? 0, newCourse) : await createCourse(newCourse)
        if (response) {
            router.push('/admin/courses')
        }
    }

    return (
        <Formik enableReinitialize initialValues={getInitialValuesCourse(course)} onSubmit={handleSubmit} validationSchema={CourseSchema}>
            {({ values, setFieldValue }) => (
                <Form>
                    <div className="max-w-5xl my-4 container mx-auto bg-gray-gradient p-10 flex flex-col justify-center items-center h-auto rounded-3xl">
                        <div className="w-full">
                            <div onClick={() => router.push("/admin/courses")} className='p-2 border-white border rounded-lg  inline-block hover:rounded-none transition-all cursor-pointer'>
                                <FaArrowLeft size={30} color='white' />
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-xl font-bold text-light-gray">Gestión de cursos</p>
                            {course != null && <p className={`${(((restQuota ?? 0) * 100) / course.quota) < 40 ? "text-red-600" : "text-orange-400"} italic `}>Cupos restantes:{restQuota}</p>}
                        </div>
                        <div className="max-w-3xl container bg-dark-gray p-5 rounded-3xl">
                            <div className="flex flex-row items-center">
                                <div className="flex-initial w-1/2">
                                    <InputField
                                        name="courseNumber"
                                        label="Código"
                                        placeholder="Ingresar el código"
                                        iconStart={<FaHashtag color="white" />} />
                                </div>
                                <div className="flex-initial w-1/2 pl-4">
                                    <InputField
                                        name="quota"
                                        label="Cupos"
                                        placeholder="Cantidad de cupos"
                                        type="number"
                                        iconStart={<FaUsers color="white" />} />
                                </div>
                            </div>
                            <div className="flex-initial w-full">
                                <InputField
                                    name="name"
                                    label="Nombre del curso"
                                    placeholder="Ingresar el nombre"
                                    iconStart={<IoNewspaperOutline color="white" />} />
                            </div>
                            <div className="flex-initial w-full">
                                <InputField
                                    name="professor"
                                    label="Persona que lo imparte"
                                    placeholder="Ingresar nombre de la persona que lo imparte"
                                    iconStart={<BsFillPersonCheckFill color="white" />} />
                            </div>
                            <div className="flex flex-row items-center">
                                <div className="flex-initial w-1/2">
                                    <InputField
                                        name="initialDate"
                                        label="Fecha de inicio"
                                        placeholder="Ingresar fecha"
                                        type="date"
                                        iconStart={<FaRegCalendarAlt color="white" />} />
                                </div>
                                <div className="flex-initial w-1/2 pl-4">
                                    <InputField
                                        name="finalDate"
                                        label="Fecha de finalización"
                                        placeholder="Ingresar fecha"
                                        type="date"
                                        iconStart={<FaRegCalendarAlt color="white" />} />
                                </div>
                            </div>
                            <div className="flex-initial w-full">
                                <InputField
                                    name="location"
                                    label="Lugar donde se imparte"
                                    placeholder="Ingresar lugar donde se imparte el curso"
                                    iconStart={<BsFillPersonCheckFill color="white" />} />
                            </div>
                            <div className="flex-initial w-full">
                                <TextArea
                                    label="Descripción"
                                    name="description"
                                    placeholder="Ingresar pequeña descripción del curso"
                                    rows={4}
                                />
                            </div>
                            <div className='flex items-center gap-4 text-white justify-center my-4'>
                                <h3 >Requiere Dictámen Médico</h3>
                                <Field
                                    type="checkbox"
                                    name="needMedicalReport"
                                    checked={values.needMedicalReport === "Yes"}
                                    className="h-6 w-6 cursor-pointer rounded border-gray-300 checked:bg-blue-600"
                                    onChange={() => setFieldValue('needMedicalReport', values.needMedicalReport === "No" ? "Yes" : "No")}
                                />
                            </div>
                            <div className="flex flex-row items-center gap-10 justify-center ">
                                {course?.id && <Button
                                    onClick={handleGenerateReport}
                                    format
                                    className="bg-gradient-to-r py-2.5 text-sm  from-yellow-500 to-yellow-600 rounded-md transition-all hover:from-yellow-600 hover:to-yellow-700 text-white w-60"
                                >
                                    Generar Reporte del curso
                                </Button>}
                                <Button type="submit" className=" w-60">Guardar</Button>
                            </div>

                        </div>
                    </div>

                </Form>
            )}
        </Formik>

    );

}