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
} from "@/services/usersService";

export const useUsersStore = create<UsersState>((set) => ({
  users: [] as User[],
  setUsers: (users) => set({ users }),

  getUsers: async () => {
    const users = await getUsers();
    set({ users });
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
    await deleteUser(id);
    set((state) => ({ users: state.users.filter((user) => user.id !== id) }));
  },

  authenticateUser: async (user: User) => {
    const authenticatedUser = await authenticateUser(user);
    if (authenticatedUser) {
      set((state) => ({
        users: state.users.map((u) =>
          u.id === authenticatedUser.id ? authenticatedUser : u
        ),
      }));
    }
  },

  putUserPassword: async (id: number, user: User) => {
    const updatedUser = await updateUserPassword(id, user);
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? updatedUser : u)),
    }));
  },
}));
