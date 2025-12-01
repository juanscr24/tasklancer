'use client'
import { useState, useRef, useEffect } from 'react'
import { MoreVertical, Edit, Trash2 } from 'lucide-react'

interface DropdownMenuProps {
    onEdit: () => void
    onDelete: () => void
}

export const DropdownMenu = ({ onEdit, onDelete }: DropdownMenuProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    const handleEdit = () => {
        onEdit()
        setIsOpen(false)
    }

    const handleDelete = () => {
        onDelete()
        setIsOpen(false)
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(!isOpen)
                }}
                className="p-2 rounded-lg hover:bg-(--bg-2) transition-colors duration-200 text-(--text-2) hover:text-(--text-1)"
                aria-label="More options"
            >
                <MoreVertical className="w-5 h-5" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-(--bg-1) rounded-lg shadow-lg border border-(--bg-2) py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleEdit()
                        }}
                        className="w-full px-4 py-2 text-left text-(--text-1) hover:bg-(--bg-2) transition-colors duration-150 flex items-center gap-3"
                    >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDelete()
                        }}
                        className="w-full px-4 py-2 text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors duration-150 flex items-center gap-3"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                    </button>
                </div>
            )}
        </div>
    )
}
