export type SearchBarProps = {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    selectedOption?: string;
    setSelectedOption?: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: () => void;
    showSelect: boolean;
}