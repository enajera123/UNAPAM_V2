import Button from "@/components/Button/Button";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useUserStore } from "@/hooks/Stores/UserStore/useUserStore";
import { useHandleSearch } from "@/hooks/Table/useHandleSearch";
import { User } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserTable from "./UserTable";
const Users: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const { users } = useUserStore()
    const [filteredData, setFilteredData] = useState<User[]>([]);
    const { handleSearch } = useHandleSearch<User>({ setFilterData: setFilteredData, searchTerm, setRandomNumber })
    useEffect(() => {
        setFilteredData(users)
    }, [users])
   

    return (
        <div className=" w-11/12 bg-gray-gradient mx-auto rounded-2xl">
            <div className='m-5 p-5'>
                <h1 className="text-white font-bold text-2xl mb-4 mt-0">
                    Usuarios
                </h1>
                <div className="w-full gap-3 mb-3 flex justify-between items-center">
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={() => handleSearch(users)}
                        showSelect={false}
                    />
                    <Link href={'/admin/userRegister'}><Button className="bg-red-gradient">Crear Usuario</Button></Link>
                </div>
                <div >
                    {filteredData?.length > 0 ? (
                        <UserTable filteredData={filteredData} />
                    ) : (
                        <p className='text-white'>No se encontraron resultados</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Users;