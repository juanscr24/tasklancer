import { useState, useCallback } from 'react'
import { ProjectRequirement } from '@/types/features/requirement'
import * as requirementService from '@/services/requirement.service'
import { CreateRequirementInput, UpdateRequirementInput } from '@/validations/requirement.validation'

/**
 * Custom hook for managing project requirements
 */
export function useRequirements(projectId: string | null) {
    const [requirements, setRequirements] = useState<ProjectRequirement[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    /**
     * Fetch all requirements for the project
     */
    const fetchRequirements = useCallback(async () => {
        if (!projectId) {
            setError('Project ID is required')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const data = await requirementService.getRequirements(projectId)
            setRequirements(data)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch requirements'
            setError(errorMessage)
            console.error('Error fetching requirements:', err)
        } finally {
            setIsLoading(false)
        }
    }, [projectId])

    /**
     * Create a new requirement
     */
    const createRequirement = useCallback(async (data: CreateRequirementInput) => {
        if (!projectId) {
            setError('Project ID is required')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const newRequirement = await requirementService.createRequirement(projectId, data)
            setRequirements(prev => [...prev, newRequirement])
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create requirement'
            setError(errorMessage)
            console.error('Error creating requirement:', err)
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [projectId])

    /**
     * Update a requirement
     */
    const updateRequirement = useCallback(async (requirementId: string, data: UpdateRequirementInput) => {
        setIsLoading(true)
        setError(null)

        try {
            const updatedRequirement = await requirementService.updateRequirement(requirementId, data)
            setRequirements(prev =>
                prev.map(req => req.id === requirementId ? updatedRequirement : req)
            )
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update requirement'
            setError(errorMessage)
            console.error('Error updating requirement:', err)
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [])

    /**
     * Delete a requirement
     */
    const deleteRequirement = useCallback(async (requirementId: string) => {
        setIsLoading(true)
        setError(null)

        try {
            await requirementService.deleteRequirement(requirementId)
            setRequirements(prev => prev.filter(req => req.id !== requirementId))
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete requirement'
            setError(errorMessage)
            console.error('Error deleting requirement:', err)
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [])

    return {
        requirements,
        isLoading,
        error,
        fetchRequirements,
        createRequirement,
        updateRequirement,
        deleteRequirement
    }
}
