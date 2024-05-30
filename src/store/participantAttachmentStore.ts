import { create } from "zustand";
import { ParticipantAttachmentState } from "@/types/state";
import {
    getParticipantsAttachment,
    getParticipantAttachmentById,
    createParticipantAttachment,
    updateParticipantAttachment,
    deleteParticipantAttachment,
    getParticipantAttachmentByParticipantId,
} from "@/services/participantAttachmentService";

export const useParticipantAttachmentStore = create<ParticipantAttachmentState>(
    (set) => ({
        participantsAttachment: [] as ParticipantAttachment[],
        setParticipantsAttachment: (participantsAttachment) =>
            set({ participantsAttachment }),

        getParticipantsAttachment: async () => {
            const participantsAttachment = await getParticipantsAttachment();
            set({ participantsAttachment });
        },

        getParticipantAttachmentById: async (id: number) => {
            const participantAttachment = await getParticipantAttachmentById(id);
            set((state) => ({
                participantsAttachment: state.participantsAttachment.map((p) =>
                    p.id === id ? participantAttachment : p
                ),
            }));
        },

        postParticipantAttachment: async (
            participantAttachment: ParticipantAttachment
        ) => {
            const newParticipantAttachment = await createParticipantAttachment(
                participantAttachment
            );
            if (newParticipantAttachment) {
                set((state) => ({
                    participantsAttachment: [
                        ...state.participantsAttachment,
                        newParticipantAttachment,
                    ],
                }));
            }
        },

        putParticipantAttachment: async (
            id: number,
            participantAttachment: ParticipantAttachment
        ) => {
            const updatedParticipantAttachment = await updateParticipantAttachment(
                id,
                participantAttachment
            );
            set((state) => ({
                participantsAttachment: state.participantsAttachment.map((p) =>
                    p.id === id ? updatedParticipantAttachment : p
                ),
            }));
        },

        deleteParticipantAttachment: async (id: number) => {
            await deleteParticipantAttachment(id);
            set((state) => ({
                participantsAttachment: state.participantsAttachment.filter(
                    (p) => p.id !== id
                ),
            }));
        },

        getParticipantAttachmentByParticipantId: async (participantId: number) => {
            const participantAttachment =
                await getParticipantAttachmentByParticipantId(participantId);
            set((state) => ({
                participantsAttachment: state.participantsAttachment.map((p) =>
                    p.participantId === participantId ? participantAttachment : p
                ),
            }));
        },
    })
);