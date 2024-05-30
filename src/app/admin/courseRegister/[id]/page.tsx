'use client'

import Register from '@/components/Pages/Courses/CourseRegister'
import { useCourseStore } from '@/store/coursesStore'
import { Course } from '@/types/prisma'
import { useEffect, useState } from 'react'
export default function CourseRegister({ params }: { params: { id: string } }) {
    const { getCourseById } = useCourseStore()
    const [course, setCourse] = useState<Course | null>(null)
    async function fetchUser() {
        const response = await getCourseById(parseInt(params.id))
        setCourse(response)
    }
    useEffect(() => {
        if (params.id) {
            fetchUser()
        }
    }, [])

    return (
        <Register course={course} />
    );
}