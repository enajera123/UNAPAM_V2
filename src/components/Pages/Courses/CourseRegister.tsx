import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import InputField from "@/components/InputField/InputField";
import TextArea from "@/components/TextArea/TextArea";
import { useCourseStore } from "@/store/coursesStore";
import { Course, State, YesOrNo } from "@/types/prisma";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { FaHashtag, FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";

export default function CourseRegister({ course }: { course: Course | null }) {
    const [courseNumber, setCourseNumber] = useState("");
    const [quota, setQuota] = useState("");
    const [name, setName] = useState("");
    const [teacher, setTeacher] = useState("");
    const [initialDate, setInitialDate] = useState("");
    const [finalDate, setFinalDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [needMedicalReport, setNeedMedicalReport] = useState("No");
    const { postCourse, putCourse } = useCourseStore()
    const router = useRouter()
    useEffect(() => {
        if (course) {
            setCourseNumber(course.courseNumber)
            setQuota(course.quota.toString())
            setName(course.name)
            setTeacher(course.professor)
            setInitialDate(course.initialDate)
            setFinalDate(course.finalDate)
            setLocation(course.location ?? "")
            setDescription(course.description ?? "")
            setNeedMedicalReport(course.needMedicalReport.toString())
        }
    }, [course])
    const handleSaveCourse = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const newCourse: Course = {
            state: "Active" as unknown as State,
            courseNumber,
            quota: Number(quota),
            name,
            professor: teacher,
            initialDate,
            finalDate,
            location,
            description,
            needMedicalReport: needMedicalReport as unknown as YesOrNo
        }
        const response = course !== null ? await putCourse(course?.id ?? 0, newCourse) : await postCourse(newCourse)
        if (response) {
            router.push('/admin/courses')
        }
    }

    return (
        <div className="max-w-5xl my-4 container mx-auto bg-gray-gradient p-10 flex flex-col justify-center items-center h-auto rounded-3xl">
            <p className="text-xl font-bold text-light-gray">Gestión de cursos</p>
            <div className="max-w-3xl container bg-dark-gray p-5 rounded-3xl">
                <div className="flex flex-row items-center">
                    <div className="flex-initial w-1/2">
                        <InputField
                            value={courseNumber}
                            onChange={(e) => setCourseNumber(e.target.value)}
                            label="Código"
                            placeholder="Ingresar el código"
                            iconStart={<FaHashtag color="white" />} />
                    </div>
                    <div className="flex-initial w-1/2 pl-4">
                        <InputField
                            value={quota}
                            onChange={(e) => setQuota(e.target.value)}
                            label="Cupos"
                            placeholder="Cantidad de cupos"
                            type="number"
                            iconStart={<FaUsers color="white" />} />
                    </div>
                </div>
                <div className="flex-initial w-full">
                    <InputField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label="Nombre del curso"
                        placeholder="Ingresar el nombre"
                        iconStart={<IoNewspaperOutline color="white" />} />
                </div>
                <div className="flex-initial w-full">
                    <InputField
                        value={teacher}
                        onChange={(e) => setTeacher(e.target.value)}
                        label="Persona que lo imparte"
                        placeholder="Ingresar nombre de la persona que lo imparte"
                        iconStart={<BsFillPersonCheckFill color="white" />} />
                </div>
                <div className="flex flex-row items-center">
                    <div className="flex-initial w-1/2">
                        <InputField
                            value={initialDate}
                            onChange={(e) => setInitialDate(e.target.value)}
                            label="Fecha de inicio"
                            placeholder="Ingresar fecha"
                            type="date"
                            iconStart={<FaRegCalendarAlt color="white" />} />
                    </div>
                    <div className="flex-initial w-1/2 pl-4">
                        <InputField
                            value={finalDate}
                            onChange={(e) => setFinalDate(e.target.value)}
                            label="Fecha de finalización"
                            placeholder="Ingresar fecha"
                            type="date"
                            iconStart={<FaRegCalendarAlt color="white" />} />
                    </div>
                </div>
                <div className="flex-initial w-full">
                    <InputField
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        label="Lugar donde se imparte"
                        placeholder="Ingresar lugar donde se imparte el curso"
                        iconStart={<BsFillPersonCheckFill color="white" />} />
                </div>
                <div className="flex-initial w-full">
                    <TextArea
                        placeholder="Ingresar pequeña descripción del curso"
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >Descripción</TextArea>
                </div>
                <div className="mx-auto max-w-md justify-center">
                    <Checkbox
                        checked={needMedicalReport === "Yes"}
                        onChange={(e) => setNeedMedicalReport(e.target.checked ? "Yes" : "No")}
                        label="Requiere dictamen" />
                </div>
                <div className="flex flex-row items-center justify-center ">
                    <Button onClick={handleSaveCourse} className="bg-red-gradient w-60">Guardar</Button>
                    {/* <Button className="bg-red-gradient w-60">Eliminar</Button> */}
                </div>

            </div>
        </div>

    );

}