'use client'

import Register from '@/components/Pages/Users/UserRegister'
import { useUsersStore } from '@/store/usersStore'
import { User } from '@/types/prisma'
import { useEffect, useState } from 'react'
export default function UserRegister({ params }: { params: { id: string } }) {
    const { getUserById } = useUsersStore()
    const [user, setUser] = useState<User | null>(null)
    async function fetchUser() {
        const response = await getUserById(parseInt(params.id))
        setUser(response)
    }
    useEffect(() => {
        if (params.id) {
            fetchUser()
        }
    }, [])

    return (
        <Register user={user} />
    );
}