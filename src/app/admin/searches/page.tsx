"use client"

import SearchBar from "@/components/SearchBar/SearchBar";
import Table from "@/components/Table/Table";
import { useState } from "react";

interface DataItem {
    identification: string;
    firstName: string;
    firstSurname: string;
    secondSurname: string;
    educationLevel: string;
}

const data: DataItem[] = [
    {
        identification: "54321",
        firstName: "Juan",
        firstSurname: "Pérez",
        secondSurname: "González",
        educationLevel: "Primaria completa",
    },
    {
        identification: "98765",
        firstName: "María",
        firstSurname: "López",
        secondSurname: "García",
        educationLevel: "Secundaria incompleta",
    },
    {
        identification: "24680",
        firstName: "Pedro",
        firstSurname: "Martínez",
        secondSurname: "Fernández",
        educationLevel: "Secundaria completa",
    },
    {
        identification: "13579",
        firstName: "Laura",
        firstSurname: "Hernández",
        secondSurname: "Díaz",
        educationLevel: "Licenciatura completa",
    },
    {
        identification: "36912",
        firstName: "Carlos",
        firstSurname: "Gómez",
        secondSurname: "Ruiz",
        educationLevel: "Técnico completo",
    },
    {
        identification: "80246",
        firstName: "Ana",
        firstSurname: "Jiménez",
        secondSurname: "Sánchez",
        educationLevel: "Maestría completa",
    },
    {
        identification: "57931",
        firstName: "Sara",
        firstSurname: "Vázquez",
        secondSurname: "Rodríguez",
        educationLevel: "Doctorado completo",
    },
    {
        identification: "71428",
        firstName: "David",
        firstSurname: "Fernández",
        secondSurname: "Pérez",
        educationLevel: "Primaria incompleta",
    },
    {
        identification: "92468",
        firstName: "Elena",
        firstSurname: "Muñoz",
        secondSurname: "Alvarez",
        educationLevel: "Secundaria incompleta",
    },
];

const UsersPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState<DataItem[]>(data);
    const [randomNumber, setRandomNumber] = useState<number>(0);

    const headers = [
        "Identificación",
        "Nombre",
        "Apellido",
        "Apellido",
        "Escolaridad",
    ];

    const generateRandomNumber = (): number => {
        return Math.floor(Math.random() * 10000) + 1;
    };

    const handleSearch = () => {
        const filtered = data.filter((item) => {
            const nameMatch = item.identification.toLowerCase().includes(searchTerm.toLowerCase());
            const fullName = `${item.firstName.toLowerCase()} ${item.firstSurname.toLowerCase()} ${item.secondSurname.toLowerCase()}`;
            const fullNameMatch = fullName.includes(searchTerm.toLowerCase());
            return nameMatch || fullNameMatch;
        });
        setFilteredData(filtered);
        setRandomNumber(generateRandomNumber());
    };

    return (
        //clases de ancho máximo proporcionadas por Tailwind, como max-w-xs, max-w-sm, max-w-md, max-w-lg, max-w-xl, max-w-2xl, max-w-3xl, max-w-4xl, max-w-5xl, max-w-6xl, max-w-7xl, max-w-full
        <div className="container mx-auto bg-gray-gradient flex flex-col justify-center items-center h-auto py-10 px-20 my-6 rounded-2xl max-w-4xl">
            <h1 className="text-white font-bold text-2xl mb-4 mt-0">
                Búsqueda
            </h1>
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleSearch={handleSearch}
                showSelect={false}
            />
            {filteredData.length > 0 ? (
                <Table
                keys={[]}
                    data={filteredData}
                    headers={headers}
                    itemsPerPage={6}
                    resetPagination={randomNumber}
                />
            ) : (
                <p>No se encontraron resultados</p>
            )}
        </div>
    );
}

export default UsersPage;