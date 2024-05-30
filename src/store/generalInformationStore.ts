import { create } from "zustand";
import { GeneralInformationState } from "@/types/state";
import {
    getGeneralInformation,
    getGeneralInformationById,
    updateGeneralInformation,
    createGeneralInformation,
    deleteGeneralInformation,
} from "@/services/generalInformationService";

export const useGeneralInformationStore = create<GeneralInformationState>((set) => ({
    information: [] as GeneralInformation[],
    setGeneralInformation: (information) => set({ information }),

    getGeneralInformation: async () => {
        const information = await getGeneralInformation();
        set({ information });
    },

    getGeneralInformationById: async (id: number) => {
        const information = await getGeneralInformationById(id);
        set((state) => ({
            information: state.information.map((i) =>
                i.id === id ? information : i
            ),
        }));
    },

    postGeneralInformation: async (information: GeneralInformation) => {
        const newInfo = await createGeneralInformation(information);
        if (newInfo) {
            set((state) => ({ information: [...state.information, newInfo] }));
        }
    },

    putGeneralInformation: async (
        id: number,
        information: GeneralInformation
    ) => {
        const updatedInfo = await updateGeneralInformation(id, information);
        set((state) => ({
            information: state.information.map((i) =>
                i.id === id ? updatedInfo : i
            ),
        }));
    },

    deleteGeneralInformation: async (id: number) => {
        await deleteGeneralInformation(id);
        set((state) => ({
            information: state.information.filter((i) => i.id !== id),
        }));
    },
}));