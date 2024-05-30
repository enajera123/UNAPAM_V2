import axios from "axios";

export async function getPolicy() {
  try {
    const response = await axios.get("/api/policy");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getPolicyById(id: number) {
  try {
    const response = await axios.get(`/api/policy/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createPolicy(policy: Policy) {
  try {
    const response = await axios.post<Policy>("/api/policy", policy);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updatePolicy(id: number, policy: Policy) {
  try {
    const response = await axios.put(`/api/policy/${id}`, policy);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deletePolicy(id: number) {
  try {
    const response = await axios.delete(`/api/policy/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
