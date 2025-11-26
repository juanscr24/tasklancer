'use client'
import { Task } from '@/types/features/project'

interface TaskCardProps {
    task: Task
    onDragStart?: (task: Task) => void
}

const priorityColors = {
    low: 'bg-blue-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500'
}

export const TaskCard = ({ task, onDragStart }: TaskCardProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: '2-digit' })
    }

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', task.id)

        // Add visual feedback
        e.currentTarget.style.opacity = '0.5'

        if (onDragStart) {
            onDragStart(task)
        }
    }

    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.opacity = '1'
    }

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="bg-(--bg-1) border border-(--bg-2) rounded-lg p-4 mb-3 hover:shadow-lg transition-all duration-200 cursor-grab active:cursor-grabbing group"
        >
            {/* Title */}
            <h3 className="text-(--text-1) font-semibold text-base mb-2 group-hover:text-(--btn-1) transition-colors">
                {task.title}
            </h3>

            {/* Description */}
            <p className="text-(--text-2) text-sm mb-3 line-clamp-2">
                {task.description}
            </p>

            {/* Priority Badge */}
            <div className="flex items-center gap-2 mb-3">
                <div className={`w-16 h-1 rounded-full ${priorityColors[task.priority]}`} />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-(--text-2)">
                <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Fecha: {formatDate(task.dueDate)}</span>
                </div>
            </div>

            {/* Project Name Badge */}
            <div className="mt-3 pt-3 border-t border-(--bg-2)">
                <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-(--text-2)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <span className="text-xs text-(--text-2)">Project Name</span>
                </div>
            </div>
        </div>
    )
}
