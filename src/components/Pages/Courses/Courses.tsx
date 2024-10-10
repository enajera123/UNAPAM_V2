import React from 'react'

import SearchBar from "@/components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { useHandleSearch } from '@/hooks/Table/useHandleSearch';
import Link from 'next/link';
import Button from '@/components/Button/Button';
import { Course } from '@/types/prisma';
import { useCourseStore as useCoursesStore } from '@/hooks/Stores/CourseStore/useCourseStore'
import CourseTable from './CourseTable';

function Courses() {
    const [searchTerm, setSearchTerm] = useState("");

    const { courses } = useCoursesStore()
    const [filteredData, setFilteredData] = useState<Course[]>(courses);
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const { handleSearch } = useHandleSearch<Course>({ setFilterData: setFilteredData, searchTerm, setRandomNumber })
    useEffect(() => {
        setFilteredData(courses)
    }, [courses])
    return (
        <div className="bg-gray-gradient mx-2 rounded-2xl">
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
                    <CourseTable filteredData={filteredData} />
                ) : (
                    <p className='text-white'>No se encontraron resultados</p>
                )}
            </div>
        </div>
    );
}

export default Courses