"use client"
import Users from "@/components/Pages/Users/Users";
const UsersPage: React.FC = () => {

    return (
        <div className="container mx-auto bg-gray-gradient flex flex-col justify-center items-center h-auto my-6 py-10 px-20 rounded-2xl max-w-4xl">
            <Users />
        </div>
    );
}

export default UsersPage;