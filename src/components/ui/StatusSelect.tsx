'use client'
import { useState, useRef, useEffect } from 'react'
import { Check, Circle, Pause, X, ChevronDown } from 'lucide-react'

type StatusValue = 'ACTIVE' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED'

interface StatusOption {
    value: StatusValue
    label: string
    icon: typeof Circle
    color: string
}

const STATUS_OPTIONS: StatusOption[] = [
    { value: 'ACTIVE', label: 'Active', icon: Circle, color: 'text-green-500' },
    { value: 'COMPLETED', label: 'Completed', icon: Check, color: 'text-blue-500' },
    { value: 'ON_HOLD', label: 'On Hold', icon: Pause, color: 'text-orange-500' },
    { value: 'CANCELLED', label: 'Cancelled', icon: X, color: 'text-red-500' }
]

interface StatusSelectProps {
    value: StatusValue
    onChange: (value: StatusValue) => void
}

export const StatusSelect = ({ value, onChange }: StatusSelectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null)

    const selectedOption = STATUS_OPTIONS.find(opt => opt.value === value) || STATUS_OPTIONS[0]
    const SelectedIcon = selectedOption.icon

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleSelect = (optionValue: StatusValue) => {
        onChange(optionValue)
        setIsOpen(false)
    }

    return (
        <div ref={selectRef} className="relative">
            {/* Selected Value Display */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-2.5 rounded-lg bg-(--bg-2) border border-(--bg-2) text-(--text-1) focus:outline-none focus:ring-2 focus:ring-(--btn-1) transition-all flex items-center justify-between"
            >
                <div className="flex items-center gap-2">
                    <SelectedIcon className={`w-4 h-4 ${selectedOption.color}`} />
                    <span>{selectedOption.label}</span>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Options */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-2 bg-(--bg-1) border border-(--bg-2) rounded-lg shadow-lg overflow-hidden">
                    {STATUS_OPTIONS.map((option) => {
                        const Icon = option.icon
                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleSelect(option.value)}
                                className={`w-full px-4 py-2.5 flex items-center gap-2 hover:bg-(--bg-2) transition-colors ${
                                    value === option.value ? 'bg-(--bg-2)' : ''
                                }`}
                            >
                                <Icon className={`w-4 h-4 ${option.color}`} />
                                <span className="text-(--text-1)">{option.label}</span>
                                {value === option.value && (
                                    <Check className="w-4 h-4 ml-auto text-(--btn-1)" />
                                )}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
