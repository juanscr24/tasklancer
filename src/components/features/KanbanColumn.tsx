'use client'
import { useState } from 'react'
import { Task, TaskStatus } from '@/types/features/project'
import { TaskCard } from './TaskCard'

interface KanbanColumnProps {
    title: string
    status: TaskStatus
    tasks: Task[]
    count: number
    onDrop?: (taskId: string, newStatus: TaskStatus) => void
    onDragStart?: (task: Task) => void
}

export const KanbanColumn = ({ title, status, tasks, count, onDrop, onDragStart }: KanbanColumnProps) => {
    const [isDragOver, setIsDragOver] = useState(false)

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
        setIsDragOver(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX
        const y = e.clientY

        if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
            setIsDragOver(false)
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDragOver(false)

        const taskId = e.dataTransfer.getData('text/plain')
        if (onDrop && taskId) {
            onDrop(taskId, status)
        }
    }

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex-1 min-w-[300px] bg-(--bg-2) rounded-lg p-4 transition-all duration-200 ${isDragOver ? 'ring-2 ring-(--btn-1) bg-opacity-80' : ''
                }`}
        >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-(--text-1) font-bold text-lg">
                    {title} ({count})
                </h2>
            </div>

            {/* Tasks List */}
            <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
                ))}
                {tasks.length === 0 && (
                    <div className="text-center py-8 text-(--text-2)">
                        <p className="text-sm">No tasks yet</p>
                    </div>
                )}
            </div>
        </div>
    )
}
