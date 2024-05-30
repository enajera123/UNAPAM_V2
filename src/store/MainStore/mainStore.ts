import { create } from "zustand";
interface MainStore {
    loader: boolean;
    setLoader: (value: boolean) => void;
    error: string | null;
    setError: (value: string | null) => void;
}
export const useMainStore = create<MainStore>((set) => ({
    loader: false,
    setLoader: (value) => set({ loader: value }),
    error: null,
    setError: (value) => set({ error: value }),
}));