import { User } from "@prisma/client";
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

export async function authenticateUser(identification: string, password: string) {
  try {
    const response = await axios.put<User>("/api/v1/users/auth", { identification, password });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
