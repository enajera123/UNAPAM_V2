import { create } from "zustand";
import { ParticipantMedicineState } from "@/types/state";
import {
  getParticipantsMedicine,
  getParticipantMedicineById,
  createParticipantMedicine,
  updateParticipantMedicine,
  deleteParticipantMedicine,
  getParticipantMedicineByMedicine,
  getParticipantMedicineByParticipantId,
} from "@/services/participantMedicineService";

export const useParticipantMedicineStore = create<ParticipantMedicineState>(
  (set) => ({
    participantsMedicine: [] as ParticipantMedicine[],
    setParticipantsMedicine: (participantsMedicine) =>
      set({ participantsMedicine }),

    getParticipantsMedicine: async () => {
      const participantsMedicine = await getParticipantsMedicine();
      set({ participantsMedicine });
    },

    getParticipantMedicineById: async (id: number) => {
      const participantMedicine = await getParticipantMedicineById(id);
      set((state) => ({
        participantsMedicine: state.participantsMedicine.map((p) =>
          p.id === id ? participantMedicine : p
        ),
      }));
    },

    postParticipantMedicine: async (
      participantMedicine: ParticipantMedicine
    ) => {
      const newParticipantMedicine = await createParticipantMedicine(
        participantMedicine
      );
      if (newParticipantMedicine) {
        set((state) => ({
          participantsMedicine: [
            ...state.participantsMedicine,
            newParticipantMedicine,
          ],
        }));
      }
    },

    putParticipantMedicine: async (
      id: number,
      participantMedicine: ParticipantMedicine
    ) => {
      const updatedParticipantMedicine = await updateParticipantMedicine(
        id,
        participantMedicine
      );
      set((state) => ({
        participantsMedicine: state.participantsMedicine.map((p) =>
          p.id === id ? updatedParticipantMedicine : p
        ),
      }));
    },

    deleteParticipantMedicine: async (id: number) => {
      await deleteParticipantMedicine(id);
      set((state) => ({
        participantsMedicine: state.participantsMedicine.filter(
          (p) => p.id !== id
        ),
      }));
    },

    getParticipantMedicineByMedicine: async (medicine: string) => {
      const participantMedicine = await getParticipantMedicineByMedicine(
        medicine
      );
      set((state) => ({
        participantsMedicine: state.participantsMedicine.map((p) =>
          p.medicine === medicine ? participantMedicine : p
        ),
      }));
    },

    getParticipantMedicineByParticipantId: async (participantId: number) => {
      const participantMedicine = await getParticipantMedicineByParticipantId(
        participantId
      );
      set((state) => ({
        participantsMedicine: state.participantsMedicine.map((p) =>
          p.participantHealthId === participantId ? participantMedicine : p
        ),
      }));
    },
  })
);