import { generateRandomNumber } from "@/utils/numbers";

export function useHandleSearch<T>({ setFilterData, searchTerm, setRandomNumber }: { setFilterData: React.Dispatch<React.SetStateAction<T[]>>, searchTerm: string, setRandomNumber: React.Dispatch<React.SetStateAction<number>> }) {

    const recursiveSearch = (item: Record<string, unknown>, term: string): boolean => {
        return Object.values(item).some((value) => {
            if (typeof value === 'string' || typeof value === 'number') {
                return value.toString().toLowerCase().includes(term.toLowerCase());
            } else if (typeof value === 'object' && value !== null) {
                return recursiveSearch(value as Record<string, unknown>, term);
            }
            return false;
        });
    };
    function handleSearch(data: T[]) {
        const filtered = data.filter((item) => recursiveSearch(item as Record<string, unknown>, searchTerm));
        console.log(filtered)
        setFilterData(filtered);
        setRandomNumber(generateRandomNumber())
    }
    return { handleSearch }
}