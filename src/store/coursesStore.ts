import { create } from "zustand";
import { fetchData } from "@/utils/fetch";
import { Course } from "@/types/prisma";

export type CoursesState = {
    courses: Course[];
    setCourses: (courses: Course[]) => void;
    getCourses: () => Promise<Course[] | null>;
    getCourseById: (id: number) => Promise<Course | null>;
    createCourse: (course: Course) => Promise<Course | null>;
    updateCourse: (id: number, course: Course) => Promise<Course | null>;
    deleteCourse: (id: number) => Promise<boolean>;
};

export const useCourseStore = create<CoursesState>((set) => ({
    courses: [] as Course[],
    setCourses: (courses) => set({ courses }),

    getCourses: async () => {
        const response = await fetchData<Course[]>("/api/v1/courses", "GET");
        if (!response.length) return null;
        set({ courses: response });
        return response;
    },

    getCourseById: async (id: number) => {
        const response = await fetchData<Course>(`/api/v1/courses/${id}`, "GET");
        set((state) => ({
            courses: state.courses.map((c) => (c.id === id ? response : c)),
        }));
        return response;
    },

    createCourse: async (course: Course) => {
        const response = await fetchData<Course>("/api/v1/courses", "POST", course);
        if (!response.id) return null;
        set((state) => ({ courses: [...state.courses, response] }));
        return response;
    },

    updateCourse: async (id: number, course: Course) => {
        const response = await fetchData<Course>(`/api/v1/courses/${id}`, "PUT", course);
        if (!response.id) return null;
        set((state) => ({
            courses: state.courses.map((c) => (c.id === id ? response : c)),
        }));
        return response;
    },

    deleteCourse: async (id: number) => {
        const response = await fetchData<boolean>(`/api/v1/courses/${id}`, "DELETE");
        if (!response) return false;
        set((state) => ({ courses: state.courses.filter((c) => c.id !== id) }));
        return true;
    },

}));
