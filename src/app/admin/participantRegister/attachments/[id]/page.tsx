'use client'
import Attachments from '@/components/Pages/Participants/Attachments/ParticipantAttachments';
import { useParticipantsStore } from '@/store/participantsStore';
import { Participant } from '@/types/prisma';
import { useEffect, useState } from 'react';

export default function Attachment({ params }: { params: { id: string } }) {
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
        participant && <Attachments participant={participant} />
    )
}