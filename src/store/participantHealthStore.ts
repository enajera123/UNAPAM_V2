import { create } from "zustand";
import { fetchData } from "@/utils/fetch";
import { ParticipantHealth } from "@/types/prisma";
export type ParticipantHealthState = {
  // participantsHealth: ParticipantHealth[];
  // setParticipantsHealth: (participantsHealth: ParticipantHealth[]) => void;
  // getParticipantsHealth: () => void;
  // getParticipantHealthById: (id: number) => Promise<ParticipantHealth | null>;
  createParticipantHealth: (participantHealth: ParticipantHealth) => Promise<ParticipantHealth | null>;
  updateParticipantHealth: (id: number, participantHealth: ParticipantHealth) => Promise<ParticipantHealth | null>;
};

export const useParticipantHealthStore = create<ParticipantHealthState>((set) => ({
  // participantsHealth: [] as ParticipantHealth[],
  // setParticipantsHealth: (participantsHealth) => set({ participantsHealth }),

  // getParticipantsHealth: async () => {
  //   const response = await fetchData<ParticipantHealth[]>("/api/v1/participants/participantHealth", "GET");
  //   if (!response.length) return null;
  //   set({ participantsHealth: response });
  //   return response;
  // },

  // getParticipantHealthById: async (id: number) => {
  //   const response = await fetchData<ParticipantHealth>(`/api/v1/participants/participantHealth/${id}`, "GET");
  //   if (!response) return null;
  //   set((state) => ({
  //     participantsHealth: state.participantsHealth.map((p) => (p.id === id ? response : p)),
  //   }));
  //   return response;
  // },

  createParticipantHealth: async (participantHealth: ParticipantHealth) => {
    const response = await fetchData<ParticipantHealth>("/api/v1/participants/participantHealth", "POST", participantHealth);
    if (!response) return null;
    // set((state) => ({
    //   participantsHealth: [...state.participantsHealth, response],
    // }));
    return response;
  },

  updateParticipantHealth: async (id: number, participantHealth: ParticipantHealth) => {
    const response = await fetchData<ParticipantHealth>(`/api/v1/participants/participantHealth/${id}`, "PUT", participantHealth);
    if (!response) return null;
    // set((state) => ({
    //   participantsHealth: state.participantsHealth.map((p) => (p.id === id ? response : p)),
    // }));
    return response;
  },


}));
