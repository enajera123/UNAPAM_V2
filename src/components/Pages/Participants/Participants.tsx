"use client"
import Button from "@/components/Button/Button";
import SearchBar from "@/components/SearchBar/SearchBar";
import Table from "@/components/Table/Table";
import { useParticipantStore } from "@/hooks/Stores/ParticipantStore/useParticipantStore";
import { useHandleSearch } from "@/hooks/Table/useHandleSearch";
import { useParticipantsStore } from "@/store/participantsStore";
import { Participant } from "@/types/prisma";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ParticipantTable from "./ParticipantTable";
import { StateParticipantOnCourse } from "@prisma/client";


function Participants({ courseId }: { courseId: number }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState<Participant[]>([]);
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const { participants } = useParticipantStore()
    const { handleSearch } = useHandleSearch({ setFilterData: setFilteredData, searchTerm, setRandomNumber })
    useEffect(() => {
        setFilteredData(courseId != 0 ? participants.filter((participant) => participant.participantsOnCourses?.find(course => course.courseId == courseId) && participant.participantsOnCourses?.find(course => course.courseId == courseId)?.state === StateParticipantOnCourse.Registered) : participants)
    }, [participants])

    return (
        <div className="bg-gray-gradient w-11/12 mx-auto rounded-2xl">
            <div className='m-5 p-5'>
                <h1 className="text-white font-bold text-2xl mb-4 mt-0">
                    Participantes de curso
                </h1>
                <div className="w-full gap-3 mb-3 flex justify-between items-center">
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={() => handleSearch(filteredData)}
                        showSelect={false}
                    />
                    <Link href={'/admin/participantRegister'}><Button className="bg-red-gradient">Crear Participante</Button></Link>
                </div>
                <div >
                    {filteredData?.length > 0 ? (
                        <ParticipantTable filteredData={filteredData} />
                    ) : (
                        <p className='text-white'>No se encontraron resultados</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Participants;
