import React from 'react'

import SearchBar from "@/components/SearchBar/SearchBar";
import Table from "@/components/Table/Table";
import { useEffect, useState } from "react";
import { useHandleSearch } from '@/hooks/Table/useHandleSearch';
import { useCourseStore } from '@/store/coursesStore';
import Link from 'next/link';
import Button from '@/components/Button/Button';
import { Course, State } from '@/types/prisma';
import { useRouter } from 'next/navigation';
import { useCourseStore as useCoursesStore } from '@/hooks/Stores/CourseStore/useCourseStore'

function Courses() {
    const [searchTerm, setSearchTerm] = useState("");
    const { putCourse, deleteCourse } = useCourseStore()
    const { courses } = useCoursesStore()
    const [filteredData, setFilteredData] = useState<Course[]>(courses);
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const { handleSearch } = useHandleSearch<Course>({ setFilterData: setFilteredData, searchTerm, setRandomNumber })
    const router = useRouter()

    useEffect(() => {
        setFilteredData(courses)
    }, [courses])
    const desactivateRowFunction = async (id: number) => {
        const course = courses.find((u) => u.id === id);
        course && await putCourse(id, { ...course, state: course.state === "Inactive" as unknown as State ? "Active" as unknown as State : "Inactive" as unknown as State });
    }
    const seeParticipants = (courseId: number) => {
        router.push(`/admin/participants/${courseId}`)
    }
    return (
        <div className="bg-gray-gradient w-11/12 mx-auto rounded-2xl">
            <div className='m-5 p-5'>
                <h1 className="text-white font-bold text-2xl mb-4 mt-0">
                    Cursos
                </h1>
                <div className="w-full gap-3 mb-3 flex justify-between items-center">
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={() => handleSearch(courses)}
                        showSelect={false}
                    />
                    <Link href={'/admin/courseRegister'}><Button className="bg-red-gradient">Crear Curso</Button></Link>
                </div>
                {filteredData.length > 0 ? (
                    <Table
                        customActions={[
                            {
                                children: <p>Ver Participantes</p>,
                                onClick: seeParticipants
                            },
                            {
                                children: 'Editar',
                                onClick: (id) => router.push(`/admin/courseRegister/${id}`)
                            }
                        ]}
                        deleteRowFunction={deleteCourse}
                        desactivateRowFunction={desactivateRowFunction}
                        doubleClickRowFunction={(id) => router.push('/admin/courseRegister/' + id)}
                        showEditColumn
                        keys={['name', 'courseNumber', 'professor', 'quota', 'initialDate', 'finalDate', 'location', 'needMedicalReport', 'state']}
                        data={filteredData}
                        headers={["Nombre", "Código", 'Profesor', 'Cupos', 'Fecha de inicio', 'Fecha de finalización', 'Ubicación', 'Requiere reporte médico', 'Estado']}
                        itemsPerPage={6}
                        resetPagination={randomNumber}
                    />
                ) : (
                    <p>No se encontraron resultados</p>
                )}
            </div>
        </div>
    );
}

export default Courses