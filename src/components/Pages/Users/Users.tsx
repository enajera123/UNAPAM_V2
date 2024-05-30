import Button from "@/components/Button/Button";
import SearchBar from "@/components/SearchBar/SearchBar";
import Table from "@/components/Table/Table";
import { useHandleSearch } from "@/hooks/Table/useHandleSearch";
import { useUsersStore } from "@/store/usersStore";
import { State, User } from "@/types/prisma";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Users: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [randomNumber, setRandomNumber] = useState<number>(0);
    const { getUsers, deleteUser, users, putUser } = useUsersStore()
    const [filteredData, setFilteredData] = useState<User[]>([]);
    const { handleSearch } = useHandleSearch<User>({ setFilterData: setFilteredData, searchTerm, setRandomNumber })
    const router = useRouter();
    useEffect(() => {
        getUsers()
    }, [])
    useEffect(() => {
        setFilteredData(users)
    }, [users])

    const desactivateRowFunction = async (id: number) => {
        const user = users.find((u) => u.id === id);
        user && await putUser(id, { ...user, state: user.state === "Inactive" as unknown as State ? "Active" as unknown as State : "Inactive" as unknown as State });
    }

    return (
        <div className="text-center">
            <h1 className="text-white font-bold text-2xl mb-4 mt-0">Usuarios</h1>
            <div className="w-full gap-3 mb-3 flex justify-between items-center">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleSearch={() => handleSearch(users)}
                    showSelect={false}
                />
                <Link href={'/admin/userRegister'}><Button className="bg-red-gradient">Crear Usuario</Button></Link>
            </div>
            {filteredData.length > 0 ? (
                <Table
                    desactivateRowFunction={desactivateRowFunction}
                    deleteRowFunction={deleteUser}
                    doubleClickRowFunction={(id) => router.push('/admin/userRegister/' + id)}
                    keys={["identification", "firstName", "firstSurname", "secondSurname", 'state']}
                    data={filteredData}
                    headers={["Identificación", "Nombre", "Primer Apellido", "Segundo Apellido", 'Estado',]}
                    itemsPerPage={6}
                    resetPagination={randomNumber}
                    showEditColumn={true}
                />
            ) : (
                <p>No se encontraron resultados</p>
            )}
        </div>
    );
}

export default Users;