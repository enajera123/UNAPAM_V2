"use client"

import Button from "@/components/Button/Button";
import SearchBar from "@/components/SearchBar/SearchBar";
import Table from "@/components/Table/Table";
import { useHandleSearch } from "@/hooks/Table/useHandleSearch";
import { useParticipantsStore } from "@/store/participantsStore";
import { Participant } from "@/types/prisma";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


function Participants() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState<Participant[]>([]);
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const { getParticipants, participants } = useParticipantsStore()
    const { handleSearch } = useHandleSearch({ setFilterData: setFilteredData, searchTerm, setRandomNumber })
    const router = useRouter()
    useEffect(() => {
        getParticipants()
    }, [])
    useEffect(() => {
        setFilteredData(participants)
    }, [participants])

    return (
        <div className="container mx-auto bg-gray-gradient flex flex-col justify-center items-center h-auto p-10 my-6 rounded-2xl max-w-6xl">
            <h1 className="text-white font-bold text-2xl mb-4 mt-0">
                Participantes de curso
            </h1>
            <div className="w-full gap-3 mb-3 flex justify-between items-center">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSearch={() => handleSearch(participants)}
                    showSelect={false}
                />
                <Link href={'/admin/record'}><Button className="bg-red-gradient">Crear Participante</Button></Link>
            </div>
            <div className="max-w-5xl">
                {filteredData.length > 0 ? (
                    <Table
                        doubleClickRowFunction={(id) => router.push(`/admin/record/${id}`)}
                        showEditColumn={true}
                        keys={['identification', 'firstName', 'firstSurname', 'secondSurname', 'Policy.expirationDate', 'MedicalReport.expirationDate']}
                        data={filteredData}
                        headers={["Identificación", "Nombre", "Primer Apellido", "Segundo Apellido", "Vencimiento de Poliza", "Vencimiento de Dictamen"]}
                        itemsPerPage={6}
                        resetPagination={randomNumber}
                    />
                ) : (
                    <p>No se encontraron resultados</p>
                )}
            </div>
        </div>
    );
};

export default Participants;