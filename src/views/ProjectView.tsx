'use client'
import { ProjectSidebar } from '@/components/features/ProjectSidebar'
import { KanbanBoard } from '@/components/features/KanbanBoard'
import { HeaderSearch } from '@/components'

const ProjectView = () => {
    return (
        <div className="h-screen">
            <HeaderSearch />
            <div className="flex h-[calc(100vh-96px)]">
                <ProjectSidebar />
                <KanbanBoard />
            </div>
        </div>
    )
}

export default ProjectView