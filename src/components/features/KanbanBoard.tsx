'use client'
import { useState } from 'react'
import { useProjectStore } from '@/stores/projectStore'
import { KanbanColumn } from './KanbanColumn'
import { Task, TaskStatus } from '@/types/features/project'

export const KanbanBoard = () => {
    const { tasks, selectedProjectId, updateTask } = useProjectStore()
    const [showNewTaskModal, setShowNewTaskModal] = useState(false)
    const [draggedTask, setDraggedTask] = useState<Task | null>(null)

    // Filter tasks by selected project
    const projectTasks = selectedProjectId
        ? tasks.filter((task) => task.projectId === selectedProjectId)
        : []

    // Group tasks by status
    const todoTasks = projectTasks.filter((task) => task.status === 'todo')
    const inProgressTasks = projectTasks.filter((task) => task.status === 'in-progress')
    const doneTasks = projectTasks.filter((task) => task.status === 'done')

    const columns: { title: string; status: TaskStatus; tasks: typeof projectTasks; count: number }[] = [
        { title: 'To-Do', status: 'todo', tasks: todoTasks, count: todoTasks.length },
        { title: 'In Progress', status: 'in-progress', tasks: inProgressTasks, count: inProgressTasks.length },
        { title: 'Done', status: 'done', tasks: doneTasks, count: doneTasks.length }
    ]

    const handleDragStart = (task: Task) => {
        setDraggedTask(task)
    }

    const handleDrop = (taskId: string, newStatus: TaskStatus) => {
        // Only update if status actually changed
        const task = tasks.find((t) => t.id === taskId)
        if (task && task.status !== newStatus) {
            updateTask(taskId, { status: newStatus })
        }
        setDraggedTask(null)
    }

    return (
        <div className="flex-1 h-screen bg-(--bg-1) p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-(--text-1) text-3xl font-semibold">Task Board</h1>
                </div>
                <button
                    onClick={() => setShowNewTaskModal(true)}
                    className="bg-(--btn-1) hover:bg-(--btn-2) text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2"
                >
                    <span className="text-xl">+</span>
                    New Task
                </button>
            </div>

            {/* Kanban Columns */}
            <div className="flex gap-4 overflow-x-auto pb-4">
                {columns.map((column) => (
                    <KanbanColumn
                        key={column.status}
                        title={column.title}
                        status={column.status}
                        tasks={column.tasks}
                        count={column.count}
                        onDrop={handleDrop}
                        onDragStart={handleDragStart}
                    />
                ))}
            </div>

            {/* TODO: Add NewTaskModal */}
            {showNewTaskModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-(--bg-1) p-6 rounded-lg">
                        <h2 className="text-(--text-1) text-xl font-bold mb-4">New Task Modal</h2>
                        <button
                            onClick={() => setShowNewTaskModal(false)}
                            className="bg-(--btn-1) text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
