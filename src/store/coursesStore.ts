import { create } from "zustand";
import { CoursesState } from "@/types/state";
import {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseByCourseNumber,
    getCourseByName,
} from "@/services/coursesService";
import { Course } from "@/types/prisma";

export const useCourseStore = create<CoursesState>((set) => ({
    courses: [] as Course[],
    setCourses: (courses) => set({ courses }),

    getCourses: async () => {
        const courses = await getCourses();
        if (!courses) return null
        set({ courses });
        return courses
    },

    getCourseById: async (id: number) => {
        const course = await getCourseById(id);
        if (!course) return null
        set((state) => ({
            courses: state.courses.map((c) => (c.id === id ? course : c)),
        }));
        return course
    },

    postCourse: async (course: Course) => {
        const newCourse = await createCourse(course);
        if (!newCourse) return null
        if (newCourse) {
            set((state) => ({ courses: [...state.courses, newCourse] }));
        }
        return newCourse
    },

    putCourse: async (id: number, course: Course) => {
        const updatedCourse = await updateCourse(id, course);
        if (!updatedCourse) return null
        set((state) => ({
            courses: state.courses.map((c) => (c.id === id ? updatedCourse : c)),
        }));
        return updatedCourse
    },

    deleteCourse: async (id: number) => {
        const deletedCourse = await deleteCourse(id);
        set((state) => ({
            courses: state.courses.filter((c) => c.id !== id),
        }));
        return deletedCourse
    },

    getCourseByCourseNumber: async (courseNumber: string) => {
        const course = await getCourseByCourseNumber(courseNumber);
        set((state) => ({
            courses: state.courses.map((c) =>
                c.courseNumber === courseNumber ? course : c
            ),
        }));
    },

    getCourseByName: async (name: string) => {
        const course = await getCourseByName(name);
        set((state) => ({
            courses: state.courses.map((c) => (c.name === name ? course : c)),
        }));
    },
}));