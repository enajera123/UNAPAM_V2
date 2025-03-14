import { create } from "zustand";
import { fetchData } from "@/utils/fetch";
import { Participant } from "@/types/prisma";


export type ParticipantState = {
  participants: Participant[];
  setParticipants: (participants: Participant[]) => void;
  getParticipants: () => Promise<Participant[] | null>;
  getParticipantById: (id: number) => Promise<Participant | null>;
  createParticipant: (participant: Participant) => Promise<Participant | null>;
  updateParticipant: (id: number, participant: Participant) => Promise<Participant | null>;
  deleteParticipant: (id: number) => Promise<boolean>;
};

export const useParticipantsStore = create<ParticipantState>((set) => ({
  participants: [] as Participant[],
  setParticipants: (participants) => set({ participants }),

  getParticipants: async () => {
    const participants = await fetchData<Participant[]>("/api/v1/participants", "GET");
    if (!participants) return null;
    set({ participants });
    return participants;
  },

  getParticipantById: async (id: number) => {
    const participant = await fetchData<Participant>(`/api/v1/participants/${id}`, "GET");
    if (!participant) return null;
    set((state) => ({
      participants: state.participants.map((p) => (p.id === id ? participant : p)),
    }));
    return participant;
  },

  createParticipant: async (participant: Participant) => {
    const newParticipant = await fetchData<Participant>("/api/v1/participants", "POST", participant);
    if (!newParticipant) return null;
    set((state) => ({
      participants: [...state.participants, newParticipant],
    }));
    return newParticipant;
  },

  updateParticipant: async (id: number, participant: Participant) => {
    const updatedParticipant = await fetchData<Participant>(`/api/v1/participants/${id}`, "PUT", participant);
    if (!updatedParticipant) return null;
    set((state) => ({
      participants: state.participants.map((p) => (p.id === id ? updatedParticipant : p)),
    }));
    return updatedParticipant;
  },

  deleteParticipant: async (id: number) => {
    const response = await fetchData<boolean>(`/api/v1/participants/${id}`, "DELETE");
    if (!response) return false;
    set((state) => ({
      participants: state.participants.filter((p) => p.id !== id),
    }));
    return true;
  },
}));
