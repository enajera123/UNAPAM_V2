import axios from "axios";

export async function getParticipantsAttachment() {
    try {
        const response = await axios.get("/api/participantAttachment");
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getParticipantAttachmentById(id: number) {
    try {
        const response = await axios.get(`/api/participantAttachment/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createParticipantAttachment(
    participant: ParticipantAttachment
) {
    try {
        const response = await axios.post<ParticipantAttachment>(
            "/api/participantAttachment",
            participant
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateParticipantAttachment(
    id: number,
    participant: ParticipantAttachment
) {
    try {
        const response = await axios.put(
            `/api/participantAttachment/${id}`,
            participant
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function deleteParticipantAttachment(id: number) {
    try {
        const response = await axios.delete(`/api/participantAttachment/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getParticipantAttachmentByParticipantId(
    participantId: number
) {
    try {
        const response = await axios.get(
            `/api/participantAttachment/byParticipantId/${participantId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}