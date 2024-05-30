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
import { ParticipantMedicine } from "@/types/prisma";

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
      if (!participantMedicine) return null;
      set((state) => ({
        participantsMedicine: state.participantsMedicine.map((p) =>
          p.id === id ? participantMedicine : p
        ),
      }));
      return participantMedicine;
    },

    postParticipantMedicine: async (
      participantMedicine: ParticipantMedicine
    ) => {
      const newParticipantMedicine = await createParticipantMedicine(
        participantMedicine
      );
      if (!newParticipantMedicine) return null;
      if (newParticipantMedicine) {
        set((state) => ({
          participantsMedicine: [
            ...state.participantsMedicine,
            newParticipantMedicine,
          ],
        }));
      }
      return newParticipantMedicine;
    },

    putParticipantMedicine: async (
      id: number,
      participantMedicine: ParticipantMedicine
    ) => {
      const updatedParticipantMedicine = await updateParticipantMedicine(
        id,
        participantMedicine
      );
      if (!updatedParticipantMedicine) return null;
      set((state) => ({
        participantsMedicine: state.participantsMedicine.map((p) =>
          p.id === id ? updatedParticipantMedicine : p
        ),
      }));
      return updatedParticipantMedicine;
    },

    deleteParticipantMedicine: async (id: number) => {
      const response = await deleteParticipantMedicine(id);
      if (!response) return false;
      set((state) => ({
        participantsMedicine: state.participantsMedicine.filter(
          (p) => p.id !== id
        ),
      }));
      return true;
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