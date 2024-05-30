import axios from "axios";

export async function getUsers() {
  try {
    const response = await axios.get("/api/users");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserById(id: number) {
  try {
    const response = await axios.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createUser(user: User) {
  try {
    const response = await axios.post<User>("/api/users", user);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateUser(id: number, user: User) {
  try {
    const response = await axios.put(`/api/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteUser(id: number) {
  try {
    const response = await axios.delete(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function authenticateUser(user: User) {
  try {
    const response = await axios.post<User>("/api/users/byAuth", user);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserByFirstName(firstName: string) {
  try {
    const response = await axios.get(`/api/users/byFirstName/${firstName}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateUserPassword(id: number, user: User) {
  try {
    const response = await axios.put(`/api/users/byId/${id}`, user);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
