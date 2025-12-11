import { useState, useCallback } from 'react'
import { Client } from '@/types/features/client'
import { clientService } from '@/services/client.service'
import { CreateClientInput, UpdateClientInput } from '@/validations/client.validation'

/**
 * Custom hook for managing clients
 * Provides state management and CRUD operations for clients
 */
export function useClients(userId: string | null) {
    const [clients, setClients] = useState<Client[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const clearClients = useCallback(() => {
        setClients([])
        setError(null)
    }, [])

    /**
     * Fetch all clients for the user
     */
    const fetchClients = useCallback(async () => {
        if (!userId) {
            setError('User ID not set')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const data = await clientService.getClients(userId)
            setClients(data)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch clients'
            setError(errorMessage)
            console.error('Error fetching clients:', err)
        } finally {
            setIsLoading(false)
        }
    }, [userId])

    /**
     * Fetch a single client by ID
     */
    const fetchClientById = useCallback(async (clientId: string) => {
        if (!userId) {
            setError('User ID is required')
            return null
        }

        setIsLoading(true)
        setError(null)

        try {
            const data = await clientService.getClientById(clientId, userId)
            return data
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch client'
            setError(errorMessage)
            console.error('Error fetching client:', err)
            return null
        } finally {
            setIsLoading(false)
        }
    }, [userId])

    /**
     * Create a new client
     */
    const createClient = useCallback(async (data: Omit<CreateClientInput, 'userId'>) => {
        if (!userId) {
            setError('User ID is required')
            return null
        }

        setIsLoading(true)
        setError(null)

        try {
            const newClient = await clientService.createClient({ ...data, userId })
            setClients((prev) => [...prev, newClient])
            return newClient
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create client'
            setError(errorMessage)
            console.error('Error creating client:', err)
            return null
        } finally {
            setIsLoading(false)
        }
    }, [userId])

    /**
     * Update an existing client
     */
    const updateClient = useCallback(async (clientId: string, data: UpdateClientInput) => {
        if (!userId) {
            setError('User ID is required')
            return null
        }

        setIsLoading(true)
        setError(null)

        try {
            const updatedClient = await clientService.updateClient(clientId, userId, data)
            setClients((prev) =>
                prev.map((client) => (client.id === clientId ? updatedClient : client))
            )
            return updatedClient
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update client'
            setError(errorMessage)
            console.error('Error updating client:', err)
            return null
        } finally {
            setIsLoading(false)
        }
    }, [userId])

    /**
     * Delete a client
     */
    const deleteClient = useCallback(async (clientId: string) => {
        if (!userId) {
            setError('User ID is required')
            return false
        }

        setIsLoading(true)
        setError(null)

        try {
            await clientService.deleteClient(clientId, userId)
            setClients((prev) => prev.filter((client) => client.id !== clientId))
            return true
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete client'
            setError(errorMessage)
            console.error('Error deleting client:', err)
            return false
        } finally {
            setIsLoading(false)
        }
    }, [userId])

    return {
        clients,
        isLoading,
        error,
        clearClients,
        fetchClients,
        fetchClientById,
        createClient,
        updateClient,
        deleteClient,
    }
}
