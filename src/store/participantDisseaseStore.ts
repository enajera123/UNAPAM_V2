import { create } from "zustand";
import { ParticipantDisseaseState } from "@/types/state";
import {
  getParticipantsDissease,
  getParticipantDisseaseById,
  createParticipantDissease,
  updateParticipantDissease,
  deleteParticipantDissease,
  getParticipantDiseaseByDisease,
  getParticipantDiseaseByParticipantHealthId,
} from "@/services/participantDisseaseService";
import { ParticipantDissease } from "@/types/prisma";

export const useParticipantDisseaseStore = create<ParticipantDisseaseState>(
  (set) => ({
    participantsDisease: [] as ParticipantDissease[],
    setParticipantsDisease: (participantsDisease) =>
      set({ participantsDisease }),

    getParticipantsDisease: async () => {
      const participantsDisease = await getParticipantsDissease();
      set({ participantsDisease });
    },

    getParticipantDiseaseById: async (id: number) => {
      const participantDisease = await getParticipantDisseaseById(id);
      set((state) => ({
        participantsDisease: state.participantsDisease.map((p) =>
          p.id === id ? participantDisease : p
        ),
      }));
    },

    postParticipantDisease: async (participantDisease: ParticipantDissease) => {
      const newParticipantDisease = await createParticipantDissease(
        participantDisease
      );
      if (!newParticipantDisease) return null;
      if (newParticipantDisease) {
        set((state) => ({
          participantsDisease: [
            ...state.participantsDisease,
            newParticipantDisease,
          ],
        }));
      }
      return newParticipantDisease;
    },

    putParticipantDisease: async (
      id: number,
      participantDisease: ParticipantDissease
    ) => {
      const updatedParticipantDisease = await updateParticipantDissease(
        id,
        participantDisease
      );
      if (!updatedParticipantDisease) return null;
      set((state) => ({
        participantsDisease: state.participantsDisease.map((p) =>
          p.id === id ? updatedParticipantDisease : p
        ),
      }));
      return updatedParticipantDisease;
    },

    deleteParticipantDisease: async (id: number) => {
      const response = await deleteParticipantDissease(id);
      set((state) => ({
        participantsDisease: state.participantsDisease.filter(
          (p) => p.id !== id
        ),
      }));
      return response;
    },

    getParticipantDiseaseByDisease: async (disease: string) => {
      const participantDisease = await getParticipantDiseaseByDisease(disease);
      set((state) => ({
        participantsDisease: state.participantsDisease.map((p) =>
          p.disease === disease ? participantDisease : p
        ),
      }));
    },

    getParticipantDiseaseByParticipantHealthtId: async (
      participantHealthId: number
    ) => {
      const participantDisease =
        await getParticipantDiseaseByParticipantHealthId(participantHealthId);
      set((state) => ({
        participantsDisease: state.participantsDisease.map((p) =>
          p.participantHealthId === participantHealthId ? participantDisease : p
        ),
      }));
    },
  })
);