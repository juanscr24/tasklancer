'use client'
import { useState, useEffect } from 'react'
import { useProjectStore } from '@/stores/projectStore'
import { Button, SearchBar } from '@components'
import { NewProjectModal, ProjectFormData } from './NewProjectModal'
import { DropdownMenu } from '@/components/ui/DropdownMenu'

export const ProjectSidebar = () => {
    const {
        projects,
        selectedProjectId,
        setSelectedProject,
        tasks,
        fetchProjects,
        fetchTasks,
        addProject,
        updateProject,
        deleteProject,
        setUserId,
        userId
    } = useProjectStore()

    const [searchQuery, setSearchQuery] = useState('')
    const [showNewProjectModal, setShowNewProjectModal] = useState(false)
    const [editingProject, setEditingProject] = useState<{ id: string; data: ProjectFormData } | null>(null)

    // Initialize userId and fetch data
    useEffect(() => {
        const initializeUser = async () => {
            if (!userId) {
                try {
                    // Fetch the first user from the database for testing
                    const response = await fetch('/api/users/first')
                    if (response.ok) {
                        const user = await response.json()
                        setUserId(user.id)
                    }
                } catch (error) {
                    console.error('Error fetching user:', error)
                }
            }
        }
        initializeUser()
    }, [userId, setUserId])

    useEffect(() => {
        if (userId) {
            fetchProjects()
            fetchTasks()
        }
    }, [userId, fetchProjects, fetchTasks])

    // Filter projects by search query
    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Calculate progress for each project
    const getProjectProgress = (projectId: string) => {
        const projectTasks = tasks.filter((task) => task.projectId === projectId)
        if (projectTasks.length === 0) return 0
        const completedTasks = projectTasks.filter((task) => task.status === 'DONE')
        return Math.round((completedTasks.length / projectTasks.length) * 100)
    }

    const handleCreateProject = async (data: ProjectFormData) => {
        await addProject({
            name: data.name,
            description: data.description || null,
            icon: data.icon || null,
            color: data.color,
            status: 'ACTIVE',
            clientId: data.clientId || null
        })
    }

    const handleEditProject = async (data: ProjectFormData) => {
        if (editingProject) {
            await updateProject(editingProject.id, {
                name: data.name,
                description: data.description || null,
                icon: data.icon || null,
                color: data.color,
                clientId: data.clientId || null
            })
            setEditingProject(null)
        }
    }

    const handleDeleteProject = async (projectId: string) => {
        if (confirm('Are you sure you want to delete this project? All tasks will also be deleted.')) {
            await deleteProject(projectId)
        }
    }

    const openEditModal = (projectId: string) => {
        const project = projects.find(p => p.id === projectId)
        if (project) {
            setEditingProject({
                id: projectId,
                data: {
                    name: project.name,
                    description: project.description || '',
                    icon: project.icon || '📱',
                    color: project.color,
                    clientId: project.clientId || null
                }
            })
        }
    }

    return (
        <div className="w-80 flex flex-col bg-(--bg-2) py-7 px-4 border-r border-(--bg-2)">
            {/* Header */}
            <div className="flex gap-4 justify-between mb-6">
                <h2 className="text-3xl text-(--text-1) font-bold">Projects</h2>
                <Button
                    className="text-sm py-2 px-2 w-25! text-white"
                    primary
                    onClick={() => setShowNewProjectModal(true)}
                    title="New Project"
                >
                    New project
                </Button>
            </div>

            {/* Search Bar */}
            <SearchBar
                className="mt-2 mb-6 bg-white dark:bg-[#232F48]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Projects List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {filteredProjects.map((project) => {
                    const progress = getProjectProgress(project.id)
                    const isSelected = selectedProjectId === project.id
                    const taskCount = tasks.filter((task) => task.projectId === project.id).length

                    return (
                        <div
                            key={project.id}
                            onClick={() => setSelectedProject(project.id)}
                            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 relative ${isSelected
                                ? 'bg-(--btn-1) text-white'
                                : 'bg-(--bg-1) hover:bg-(--bg-2) text-(--text-1)'
                                }`}
                        >
                            {/* Project Header */}
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl"
                                    style={{ backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : project.color }}
                                >
                                    {project.icon || '📁'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-sm truncate">{project.name}</h3>
                                    <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-(--text-2)'}`}>
                                        {project.description || 'No description'}
                                    </p>
                                    {project.client && (
                                        <p className={`text-xs mt-1 ${isSelected ? 'text-white/70' : 'text-(--text-3)'}`}>
                                            👤 {project.client.name}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-(--text-2)'}`}>
                                        {taskCount}
                                    </span>
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <DropdownMenu
                                            onEdit={() => openEditModal(project.id)}
                                            onDelete={() => handleDeleteProject(project.id)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar with Percentage */}
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-(--text-2)'}`}>
                                        Progress
                                    </span>
                                    <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-(--btn-1)'}`}>
                                        {progress}%
                                    </span>
                                </div>
                                <div className="w-full bg-(--bg-2) rounded-full h-2 overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-300 ${isSelected ? 'bg-white' : 'bg-(--btn-1)'
                                            }`}
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}

                {filteredProjects.length === 0 && (
                    <div className="text-center py-8 text-(--text-2)">
                        <p className="text-sm">No projects found</p>
                        <p className="text-xs mt-2">Create your first project to get started</p>
                    </div>
                )}
            </div>

            {/* New Project Modal */}
            <NewProjectModal
                isOpen={showNewProjectModal}
                onClose={() => setShowNewProjectModal(false)}
                onSubmit={handleCreateProject}
                mode="create"
            />

            {/* Edit Project Modal */}
            {editingProject && (
                <NewProjectModal
                    isOpen={true}
                    onClose={() => setEditingProject(null)}
                    onSubmit={handleEditProject}
                    initialData={editingProject.data}
                    mode="edit"
                />
            )}
        </div>
    )
}
