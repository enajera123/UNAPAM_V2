import { create } from "zustand";
import { MedicalReportState } from "@/types/state";
import {
    getMedicalReports,
    getMedicalReportById,
    updateMedicalReport,
    createMedicalReport,
    deleteMedicalReport,
} from "@/services/medicalReportService";
import { MedicalReport } from "@/types/prisma";

export const useMedicalReportStore = create<MedicalReportState>((set) => ({
    reports: [] as MedicalReport[],
    setReports: (reports) => set({ reports }),

    getMedicalReports: async () => {
        const reports = await getMedicalReports();
        set({ reports });
    },

    getMedicalReportById: async (id: number) => {
        const report = await getMedicalReportById(id);
        if (!report) return null;
        set((state) => ({
            reports: state.reports.map((r) => (r.id === id ? report : r)),
        }));
        return report;
    },

    postMedicalReport: async (report: MedicalReport) => {
        const newReport = await createMedicalReport(report);
        if (!newReport) return null;
        if (newReport) {
            set((state) => ({ reports: [...state.reports, newReport] }));
        }
        return newReport;
    },

    putMedicalReport: async (id: number, report: MedicalReport) => {
        const updatedReport = await updateMedicalReport(id, report);
        if (!updatedReport) return null;
        set((state) => ({
            reports: state.reports.map((r) => (r.id === id ? updatedReport : r)),
        }));
        return updatedReport;
    },

    deleteMedicalReport: async (id: number) => {
        const deletedReport = await deleteMedicalReport(id);
        if (!deletedReport) return null;
        set((state) => ({
            reports: state.reports.filter((r) => r.id !== id),
        }));
        return deletedReport;
    },
}));