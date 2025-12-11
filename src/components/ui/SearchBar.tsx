'use client'
import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBarProps {
    placeholder?: string;
    onSearch?: (value: string) => void;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({
    placeholder = "Search projects...",
    onSearch,
    className = "",
    value: controlledValue,
    onChange: controlledOnChange
}: SearchBarProps) => {
    const [internalValue, setInternalValue] = useState('');

    // Use controlled value if provided, otherwise use internal state
    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        // If controlled, call the onChange prop
        if (controlledOnChange) {
            controlledOnChange(e);
        } else {
            setInternalValue(newValue);
        }

        if (onSearch) {
            onSearch(newValue);
        }
    };

    return (
        <div className={`flex items-center gap-3 bg-(--btn-2) rounded-lg px-4 py-3 w-full ${className}`}>
            <Search className="w-5 h-5 text-(--text-2)" />
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="flex-1 bg-transparent outline-none text-(--text-2) placeholder:text-gray-400"
            />
        </div>
    );
};
