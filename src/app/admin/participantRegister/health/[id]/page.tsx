'use client'
import ParticipantHealth from '@/components/Pages/Participants/Health/ParticipantHealth'
import { useParticipantsStore } from '@/store/participantsStore'
import { Participant } from '@/types/prisma'
import React, { useEffect, useState } from 'react'

export default function Health({ params }: { params: { id: string } }) {
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
        participant && <ParticipantHealth participant={participant} />
    )
}
