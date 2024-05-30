import axios from "axios";

export async function getParticipantsOnCourse() {
  try {
    const response = await axios.get("/api/participantOnCourse");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getParticipantOnCourseByCourseId(id: number) {
  try {
    const response = await axios.get(
      `/api/participantOnCourse/byCourseId/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createParticipantOnCourse(
  participant: ParticipantOnCourse
) {
  try {
    const response = await axios.post<ParticipantOnCourse>(
      "/api/participantOnCourse",
      participant
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getParticipantOnCourseByParticipantId(participantId: number) {
  try {
    const response = await axios.get(
      `/api/participantOnCourse/byParticipantId/${participantId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}