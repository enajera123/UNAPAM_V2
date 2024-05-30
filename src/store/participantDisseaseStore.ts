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
      if (newParticipantDisease) {
        set((state) => ({
          participantsDisease: [
            ...state.participantsDisease,
            newParticipantDisease,
          ],
        }));
      }
    },

    putParticipantDisease: async (
      id: number,
      participantDisease: ParticipantDissease
    ) => {
      const updatedParticipantDisease = await updateParticipantDissease(
        id,
        participantDisease
      );
      set((state) => ({
        participantsDisease: state.participantsDisease.map((p) =>
          p.id === id ? updatedParticipantDisease : p
        ),
      }));
    },

    deleteParticipantDisease: async (id: number) => {
      await deleteParticipantDissease(id);
      set((state) => ({
        participantsDisease: state.participantsDisease.filter(
          (p) => p.id !== id
        ),
      }));
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