import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useProjectStore } from '@/stores/projectStore'
import { Project } from '@/types/features/project'
import { ProjectFormData } from '@/components/features/NewProjectModal'

export const useProjectSidebar = () => {
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
        clearData,
        userId,
        reorderProjects
    } = useProjectStore()

    const { data: session } = useSession()
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'paused'>('all')
    const [showNewProjectModal, setShowNewProjectModal] = useState(false)
    const [editingProject, setEditingProject] = useState<{ id: string; data: ProjectFormData } | null>(null)
    const [detailsProject, setDetailsProject] = useState<Project | null>(null)

    // Initialize userId from session and handle user changes
    useEffect(() => {
        if (session?.user?.id) {
            // If userId changed (different user logged in), clear old data and update userId
            if (userId !== session.user.id) {
                clearData() // Limpiar datos del usuario anterior
                setUserId(session.user.id)
            }
        }
    }, [session, userId, setUserId, clearData])

    useEffect(() => {
        if (userId) {
            fetchProjects()
            fetchTasks()
        }
    }, [userId, fetchProjects, fetchTasks])

    // Filter projects by search query and status
    const filteredProjects = projects.filter((project) => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase())
        
        if (statusFilter === 'all') return matchesSearch
        if (statusFilter === 'active') return matchesSearch && project.status === 'ACTIVE'
        if (statusFilter === 'completed') return matchesSearch && project.status === 'COMPLETED'
        if (statusFilter === 'paused') {
            return matchesSearch && ['ON_HOLD', 'CANCELLED'].includes(project.status)
        }
        
        return matchesSearch
    })

    const handleCreateProject = useCallback(async (data: ProjectFormData) => {
        await addProject({
            name: data.name,
            description: data.description || null,
            icon: data.icon || null,
            color: data.color,
            status: 'ACTIVE',
            clientId: data.clientId || null
        })
    }, [addProject])

    const handleEditProject = useCallback(async (data: ProjectFormData) => {
        if (editingProject) {
            await updateProject(editingProject.id, {
                name: data.name,
                description: data.description || null,
                icon: data.icon || null,
                color: data.color,
                status: data.status || 'ACTIVE',
                clientId: data.clientId || null
            })
            setEditingProject(null)
        }
    }, [editingProject, updateProject])

    const handleDeleteProject = useCallback(async (projectId: string) => {
        if (confirm('Are you sure you want to delete this project? All tasks will also be deleted.')) {
            await deleteProject(projectId)
        }
    }, [deleteProject])

    const openEditModal = useCallback((projectId: string) => {
        const project = projects.find(p => p.id === projectId)
        if (project) {
            setEditingProject({
                id: projectId,
                data: {
                    name: project.name,
                    description: project.description || '',
                    icon: project.icon || '📱',
                    color: project.color,
                    status: project.status,
                    clientId: project.clientId || null
                }
            })
        }
    }, [projects])

    const handleUpdateProject = useCallback(async (projectId: string, updates: Partial<Project>) => {
        await updateProject(projectId, updates)
        // Refresh projects to get updated data
        await fetchProjects()
        // Close details modal if open
        if (detailsProject?.id === projectId) {
            const updatedProject = projects.find(p => p.id === projectId)
            if (updatedProject) {
                setDetailsProject(updatedProject)
            }
        }
    }, [updateProject, fetchProjects, detailsProject, projects])

    // Just select the project (change visual state only)
    const handleProjectSelect = useCallback((project: Project) => {
        setSelectedProject(project.id)
    }, [setSelectedProject])

    // Open the details modal
    const handleOpenProjectModal = useCallback((project: Project) => {
        setSelectedProject(project.id)
        setDetailsProject(project)
    }, [setSelectedProject])

    // Handle project reordering
    const handleReorderProjects = useCallback((projectIds: string[]) => {
        reorderProjects(projectIds)
    }, [reorderProjects])

    return {
        // State
        filteredProjects,
        selectedProjectId,
        tasks,
        searchQuery,
        statusFilter,
        showNewProjectModal,
        editingProject,
        detailsProject,

        // Setters
        setSearchQuery,
        setStatusFilter,
        setShowNewProjectModal,
        setEditingProject,
        setDetailsProject,

        // Handlers
        handleCreateProject,
        handleEditProject,
        handleDeleteProject,
        handleUpdateProject,
        handleProjectSelect,
        handleOpenProjectModal,
        openEditModal,
        handleReorderProjects
    }
}
