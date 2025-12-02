'use client'
import { useState } from 'react'
import { useProjectStore } from '@/stores/projectStore'
import { KanbanColumn } from './KanbanColumn'
import { Task, TaskStatus } from '@/types/features/project'
import { Button } from '@components'
import { NewTaskModal, TaskFormData } from './NewTaskModal'

export const KanbanBoard = () => {
    const { tasks, selectedProjectId, projects, updateTask, addTask } = useProjectStore()
    const [showNewTaskModal, setShowNewTaskModal] = useState(false)
    const [draggedTask, setDraggedTask] = useState<Task | null>(null)

    // Get selected project
    const selectedProject = projects.find(p => p.id === selectedProjectId)

    // Filter tasks by selected project
    const projectTasks = selectedProjectId
        ? tasks.filter((task) => task.projectId === selectedProjectId)
        : []

    // Group tasks by status
    const todoTasks = projectTasks.filter((task) => task.status === 'TODO')
    const inProgressTasks = projectTasks.filter((task) => task.status === 'IN_PROGRESS')
    const doneTasks = projectTasks.filter((task) => task.status === 'DONE')

    const columns: { title: string; status: TaskStatus; tasks: typeof projectTasks; count: number }[] = [
        { title: 'To-Do', status: 'TODO', tasks: todoTasks, count: todoTasks.length },
        { title: 'In Progress', status: 'IN_PROGRESS', tasks: inProgressTasks, count: inProgressTasks.length },
        { title: 'Done', status: 'DONE', tasks: doneTasks, count: doneTasks.length }
    ]

    const handleDragStart = (task: Task) => {
        setDraggedTask(task)
    }

    const handleDrop = async (taskId: string, newStatus: TaskStatus) => {
        // Only update if status actually changed
        const task = tasks.find((t) => t.id === taskId)
        if (task && task.status !== newStatus) {
            await updateTask(taskId, { status: newStatus })
        }
        setDraggedTask(null)
    }

    const handleCreateTask = async (data: TaskFormData) => {
        await addTask({
            title: data.title,
            description: data.description || null,
            priority: data.priority,
            dueDate: data.dueDate || null,
            projectId: data.projectId,
            status: 'TODO'
        })
    }

    // Empty state when no project is selected
    if (!selectedProjectId) {
        return (
            <div className="flex-1 bg-(--bg-1) p-6 flex items-center justify-center">
                <div className="text-center max-w-md">
                    <div className="text-6xl mb-4">📋</div>
                    <h2 className="text-2xl font-bold text-(--text-1) mb-2">Choose Your Project</h2>
                    <p className="text-(--text-2)">
                        Select a project from the sidebar to view and manage its tasks
                    </p>
                </div>
            </div>
        )
    }

    // Empty state when project has no tasks
    if (projectTasks.length === 0) {
        return (
            <div className="flex-1 bg-(--bg-1) p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <h1 className="text-(--text-1) text-3xl font-semibold">Task Board</h1>
                        {selectedProject && (
                            <span className="text-(--text-2) text-sm">
                                {selectedProject.icon} {selectedProject.name}
                            </span>
                        )}
                    </div>
                    <Button
                        className="text-sm py-3 px-2 w-25! text-white"
                        primary
                        onClick={() => setShowNewTaskModal(true)}
                        title="New Task"
                    >
                        + New Task
                    </Button>
                </div>

                {/* Empty State */}
                <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                    <div className="text-center max-w-md">
                        <div className="text-6xl mb-4">✨</div>
                        <h2 className="text-2xl font-bold text-(--text-1) mb-2">No Tasks Yet</h2>
                        <p className="text-(--text-2) mb-6">
                            You don't have tasks yet, create your task to get started
                        </p>
                        <Button
                            className="text-sm py-3 px-6 text-white"
                            primary
                            onClick={() => setShowNewTaskModal(true)}
                        >
                            + Create Your First Task
                        </Button>
                    </div>
                </div>

                {/* New Task Modal */}
                <NewTaskModal
                    isOpen={showNewTaskModal}
                    onClose={() => setShowNewTaskModal(false)}
                    onSubmit={handleCreateTask}
                    projectId={selectedProjectId}
                    mode="create"
                />
            </div>
        )
    }

    return (
        <div className="flex-1 bg-(--bg-1) p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <h1 className="text-(--text-1) text-3xl font-semibold">Task Board</h1>
                    {selectedProject && (
                        <span className="text-(--text-2) text-sm">
                            {selectedProject.icon} {selectedProject.name}
                        </span>
                    )}
                </div>
                <Button
                    className="text-sm py-3 px-2 w-25! text-white"
                    primary
                    onClick={() => setShowNewTaskModal(true)}
                    title="New Task"
                >
                    + New Task
                </Button>
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

            {/* New Task Modal */}
            <NewTaskModal
                isOpen={showNewTaskModal}
                onClose={() => setShowNewTaskModal(false)}
                onSubmit={handleCreateTask}
                projectId={selectedProjectId}
                mode="create"
            />
        </div>
    )
}
