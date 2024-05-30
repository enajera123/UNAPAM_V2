import axios from "axios";

export async function getCourses() {
    try {
        const response = await axios.get("/api/courses");
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getCourseById(id: number) {
    try {
        const response = await axios.get(`/api/courses/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createCourse(course: Course) {
    try {
        const response = await axios.post<Course>("/api/courses", course);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateCourse(id: number, course: Course) {
    try {
        const response = await axios.put(`/api/courses/${id}`, course);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function deleteCourse(id: number) {
    try {
        const response = await axios.delete(`/api/courses/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getCourseByCourseNumber(courseNumber: string) {
    try {
        const response = await axios.get(`/api/courses/byCourseNumber/${courseNumber}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getCourseByName(name: string) {
    try {
        const response = await axios.get(`/api/courses/byName/${name}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}