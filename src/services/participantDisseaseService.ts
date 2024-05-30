import axios from "axios";

export async function getParticipantsDissease() {
  try {
    const response = await axios.get("/api/participantDissease");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getParticipantDisseaseById(id: number) {
  try {
    const response = await axios.get(`/api/participantDissease/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createParticipantDissease(
  participant: ParticipantDissease
) {
  try {
    const response = await axios.post<ParticipantDissease>(
      "/api/participantDissease",
      participant
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateParticipantDissease(
  id: number,
  participant: ParticipantDissease
) {
  try {
    const response = await axios.put(
      `/api/participantDissease/${id}`,
      participant
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteParticipantDissease(id: number) {
  try {
    const response = await axios.delete(`/api/participantDissease/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getParticipantDiseaseByDisease(disease: string) {
  try {
    const response = await axios.get(
      `/api/participantDissease/byDisease/${disease}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getParticipantDiseaseByParticipantHealthId(
  participantHealthId: number
) {
  try {
    const response = await axios.get(
      `/api/participantDissease/byParticipantHealthId/${participantHealthId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
