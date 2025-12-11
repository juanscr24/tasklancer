'use client'

import { useState } from 'react'
import { ProjectRequirement } from '@/types/features/requirement'
import { Trash2 } from 'lucide-react'

interface RequirementItemProps {
    requirement: ProjectRequirement
    onUpdate: (id: string, data: { description?: string; completed?: boolean }) => Promise<void>
    onDelete: (id: string) => Promise<void>
}

export const RequirementItem = ({ requirement, onUpdate, onDelete }: RequirementItemProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [description, setDescription] = useState(requirement.description)

    const handleToggleComplete = async () => {
        await onUpdate(requirement.id, { completed: !requirement.completed })
    }

    const handleSaveDescription = async () => {
        if (description.trim() && description !== requirement.description) {
            await onUpdate(requirement.id, { description: description.trim() })
        }
        setIsEditing(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSaveDescription()
        } else if (e.key === 'Escape') {
            setDescription(requirement.description)
            setIsEditing(false)
        }
    }

    return (
        <div className="flex items-center gap-3 p-3 bg-(--bg-2) rounded-lg hover:bg-(--bg-1) transition-colors group">
            {/* Checkbox */}
            <input
                type="checkbox"
                checked={requirement.completed}
                onChange={handleToggleComplete}
                className="w-5 h-5 rounded border-2 border-(--text-3) checked:bg-(--btn-1) checked:border-(--btn-1) cursor-pointer"
            />

            {/* Description */}
            {isEditing ? (
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={handleSaveDescription}
                    onKeyDown={handleKeyDown}
                    className="flex-1 px-2 py-1 bg-(--bg-1) border border-(--btn-1) rounded text-(--text-1) focus:outline-none"
                    autoFocus
                />
            ) : (
                <p
                    onClick={() => setIsEditing(true)}
                    className={`flex-1 text-(--text-1) cursor-pointer ${requirement.completed ? 'line-through text-(--text-3)' : ''
                        }`}
                >
                    {requirement.description}
                </p>
            )}

            {/* Delete Button */}
            <button
                onClick={() => onDelete(requirement.id)}
                className="opacity-0 group-hover:opacity-100 p-2 text-(--text-3) hover:text-red-500 transition-all"
                title="Delete requirement"
            >
                <Trash2 size={18} />
            </button>
        </div>
    )
}
