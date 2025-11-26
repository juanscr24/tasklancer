'use client'
import { ProjectSidebar } from '@/components/features/ProjectSidebar'
import { KanbanBoard } from '@/components/features/KanbanBoard'

const ProjectView = () => {
    return (
        <div className="flex h-screen">
            <ProjectSidebar />
            <KanbanBoard />
        </div>
    )
}

export default ProjectView