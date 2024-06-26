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


function Participants({ participants, courseId }: { participants: Participant[] | null, courseId: number }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState<Participant[]>([]);
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const { participants: participantStore } = useParticipantStore()
    const { deleteParticipant } = useParticipantsStore()
    const { handleSearch } = useHandleSearch({ setFilterData: setFilteredData, searchTerm, setRandomNumber })
    const participantWithCourse = participants?.map((participant) => ({ ...participant, course: participant.participantsOnCourses?.find(course => course.courseId === courseId) })) ?? []
    const router = useRouter()
    useEffect(() => {
        setFilteredData(participants !== null ? participantWithCourse : participantStore)
    }, [participantStore, participants])

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
                        handleSearch={() => handleSearch(participants !== null ? participantWithCourse : participantStore)}
                        showSelect={false}
                    />
                    <Link href={'/admin/participantRegister'}><Button className="bg-red-gradient">Crear Participante</Button></Link>
                </div>
                <div >
                    {filteredData?.length > 0 ? (
                        <Table
                            deleteRowFunction={deleteParticipant}
                            doubleClickRowFunction={(id) => router.push(`/admin/participantRegister/${id}`)}
                            showEditColumn={true}
                            keys={participants !== null ? ['identification', 'firstName', 'firstSurname', 'secondSurname', 'expirationDateMedicalInsurance', 'expirationDateMedicalReport', 'course.state'] : ['identification', 'firstName', 'firstSurname', 'secondSurname', 'expirationDateMedicalInsurance', 'expirationDateMedicalReport']}
                            data={filteredData}
                            headers={participants !== null ? ["Identificación", "Nombre", "Primer Apellido", "Segundo Apellido", "Vencimiento de Poliza", "Vencimiento de Dictamen", 'Estado del curso'] : ["Identificación", "Nombre", "Primer Apellido", "Segundo Apellido", "Vencimiento de Poliza", "Vencimiento de Dictamen"]}
                            itemsPerPage={6}
                            resetPagination={randomNumber}
                            customActions={[
                                {
                                    children: 'Editar',
                                    onClick: (id) => router.push(`/admin/participantRegister/${id}`)
                                }
                            ]
                            }
                        />
                    ) : (
                        <p>No se encontraron resultados</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Participants;
