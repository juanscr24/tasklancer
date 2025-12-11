import { Project } from '@/types/features/project'
import { CreateProjectInput, UpdateProjectInput } from '@/validations'

/**
 * Project Service
 * Handles all API calls related to projects
 */

const API_BASE_URL = '/api/projects'

/**
 * Fetch all projects for a user
 */
export async function getProjects(userId: string): Promise<Project[]> {
    const response = await fetch(`${API_BASE_URL}?userId=${userId}`)

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch projects')
    }

    return response.json()
}

/**
 * Fetch a single project by ID
 */
export async function getProjectById(projectId: string, userId: string): Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/${projectId}?userId=${userId}`)

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch project')
    }

    return response.json()
}

/**
 * Create a new project
 */
export async function createProject(data: CreateProjectInput): Promise<Project> {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create project')
    }

    return response.json()
}

/**
 * Update an existing project
 */
export async function updateProject(
    projectId: string,
    userId: string,
    data: UpdateProjectInput
): Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/${projectId}?userId=${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update project')
    }

    return response.json()
}

/**
 * Delete a project
 */
export async function deleteProject(projectId: string, userId: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/${projectId}?userId=${userId}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete project')
    }

    return response.json()
}

/**
 * Update project order
 */
export async function updateProjectsOrder(userId: string, projectIds: string[]): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/reorder`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, projectIds }),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update project order')
    }
}
