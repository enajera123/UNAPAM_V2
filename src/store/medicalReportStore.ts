import { create } from "zustand";
import { MedicalReportState } from "@/types/state";
import {
    getMedicalReports,
    getMedicalReportById,
    updateMedicalReport,
    createMedicalReport,
    deleteMedicalReport,
} from "@/services/medicalReportService";

export const useMedicalReportStore = create<MedicalReportState>((set) => ({
    reports: [] as MedicalReport[],
    setReports: (reports) => set({ reports }),

    getMedicalReports: async () => {
        const reports = await getMedicalReports();
        set({ reports });
    },

    getMedicalReportById: async (id: number) => {
        const report = await getMedicalReportById(id);
        set((state) => ({
            reports: state.reports.map((r) => (r.id === id ? report : r)),
        }));
    },

    postMedicalReport: async (report: MedicalReport) => {
        const newReport = await createMedicalReport(report);
        if (newReport) {
            set((state) => ({ reports: [...state.reports, newReport] }));
        }
    },

    putMedicalReport: async (id: number, report: MedicalReport) => {
        const updatedReport = await updateMedicalReport(id, report);
        set((state) => ({
            reports: state.reports.map((r) => (r.id === id ? updatedReport : r)),
        }));
    },

    deleteMedicalReport: async (id: number) => {
        await deleteMedicalReport(id);
        set((state) => ({
            reports: state.reports.filter((r) => r.id !== id),
        }));
    },
}));