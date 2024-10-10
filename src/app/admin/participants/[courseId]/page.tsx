"use client"


import React, { useEffect } from 'react'
import ParticipantsComponent from '@/components/Pages/Participants/Participants'
function Participants({ params }: { params: { courseId: string } }) {

    return (
        <ParticipantsComponent courseId={parseInt(params.courseId)} />
    )
}

export default Participants
