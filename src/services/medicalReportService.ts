import axios from "axios";

export async function getMedicalReports() {
    try {
        const response = await axios.get("/api/medicalReport");
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getMedicalReportById(id: number) {
    try {
        const response = await axios.get(`/api/medicalReport/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createMedicalReport(report: MedicalReport) {
    try {
        const response = await axios.post<MedicalReport>(
            "/api/medicalReport",
            report
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateMedicalReport(id: number, report: MedicalReport) {
    try {
        const response = await axios.put(`/api/medicalReport/${id}`, report);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function deleteMedicalReport(id: number) {
    try {
        const response = await axios.delete(`/api/medicalReport/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}