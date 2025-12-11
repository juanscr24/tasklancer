'use client'
import { useState } from 'react'
import { Project, Task } from '@/types/features/project'
import { ProjectCard } from './ProjectCard'

interface ProjectListProps {
    projects: Project[]
    tasks: Task[]
    selectedProjectId: string | null
    onProjectSelect: (project: Project) => void  // For selecting (clicking card)
    onProjectOpenModal: (project: Project) => void  // For opening modal (clicking "Factura")
    onProjectEdit: (projectId: string) => void
    onProjectDelete: (projectId: string) => void
    onReorder: (projectIds: string[]) => void
}

export const ProjectList = ({
    projects,
    tasks,
    selectedProjectId,
    onProjectSelect,
    onProjectOpenModal,
    onProjectEdit,
    onProjectDelete,
    onReorder
}: ProjectListProps) => {
    const [draggedProjectId, setDraggedProjectId] = useState<string | null>(null)
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
    // Calculate progress for each project
    const getProjectProgress = (projectId: string) => {
        const projectTasks = tasks.filter((task) => task.projectId === projectId)
        if (projectTasks.length === 0) return 0
        const completedTasks = projectTasks.filter((task) => task.status === 'DONE')
        return Math.round((completedTasks.length / projectTasks.length) * 100)
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.preventDefault()
        setDragOverIndex(index)
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
        e.preventDefault()
        const draggedId = e.dataTransfer.getData('text/plain')
        
        if (!draggedId || draggedId === projects[dropIndex]?.id) {
            setDraggedProjectId(null)
            setDragOverIndex(null)
            return
        }

        const draggedIndex = projects.findIndex(p => p.id === draggedId)
        if (draggedIndex === -1) return

        const newProjects = [...projects]
        const [removed] = newProjects.splice(draggedIndex, 1)
        newProjects.splice(dropIndex, 0, removed)

        onReorder(newProjects.map(p => p.id))
        setDraggedProjectId(null)
        setDragOverIndex(null)
    }

    if (projects.length === 0) {
        return (
            <div className="text-center py-8 text-(--text-2)">
                <p className="text-sm">No projects found</p>
                <p className="text-xs mt-2">Create your first project to get started</p>
            </div>
        )
    }

    return (
        <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
            {projects.map((project, index) => {
                const progress = getProjectProgress(project.id)
                const isSelected = selectedProjectId === project.id
                const taskCount = tasks.filter((task) => task.projectId === project.id).length
                const isDragging = draggedProjectId === project.id

                return (
                    <div
                        key={project.id}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDrop={(e) => handleDrop(e, index)}
                        className={`relative ${
                            dragOverIndex === index ? 'border-t-2 border-(--btn-1)' : ''
                        }`}
                    >
                        <ProjectCard
                            project={project}
                            isSelected={isSelected}
                            progress={progress}
                            taskCount={taskCount}
                            onSelect={() => onProjectSelect(project)}
                            onOpenModal={() => onProjectOpenModal(project)}
                            onEdit={() => onProjectEdit(project.id)}
                            onDelete={() => onProjectDelete(project.id)}
                            onInvoice={true}
                            onDragStart={() => setDraggedProjectId(project.id)}
                            onDragEnd={() => setDraggedProjectId(null)}
                            isDragging={isDragging}
                        />
                    </div>
                )
            })}
        </div>
    )
}
