'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useProjectStore } from '@/stores/projectStore'
import { KanbanColumn } from './KanbanColumn'
import { Task, TaskStatus } from '@/types/features/project'
import { Button } from '@components'
import { NewTaskModal, TaskFormData } from './NewTaskModal'

export const KanbanBoard = () => {
    const t = useTranslations('taskboard')
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
        { title: t('columns.todo'), status: 'TODO', tasks: todoTasks, count: todoTasks.length },
        { title: t('columns.inProgress'), status: 'IN_PROGRESS', tasks: inProgressTasks, count: inProgressTasks.length },
        { title: t('columns.done'), status: 'DONE', tasks: doneTasks, count: doneTasks.length }
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
            <div className="flex-1 bg-(--bg-1) p-6 max-md:p-4 max-sm:p-3 flex items-center justify-center">
                <div className="text-center max-w-md px-4">
                    <div className="text-6xl max-sm:text-4xl mb-4">📋</div>
                    <h2 className="text-2xl max-sm:text-xl font-bold text-(--text-1) mb-2">{t('emptyState.noProject.title')}</h2>
                    <p className="text-(--text-2) max-sm:text-sm">
                        {t('emptyState.noProject.description')}
                    </p>
                </div>
            </div>
        )
    }

    // Empty state when project has no tasks
    if (projectTasks.length === 0) {
        return (
            <div className="flex-1 bg-(--bg-1) p-6 max-md:p-4 max-sm:p-3">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 max-sm:mb-4">
                    <div className="flex items-center gap-4 max-sm:gap-2 flex-1 min-w-0">
                        <h1 className="text-(--text-1) text-3xl max-md:text-2xl max-sm:text-xl font-semibold truncate">{t('title')}</h1>
                        {selectedProject && (
                            <span className="text-(--text-2) text-sm max-sm:text-xs truncate max-sm:hidden">
                                {selectedProject.icon} {selectedProject.name}
                            </span>
                        )}
                    </div>
                    <Button
                        className="text-sm max-sm:text-xs py-3 max-sm:py-2 px-4 max-sm:px-3 text-white flex-shrink-0"
                        primary
                        onClick={() => setShowNewTaskModal(true)}
                        title={t('newTask')}
                    >
                        <span className="max-sm:hidden">{t('newTask')}</span>
                        <span className="sm:hidden">+</span>
                    </Button>
                </div>

                {/* Empty State */}
                <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                    <div className="text-center max-w-md px-4">
                        <h2 className="text-2xl max-sm:text-xl font-bold text-(--text-1) mb-2">{t('emptyState.noTasks.title')}</h2>
                        <p className="text-(--text-2) max-sm:text-sm mb-6">
                            {t('emptyState.noTasks.description')}
                        </p>
                        <Button
                            className="text-sm py-3 px-6 max-sm:px-4 text-white"
                            primary
                            onClick={() => setShowNewTaskModal(true)}
                        >
                            {t('createFirstTask')}
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
        <div className="flex-1 bg-(--bg-1) pt-6 px-6 max-md:pt-4 max-md:px-4 max-sm:pt-3 max-sm:px-3 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 max-sm:mb-4 shrink-0">
                <div className="flex items-center gap-4 max-sm:gap-2 flex-1 min-w-0">
                    <h1 className="text-(--text-1) text-3xl max-md:text-2xl max-sm:text-xl font-semibold truncate">{t('title')}</h1>
                    {selectedProject && (
                        <span className="text-(--text-2) text-sm max-sm:text-xs truncate max-sm:hidden">
                            {selectedProject.icon} {selectedProject.name}
                        </span>
                    )}
                </div>
                <Button
                    className="text-sm max-sm:text-xs py-3 max-sm:py-2 px-4 max-sm:px-3 text-white flex-shrink-0"
                    primary
                    onClick={() => setShowNewTaskModal(true)}
                    title={t('newTask')}
                >
                    <span className="max-sm:hidden">{t('newTask')}</span>
                    <span className="sm:hidden">+</span>
                </Button>
            </div>

            {/* Kanban Columns */}
            <div className="flex gap-4 max-sm:gap-3 overflow-x-auto flex-1 min-h-0 pb-0">
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
