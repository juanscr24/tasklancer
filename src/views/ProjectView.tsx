import { ProjectSidebar } from '@/components/features/ProjectSidebar'
import { KanbanBoard } from '@/components/features/KanbanBoard'


const ProjectView = () => {
    return (
        <div className="flex h-full overflow-hidden">
            <ProjectSidebar />
            <KanbanBoard />
        </div>
    )
}

export default ProjectView