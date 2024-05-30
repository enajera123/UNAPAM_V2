'use client'
import Record from '@/components/Pages/Record/Record';
import { useParticipantsStore } from '@/store/participantsStore';
import { Participant } from '@/types/prisma';
import { useEffect, useState } from 'react';
export default function Home({ params }: { params: { id: string } }) {
    const { getParticipantById } = useParticipantsStore()
    const [participant, setParticipant] = useState<Participant | null>(null)
    async function fetchUser() {
        const response = await getParticipantById(parseInt(params.id))
        setParticipant(response)
    }
    useEffect(() => {
        if (params.id) {
            fetchUser()
        }
    }, [])

    return (
        <Record participant={participant} />
    )
}