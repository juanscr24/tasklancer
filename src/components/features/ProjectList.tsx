'use client'
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
}

export const ProjectList = ({
    projects,
    tasks,
    selectedProjectId,
    onProjectSelect,
    onProjectOpenModal,
    onProjectEdit,
    onProjectDelete
}: ProjectListProps) => {
    // Calculate progress for each project
    const getProjectProgress = (projectId: string) => {
        const projectTasks = tasks.filter((task) => task.projectId === projectId)
        if (projectTasks.length === 0) return 0
        const completedTasks = projectTasks.filter((task) => task.status === 'DONE')
        return Math.round((completedTasks.length / projectTasks.length) * 100)
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
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {projects.map((project) => {
                const progress = getProjectProgress(project.id)
                const isSelected = selectedProjectId === project.id
                const taskCount = tasks.filter((task) => task.projectId === project.id).length

                return (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        isSelected={isSelected}
                        progress={progress}
                        taskCount={taskCount}
                        onSelect={() => onProjectSelect(project)}
                        onOpenModal={() => onProjectOpenModal(project)}
                        onEdit={() => onProjectEdit(project.id)}
                        onDelete={() => onProjectDelete(project.id)}
                        onInvoice={true}
                    />
                )
            })}
        </div>
    )
}
