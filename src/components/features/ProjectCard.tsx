'use client'
import { Project } from '@/types/features/project'
import { DropdownMenu } from '@/components/ui/DropdownMenu'
import { Tally2 } from 'lucide-react'

interface ProjectCardProps {
    project: Project
    isSelected: boolean
    progress: number
    taskCount: number
    onSelect: () => void  // For selecting the project (clicking the card)
    onOpenModal: () => void  // For opening the modal (from "Factura" button)
    onEdit: () => void
    onDelete: () => void
    onInvoice?: boolean
    onDragStart?: () => void
    onDragEnd?: () => void
    isDragging?: boolean
}

export const ProjectCard = ({
    project,
    isSelected,
    progress,
    taskCount,
    onSelect,
    onOpenModal,
    onEdit,
    onDelete,
    onInvoice,
    onDragStart,
    onDragEnd,
    isDragging
}: ProjectCardProps) => {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', project.id)
        if (onDragStart) onDragStart()
    }

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        if (onDragEnd) onDragEnd()
    }

    return (
        <div
            onClick={onSelect}
            className={`p-4 rounded-lg cursor-pointer transition-all relative ${isDragging ? 'opacity-50' : ''
                } ${isSelected
                    ? 'bg-(--bg-1) text-white shadow-lg'
                    : 'bg-(--btn-2) hover:bg-(--bg-1)'
                }`}
        >
            {/* Drag Handle */}
            <div
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 top-1/2 -translate-y-1/2 cursor-grab text-(--text-1) active:cursor-grabbing rounded transition-colors"
                title="Drag to reorder"
            >
                <Tally2 strokeWidth={0.4} />
            </div>

            {/* Project Header */}
            <div className="flex items-center gap-3 mb-3 ml-1">
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : project.color }}
                >
                    {project.icon || '📁'}
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate text-(--text-1)">{project.name}</h3>
                    <p className={`text-xs ${isSelected ? 'text-(--text-2)' : 'text-(--text-2)/80'}`}>
                        {project.description || 'No description'}
                    </p>
                    {project.client && (
                        <p className={`text-xs mt-1 ${isSelected ? 'text-(--text-1)' : 'text-(--text-1)/80'}`}>
                            👤 {project.client.name}
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-(--text-2)'}`}>
                        {taskCount}
                    </span>
                    <div onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onClick={onOpenModal}
                            onInvoice={onInvoice}
                        />
                    </div>
                </div>
            </div>

            {/* Progress Bar with Percentage */}
            <div className="space-y-1">
                <div className="flex justify-between items-center">
                    <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-(--text-2)'}`}>
                        Progress
                    </span>
                    <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-(--btn-1)'}`}>
                        {progress}%
                    </span>
                </div>
                <div className="w-full bg-(--bg-2) rounded-full h-2 overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-300 ${isSelected ? 'bg-(--btn-2)' : 'bg-(--btn-1)'
                            }`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    )
}
