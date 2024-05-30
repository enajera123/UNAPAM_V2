import { create } from "zustand";
import { GeneralInformationState } from "@/types/state";
import {
    getGeneralInformation,
    getGeneralInformationById,
    updateGeneralInformation,
    createGeneralInformation,
    deleteGeneralInformation,
} from "@/services/generalInformationService";
import { GeneralInformation } from "@/types/prisma";

export const useGeneralInformationStore = create<GeneralInformationState>((set) => ({
    information: [] as GeneralInformation[],
    setGeneralInformation: (information) => set({ information }),

    getGeneralInformation: async () => {
        const information = await getGeneralInformation();
        set({ information });
    },

    getGeneralInformationById: async (id: number) => {
        const information = await getGeneralInformationById(id);
        if (!information) return null;
        set((state) => ({
            information: state.information.map((i) =>
                i.id === id ? information : i
            ),
        }));
        return information;
    },

    postGeneralInformation: async (information: GeneralInformation) => {
        const newInfo = await createGeneralInformation(information);
        if (!newInfo) return null;
        if (newInfo) {
            set((state) => ({ information: [...state.information, newInfo] }));
        }
        return newInfo;
    },

    putGeneralInformation: async (
        id: number,
        information: GeneralInformation
    ) => {
        const updatedInfo = await updateGeneralInformation(id, information);
        if (!updatedInfo) return null;
        set((state) => ({
            information: state.information.map((i) =>
                i.id === id ? updatedInfo : i
            ),
        }));
        return updatedInfo;
    },

    deleteGeneralInformation: async (id: number) => {
        const deletedInfo = await deleteGeneralInformation(id);
        set((state) => ({
            information: state.information.filter((i) => i.id !== id),
        }));
        return deletedInfo;
    },
}));