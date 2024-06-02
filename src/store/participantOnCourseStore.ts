import { create } from "zustand";
import { ParticipantOnCourseState } from "@/types/state";
import {
  getParticipantsOnCourse,
  getParticipantOnCourseByCourseId,
  createParticipantOnCourse,
  updateParticipantOnCourse,
  getParticipantOnCourseByParticipantId,
} from "@/services/participantOnCourseService";
import { ParticipantOnCourse } from "@/types/prisma";

export const useParticipantOnCourseStore = create<ParticipantOnCourseState>(
  (set) => ({
    participantsOnCourse: [] as ParticipantOnCourse[],
    setParticipantsOnCourse: (participantsOnCourse) =>
      set({ participantsOnCourse }),

    getParticipantsOnCourse: async () => {
      const participantsOnCourse = await getParticipantsOnCourse();
      set({ participantsOnCourse });
    },

    getParticipantOnCourseByCourseId: async (id: number) => {
      const participantOnCourse = await getParticipantOnCourseByCourseId(id);
      set((state) => ({
        participantsOnCourse: state.participantsOnCourse.map((p) =>
          p.courseId === id ? participantOnCourse : p
        ),
      }));
    },

    postParticipantOnCourse: async (participantOnCourse: ParticipantOnCourse) => {
      const newParticipantOnCourse = await createParticipantOnCourse(participantOnCourse);
      if (!newParticipantOnCourse) return null;
      if (newParticipantOnCourse) {
        set((state) => ({
          participantsOnCourse: [
            ...state.participantsOnCourse,
            newParticipantOnCourse,
          ],
        }));
      }
      return newParticipantOnCourse;
    },

    putParticipantOnCourse: async (participantOnCourse: ParticipantOnCourse) => {
      const updatedParticipantOnCourse = await updateParticipantOnCourse(participantOnCourse);
      if (!updatedParticipantOnCourse) return null;
      set((state) => ({
        participantsOnCourse: state.participantsOnCourse.map((p) =>
          (p.participantId === updatedParticipantOnCourse.participantId && p.courseId === updatedParticipantOnCourse.courseId ) ? updatedParticipantOnCourse : p
        ),
      }));
      return updatedParticipantOnCourse;
    },

    getParticipantOnCourseByParticipantId: async (participantId: number) => {
      const participantOnCourse = await getParticipantOnCourseByParticipantId(
        participantId
      );
      set((state) => ({
        participantsOnCourse: state.participantsOnCourse.map((p) =>
          p.participantId === participantId ? participantOnCourse : p
        ),
      }));
    },
  })
);