import { create } from "zustand";
import { UsersState } from "@/types/state";
import {
  getUsers,
  getUserById,
  getUserByFirstName,
  authenticateUser,
  updateUserPassword,
  createUser,
  updateUser,
  deleteUser,
  forgotPassword,
} from "@/services/usersService";
import { User } from "@/types/prisma";

export const useUsersStore = create<UsersState>((set) => ({
  users: [] as User[],
  setUsers: (users) => set({ users }),

  getUsers: async () => {
    const users = await getUsers();
    if (!users) return null
    set({ users });
    return users
  },

  getUserById: async (id: number): Promise<User | null> => {
    const user = await getUserById(id);
    if (!user) return null;
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? user : u)),
    }));
    return user;
  },

  getUserByFirstName: async (firstName: string) => {
    const user = await getUserByFirstName(firstName);
    set((state) => ({
      users: state.users.filter((u) => (u.firstName === firstName ? user : u)),
    }));
  },

  postUser: async (user: User): Promise<User | null> => {
    try {
      const newUser = await createUser(user);
      if (newUser) {
        set((state) => ({ users: [...state.users, newUser] }));
        return newUser;
      }
      return null;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  },

  putUser: async (id: number, user: User): Promise<User | null> => {
    const updatedUser = await updateUser(id, user);
    if (!updatedUser) return null
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? updatedUser : u)),
    }));
    return updatedUser
  },
  deleteUser: async (id: number) => {
    const response = await deleteUser(id);
    if (!response) return false
    set((state) => ({ users: state.users.filter((user) => user.id !== id) }));
    return true;
  },
  authenticateUser: async (identification: string, passwordFromLogin: string) => {
    const authenticatedUser = await authenticateUser(identification, passwordFromLogin);
    if (authenticatedUser) {
      set((state) => ({
        users: state.users.map((u) =>
          u.id === authenticatedUser.id ? authenticatedUser : u
        ),
      }));
      return authenticatedUser
    }
    return null
  },

  putUserPassword: async (id: number, currentPassword: string, newPassword: string) => {
    const updatedUser = await updateUserPassword(id, currentPassword, newPassword);
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? updatedUser : u)),
    }));
    if (!updatedUser) return false;
    return true;
  },

  forgotPassword: async (identification: string) => {
    const response = await forgotPassword(identification);
    if (!response) return false;
    return true;
  }

}));
