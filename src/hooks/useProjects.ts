import { useState, useCallback } from 'react'
import { Project } from '@/types/features/project'
import { projectService } from '@/services'
import { CreateProjectInput, UpdateProjectInput } from '@/validations'

/**
 * Custom hook for managing projects
 * Provides state management and CRUD operations for projects
 */
export function useProjects(userId: string | null) {
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    /**
     * Fetch all projects for the user
     */
    const fetchProjects = useCallback(async () => {
        if (!userId) {
            setError('User ID is required')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const data = await projectService.getProjects(userId)
            setProjects(data)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch projects'
            setError(errorMessage)
            console.error('Error fetching projects:', err)
        } finally {
            setIsLoading(false)
        }
    }, [userId])

    /**
     * Fetch a single project by ID
     */
    const fetchProjectById = useCallback(async (projectId: string) => {
        if (!userId) {
            setError('User ID is required')
            return null
        }

        setIsLoading(true)
        setError(null)

        try {
            const data = await projectService.getProjectById(projectId, userId)
            return data
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch project'
            setError(errorMessage)
            console.error('Error fetching project:', err)
            return null
        } finally {
            setIsLoading(false)
        }
    }, [userId])

    /**
     * Create a new project
     */
    const createProject = useCallback(async (data: Omit<CreateProjectInput, 'userId'>) => {
        if (!userId) {
            setError('User ID is required')
            return null
        }

        setIsLoading(true)
        setError(null)

        try {
            const newProject = await projectService.createProject({ ...data, userId })
            setProjects((prev) => [...prev, newProject])
            return newProject
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create project'
            setError(errorMessage)
            console.error('Error creating project:', err)
            return null
        } finally {
            setIsLoading(false)
        }
    }, [userId])

    /**
     * Update an existing project
     */
    const updateProject = useCallback(async (projectId: string, data: UpdateProjectInput) => {
        setIsLoading(true)
        setError(null)

        try {
            const updatedProject = await projectService.updateProject(projectId, data)
            setProjects((prev) =>
                prev.map((project) => (project.id === projectId ? updatedProject : project))
            )
            return updatedProject
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update project'
            setError(errorMessage)
            console.error('Error updating project:', err)
            return null
        } finally {
            setIsLoading(false)
        }
    }, [])

    /**
     * Delete a project
     */
    const deleteProject = useCallback(async (projectId: string) => {
        setIsLoading(true)
        setError(null)

        try {
            await projectService.deleteProject(projectId)
            setProjects((prev) => prev.filter((project) => project.id !== projectId))
            return true
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete project'
            setError(errorMessage)
            console.error('Error deleting project:', err)
            return false
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        projects,
        isLoading,
        error,
        fetchProjects,
        fetchProjectById,
        createProject,
        updateProject,
        deleteProject,
    }
}
