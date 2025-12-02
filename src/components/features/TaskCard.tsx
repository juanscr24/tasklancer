'use client'
import { Task } from '@/types/features/project'
import { DropdownMenu } from '@/components/ui/DropdownMenu'
import { useProjectStore } from '@/stores/projectStore'
import { useState } from 'react'
import { NewTaskModal, TaskFormData } from './NewTaskModal'

interface TaskCardProps {
    task: Task
    onDragStart?: (task: Task) => void
}

const priorityColors = {
    LOW: 'bg-blue-500',
    MEDIUM: 'bg-yellow-500',
    HIGH: 'bg-red-500'
}

export const TaskCard = ({ task, onDragStart }: TaskCardProps) => {
    const { deleteTask, updateTask, projects } = useProjectStore()
    const [showEditModal, setShowEditModal] = useState(false)

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'No date'
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

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this task?')) {
            await deleteTask(task.id)
        }
    }

    const handleEdit = () => {
        setShowEditModal(true)
    }

    const handleEditSubmit = async (data: TaskFormData) => {
        await updateTask(task.id, {
            title: data.title,
            description: data.description || null,
            priority: data.priority,
            dueDate: data.dueDate || null
        })
    }

    // Get project info
    const project = task.project || projects.find(p => p.id === task.projectId)

    return (
        <>
            <div
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                className="bg-(--bg-1) border border-(--bg-2) rounded-lg p-4 mb-3 hover:shadow-lg transition-all duration-200 cursor-grab active:cursor-grabbing group"
            >
                {/* Header with Title and Menu */}
                <div className="flex items-start justify-between mb-2">
                    <h3 className="text-(--text-1) font-semibold text-base flex-1 group-hover:text-(--btn-1) transition-colors">
                        {task.title}
                    </h3>
                    <div onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>
                </div>

                {/* Description */}
                {task.description && (
                    <p className="text-(--text-2) text-sm mb-3 line-clamp-2">
                        {task.description}
                    </p>
                )}

                {/* Priority Badge */}
                <div className="flex items-center gap-2 mb-3">
                    <div className={`w-16 h-1 rounded-full ${priorityColors[task.priority]}`} />
                    <span className="text-xs text-(--text-2) capitalize">{task.priority.toLowerCase()}</span>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-(--text-2)">
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{formatDate(task.dueDate)}</span>
                    </div>
                </div>

                {/* Project Name Badge */}
                {project && (
                    <div className="mt-3 pt-3 border-t border-(--bg-2)">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">{project.icon || '📁'}</span>
                            <span className="text-xs text-(--text-2)">{project.name}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Edit Task Modal */}
            {showEditModal && (
                <NewTaskModal
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    onSubmit={handleEditSubmit}
                    initialData={{
                        title: task.title,
                        description: task.description || '',
                        priority: task.priority,
                        dueDate: task.dueDate || '',
                        projectId: task.projectId
                    }}
                    projectId={task.projectId}
                    mode="edit"
                />
            )}
        </>
    )
}
