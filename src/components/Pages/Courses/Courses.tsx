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


function Courses() {
    const [searchTerm, setSearchTerm] = useState("");
    const { courses, getCourses, putCourse } = useCourseStore()
    const [filteredData, setFilteredData] = useState<Course[]>(courses);
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const { handleSearch } = useHandleSearch<Course>({ setFilterData: setFilteredData, searchTerm, setRandomNumber })
    const router = useRouter()
    useEffect(() => {
        getCourses();
    }, [])
    useEffect(() => {
        setFilteredData(courses)
    }, [courses])
    const desactivateRowFunction = async (id: number) => {
        const course = courses.find((u) => u.id === id);
        course && await putCourse(id, { ...course, state: course.state === State.Inactive ? "Active" as unknown as State : "Inactive" as unknown as State });
    }
    return (
        <div className="mx-4 bg-gray-gradient flex flex-col justify-center items-center h-auto py-10 px-20 my-6 rounded-2xl">
            <h1 className="text-white font-bold text-2xl mb-4 mt-0">
                Búsqueda de cursos
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
                    desactivateRowFunction={desactivateRowFunction}
                    doubleClickRowFunction={(id) => router.push('/admin/courseRegister/' + id)}
                    showEditColumn
                    keys={['name', 'courseNumber', 'professor', 'quota', 'initialDate', 'finalDate', 'location', 'description', 'needMedicalReport', 'state']}
                    data={filteredData}
                    headers={["Nombre", "Código", 'Profesor', 'Cupos', 'Fecha de inicio', 'Fecha de finalización', 'Ubicación', 'Descripción', 'Requiere reporte médico', 'Estado']}
                    itemsPerPage={6}
                    resetPagination={randomNumber}
                />
            ) : (
                <p>No se encontraron resultados</p>
            )}
        </div>
    );
}

export default Courses