import { create } from "zustand";
import { ParticipantState } from "@/types/state";
import {
  getParticipants,
  getParticipantById,
  createParticipant,
  updateParticipant,
  deleteParticipant,
  getParticipantByEmail,
  getParticipantByFirstName,
  getParticipantByIdentification,
} from "@/services/participantsService";
import { Participant } from "@/types/prisma";

export const useParticipantsStore = create<ParticipantState>((set) => ({
  participants: [] as Participant[],
  setParticipants: (participants) => set({ participants }),

  getParticipants: async () => {
    const participants = await getParticipants();
    set({ participants });
  },

  getParticipantById: async (id: number) => {
    const participant = await getParticipantById(id);
    if (!participant) return null
    set((state) => ({
      participants: state.participants.map((p) =>
        p.id === id ? participant : p
      ),
    }));
    return participant;
  },

  postParticipant: async (participant: Participant) => {
    const newParticipant = await createParticipant(participant);
    if (!newParticipant) return null
    if (newParticipant) {
      set((state) => ({
        participants: [...state.participants, newParticipant],
      }));
    }
    return newParticipant
  },

  putParticipant: async (id: number, participant: Participant) => {
    const updatedParticipant = await updateParticipant(id, participant);
    if (!updatedParticipant) return null
    set((state) => ({
      participants: state.participants.map((p) =>
        p.id === id ? updatedParticipant : p
      ),
    }));
    return updatedParticipant
  },

  deleteParticipant: async (id: number) => {
    await deleteParticipant(id);
    set((state) => ({
      participants: state.participants.filter((p) => p.id !== id),
    }));
  },

  getParticipantByEmail: async (email: string) => {
    const participant = await getParticipantByEmail(email);
    set((state) => ({
      participants: state.participants.map((p) =>
        p.email === email ? participant : p
      ),
    }));
  },

  getParticipantByFirstName: async (firstName: string) => {
    const participant = await getParticipantByFirstName(firstName);
    set((state) => ({
      participants: state.participants.map((p) =>
        p.firstName === firstName ? participant : p
      ),
    }));
  },

  getParticipantByIdentification: async (identification: string) => {
    const participant = await getParticipantByIdentification(identification);
    set((state) => ({
      participants: state.participants.map((p) =>
        p.identification === identification ? participant : p
      ),
    }));
  },
}));