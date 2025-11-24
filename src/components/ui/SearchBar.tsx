'use client'
import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (value: string) => void;
    className?: string;
}

export const SearchBar = ({
    placeholder = "Search projects...",
    onSearch,
    className = ""
}: SearchBarProps) => {
    const [searchValue, setSearchValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <div className={`flex items-center gap-3 bg-(--btn-2) rounded-lg px-4 py-3 w-full ${className}`}>
            <Search className="w-5 h-5 text-(--text-2)" />
            <input
                type="text"
                value={searchValue}
                onChange={handleChange}
                placeholder={placeholder}
                className="flex-1 bg-transparent outline-none text-(--text-2) placeholder:text-gray-400"
            />
        </div>
    );
};
