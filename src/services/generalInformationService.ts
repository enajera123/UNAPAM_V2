import axios from "axios";

export async function getGeneralInformation() {
    try {
        const response = await axios.get("/api/generalInformation");
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getGeneralInformationById(id: number) {
    try {
        const response = await axios.get(`/api/generalInformation/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createGeneralInformation(
    information: GeneralInformation
) {
    try {
        const response = await axios.post<GeneralInformation>(
            "/api/generalInformation",
            information
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateGeneralInformation(
    id: number,
    information: GeneralInformation
) {
    try {
        const response = await axios.put(
            `/api/generalInformation/${id}`,
            information
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function deleteGeneralInformation(id: number) {
    try {
        const response = await axios.delete(`/api/generalInformation/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}