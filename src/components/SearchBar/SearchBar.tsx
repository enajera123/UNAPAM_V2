import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { SearchBarProps } from "./type";
import Button from "../Button/Button";

const SearchBar = ({ searchTerm, setSearchTerm, selectedOption, setSelectedOption, handleSearch, showSelect }: SearchBarProps) => {
    const [cleared, setCleared] = useState<boolean>(false);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        setCleared(true);
    };

    useEffect(() => {
        if (cleared) {
            handleSearch();
            setCleared(false);
        }
    }, [cleared, handleSearch]);

    return (
        <div className="flex w-full gap-4 items-center">
            {searchTerm && <Button type="button" onClick={handleClearSearch}><AiOutlineClose size={20} /></Button>}
            <input
                type="text"
                className="bg-medium-gray border border-black text-white placeholder:text-white text-sm rounded-lg block w-full p-3"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
            />
            {showSelect && (
                <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption && setSelectedOption(e.target.value)}
                    className="bg-medium-gray border border-black text-white text-sm rounded-lg h-10 p-2"
                >
                    <option value="id">Identificación</option>
                    <option value="name">Nombre y apellidos</option>
                </select>
            )}
            <Button type="button" onClick={handleSearch}>  <AiOutlineSearch size={24} /></Button>
        </div>
    );
};

export default SearchBar;