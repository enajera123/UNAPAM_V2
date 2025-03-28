import { create } from "zustand";
import { fetchData } from "@/utils/fetch";
import { UserToken } from "@/types/api";
import { User } from "@prisma/client";
export type UsersState = {
  users: User[];
  setUsers: (users: User[]) => void;
  getUsers: () => Promise<User[] | null>;
  getUserById: (id: number) => Promise<User | null>;
  logout: () => void;
  sendRecoveryEmail: (identification: string) => Promise<boolean>;
  changePassword: (id: number, password: string) => Promise<User | null>;
  updateUser: (id: number, user: User) => Promise<User | null>;
  createUser: (user: User) => Promise<User | null>;
  deleteUser: (id: number) => Promise<boolean>;
  authenticateUser: (identification: string, passwordFromLogin: string) => Promise<User | null>;
};
export const useUsersStore = create<UsersState>((set) => ({
  users: [] as User[],
  setUsers: (users) => set({ users }),

  getUsers: async () => {
    const response = await fetchData<User[]>("/api/v1/users", "GET");
    if (!response.length) return null
    set({ users: response });
    return response
  },
  changePassword: async (id: number, password: string) => {
    const response = await fetchData<User>(`/api/v1/users/auth/${id}/changePassword`, "PUT", { password });
    if (response) {
      set((state) => ({
        users: state.users.map((u) =>
          u.id === response.id ? response : u
        ),
      }));
      return response
    }
    return null
  },
  getUserById: async (id: number): Promise<User | null> => {
    const response = await fetchData<User>(`/api/v1/users/${id}`, "GET");
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? response : u)),
    }));
    return response;
  },

  updateUser: async (id: number, user: User): Promise<User | null> => {
    const response = await fetchData<User>(`/api/v1/users/${id}`, "PUT", user);
    if (!response.id) return null
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? response : u)),
    }));
    return response
  },
  createUser: async (user: User): Promise<User | null> => {
    try {
      const response = await fetchData<User>("/api/v1/users", "POST", user);
      if (!response.id) return null
      set((state) => ({ users: [...state.users, response] }));
      return response;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  },
  deleteUser: async (id: number) => {
    const response = await fetchData<User>(`/api/v1/users/${id}`, "DELETE");
    if (!response) return false
    set((state) => ({ users: state.users.filter((user) => user.id !== id) }));
    return true;
  },
  authenticateUser: async (identification: string, passwordFromLogin: string) => {
    const response = await fetchData<UserToken>("/api/v1/users/auth", "PUT", { identification, password: passwordFromLogin });
    console.log(response)
    if (response.token) {
      document.cookie = `jwtUNAPAM=${response.token}; path=/;`;
      // return response.user
    }
    if (response.user.id) {
      set((state) => ({
        users: state.users.map((u) =>
          u.id === response.user.id ? response.user : u
        ),
      }));
      return response.user
    }
    return null
  },
  sendRecoveryEmail: async (identification: string) => {
    const response = await fetchData<User>("/api/v1/users/auth/sendRecoveryEmail", "PUT", { identification });
    if (response) {
      set((state) => ({
        users: state.users.map((u) =>
          u.id === response.id ? response : u
        ),
      }));
      return true
    }
    return false
  },


  logout: () => {
    set({ users: [] });
    document.cookie = "jwtUNAPAM=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  },

}));
