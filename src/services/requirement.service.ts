import { ProjectRequirement } from '@/types/features/requirement'
import { CreateRequirementInput, UpdateRequirementInput } from '@/validations/requirement.validation'

const API_BASE_URL = '/api/requirements'

/**
 * Get all requirements for a project
 */
export async function getRequirements(projectId: string): Promise<ProjectRequirement[]> {
    const response = await fetch(`/api/projects/${projectId}/requirements`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch requirements')
    }

    return response.json()
}

/**
 * Create a new requirement
 */
export async function createRequirement(
    projectId: string,
    data: CreateRequirementInput
): Promise<ProjectRequirement> {
    const response = await fetch(`/api/projects/${projectId}/requirements`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create requirement')
    }

    return response.json()
}

/**
 * Update a requirement
 */
export async function updateRequirement(
    requirementId: string,
    data: UpdateRequirementInput
): Promise<ProjectRequirement> {
    const response = await fetch(`${API_BASE_URL}/${requirementId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to update requirement')
    }

    return response.json()
}

/**
 * Delete a requirement
 */
export async function deleteRequirement(requirementId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/${requirementId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete requirement')
    }
}
