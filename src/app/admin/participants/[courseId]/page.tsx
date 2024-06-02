"use client"


import React, { useEffect } from 'react'
import ParticipantsComponent from '@/components/Pages/Participants/Participants'
import { useParticipantsStore } from '@/store/participantsStore'

function Participants({ params }: { params: { courseId: string } }) {
    const { getParticipantsByCourseId, participants } = useParticipantsStore()
    useEffect(() => {
        getParticipantsByCourseId(parseInt(params.courseId))
    }, [])
    return (
        <ParticipantsComponent participants={participants} courseId={parseInt(params.courseId)} />
    )
}

export default Participants
