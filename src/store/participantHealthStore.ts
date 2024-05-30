import { create } from "zustand";
import { ParticipantHealthState } from "@/types/state";
import {
  getParticipantsHealth,
  getParticipantHealthById,
  createParticipantHealth,
  updateParticipantHealth,
  deleteParticipantHealth,
  getParticipantHealthByBloodType,
  getParticipantHealthByParticipantId,
} from "@/services/participantHealthService";
import { ParticipantHealth } from "@/types/prisma";

export const useParticipantHealthStore = create<ParticipantHealthState>(
  (set) => ({
    participantsHealth: [] as ParticipantHealth[],
    setParticipantsHealth: (participantsHealth) => set({ participantsHealth }),

    getParticipantsHealth: async () => {
      const participantsHealth = await getParticipantsHealth();
      set({ participantsHealth });
    },

    getParticipantHealthById: async (id: number) => {
      const participantHealth = await getParticipantHealthById(id);
      if (!participantHealth) return null;
      set((state) => ({
        participantsHealth: state.participantsHealth.map((p) =>
          p.id === id ? participantHealth : p
        ),
      }));
      return participantHealth;
    },

    postParticipantHealth: async (participantHealth: ParticipantHealth) => {
      const newParticipantHealth = await createParticipantHealth(
        participantHealth
      );
      if (!newParticipantHealth) return null;
      if (newParticipantHealth) {
        set((state) => ({
          participantsHealth: [
            ...state.participantsHealth,
            newParticipantHealth,
          ],
        }));
      }
      return newParticipantHealth;
    },

    putParticipantHealth: async (
      id: number,
      participantHealth: ParticipantHealth
    ) => {
      const updatedParticipantHealth = await updateParticipantHealth(
        id,
        participantHealth
      );
      if (!updatedParticipantHealth) return null;
      set((state) => ({
        participantsHealth: state.participantsHealth.map((p) =>
          p.id === id ? updatedParticipantHealth : p
        ),
      }));
      return updatedParticipantHealth;
    },

    deleteParticipantHealth: async (id: number) => {
      const response = await deleteParticipantHealth(id);
      if (!response) return false;
      set((state) => ({
        participantsHealth: state.participantsHealth.filter((p) => p.id !== id),
      }));
      return true;
    },

    getParticipantHealthByBloodType: async (bloodType: string) => {
      const participantHealth = await getParticipantHealthByBloodType(
        bloodType
      );
      set((state) => ({
        participantsHealth: state.participantsHealth.map((p) =>
          p.bloodType === bloodType ? participantHealth : p
        ),
      }));
    },

    getParticipantHealthByParticipantId: async (participantId: number) => {
      const participantHealth = await getParticipantHealthByParticipantId(
        participantId
      );
      set((state) => ({
        participantsHealth: state.participantsHealth.map((p) =>
          p.participantId === participantId ? participantHealth : p
        ),
      }));
    },
  })
);