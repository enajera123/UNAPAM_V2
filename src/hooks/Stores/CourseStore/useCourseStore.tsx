import { useMainStore } from "@/store/MainStore/mainStore";
import { useEffect } from "react";
import { useCourseStore as useCoursesStore } from "@/store/coursesStore";
export function useCourseStore() {
    const { setLoader } = useMainStore()
    const { getCourses, courses } = useCoursesStore()
    useEffect(() => {
        setLoader(true)
        getCourses().then(() =>
            setLoader(false)
        ).catch(() => setLoader(false))
    }, [])
    return { courses }
}