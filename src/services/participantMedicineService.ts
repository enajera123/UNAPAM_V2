import axios from "axios";

export async function getParticipantsMedicine() {
  try {
    const response = await axios.get("/api/participantMedicine");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getParticipantMedicineById(id: number) {
  try {
    const response = await axios.get(`/api/participantMedicine/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createParticipantMedicine(
  participant: ParticipantMedicine
) {
  try {
    const response = await axios.post<ParticipantMedicine>(
      "/api/participantMedicine",
      participant
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateParticipantMedicine(
  id: number,
  participant: ParticipantMedicine
) {
  try {
    const response = await axios.put(
      `/api/participantMedicine/${id}`,
      participant
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteParticipantMedicine(id: number) {
  try {
    const response = await axios.delete(`/api/participantMedicine/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getParticipantMedicineByMedicine(medicine: string) {
  try {
    const response = await axios.get(
      `/api/participantMedicine/byMedicine/${medicine}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getParticipantMedicineByParticipantId(
  participantId: number
) {
  try {
    const response = await axios.get(
      `/api/participantMedicine/byParticipantId/${participantId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
