import axios from "axios";

export async function getReference() {
  try {
    const response = await axios.get("/api/referenceContact");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getReferenceById(id: number) {
  try {
    const response = await axios.get(`/api/referenceContact/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createReference(reference: ReferenceContact) {
  try {
    const response = await axios.post<ReferenceContact>(
      "/api/referenceContact",
      reference
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateReference(id: number, reference: ReferenceContact) {
  try {
    const response = await axios.put(`/api/referenceContact/${id}`, reference);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteReference(id: number) {
  try {
    const response = await axios.delete(`/api/referenceContact/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function searchContacts(searchTerm: string) {
  try {
    const response = await axios.get(
      `/api/referenceContact/bySearchTerm/${searchTerm}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
