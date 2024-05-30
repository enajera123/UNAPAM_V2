import axios from "axios";

export async function getParticipantsHealth() {
  try {
    const response = await axios.get("/api/participantHealth");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getParticipantHealthById(id: number) {
  try {
    const response = await axios.get(`/api/participantHealth/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createParticipantHealth(participant: ParticipantHealth) {
  try {
    const response = await axios.post<ParticipantHealth>(
      "/api/participantHealth",
      participant
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateParticipantHealth(
  id: number,
  participant: ParticipantHealth
) {
  try {
    const response = await axios.put(
      `/api/participantHealth/${id}`,
      participant
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteParticipantHealth(id: number) {
  try {
    const response = await axios.delete(`/api/participantHealth/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getParticipantHealthByBloodType(bloodType: string) {
  try {
    const response = await axios.get(
      `/api/participantHealth/byBloodType/${bloodType}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getParticipantHealthByParticipantId(
  participantId: number
) {
  try {
    const response = await axios.get(
      `/api/participantHealth/byParticipantId/${participantId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
