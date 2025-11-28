'use client'
import { ProjectSidebar } from '@/components/features/ProjectSidebar'
import { KanbanBoard } from '@/components/features/KanbanBoard'

const ProjectView = () => {
    return (
        <div className="min-h-[calc(100vh-96px)]">
            <div className="flex h-[calc(100vh-95px)]">
                <ProjectSidebar />
                <KanbanBoard />
            </div>
        </div>
    )
}

export default ProjectView