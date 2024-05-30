import { generateRandomNumber } from "@/utils/numbers";

export function useHandleSearch<T>({ setFilterData, searchTerm, setRandomNumber }: { setFilterData: React.Dispatch<React.SetStateAction<T[]>>, searchTerm: string, setRandomNumber: React.Dispatch<React.SetStateAction<number>> }) {

    function handleSearch(data: T[]) {
        const filtered = data.filter((item) => {
            return Object.keys(item as Record<string, unknown>).some((key) => {
                const value = (item as Record<string, unknown>)[key];
                if (typeof value === 'string' || typeof value === 'number') {
                    return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
                }
                return false;
            });
        });
        setFilterData(filtered);
        setRandomNumber(generateRandomNumber())
    }
    return { handleSearch }
}