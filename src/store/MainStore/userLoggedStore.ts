import { User } from '@prisma/client';
import { create } from 'zustand';
interface AuthState {
    user: User | null
    setUser: (user: User) => void,
    userLoggued: boolean,
    setUserLoggued: (loggued: boolean) => void,
    logout: () => void
}
const useAuthState = create<AuthState>((set) => ({
    user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') ?? 'null') : null,
    userLoggued: false,
    setUserLoggued: (loggued: boolean) => {
        set({ userLoggued: loggued });
    },
    setUser: (user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        set({ user });
    },
    logout: () => {
        localStorage.removeItem('user');
        set({ user: null });
    },
}));

export default useAuthState;