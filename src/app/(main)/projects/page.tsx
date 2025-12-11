import ProjectView from "@/views/ProjectView"
import { auth } from '@main/auth'

const Projects = async () => {
    const session = await auth()
    if (!session?.user) {
        return <div className="flex items-center justify-center min-h-[calc(100vh-95px)]">Por favor, inicia sesión para ver el dashboard</div>
    }
    return (
        <ProjectView />
    )
}

export default Projects