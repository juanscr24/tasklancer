import { CreateClientInput, UpdateClientInput } from '@/validations/client.validation'
import { Client } from '@/types/features/client'

const API_BASE_URL = '/api/clients'

/**
 * Client Service
 * Handles all client-related API calls
 */
export const clientService = {
    /**
     * Fetch all clients for a user
     */
    async getClients(userId: string): Promise<Client[]> {
        const response = await fetch(`${API_BASE_URL}?userId=${userId}`)

        if (!response.ok) {
            throw new Error('Failed to fetch clients')
        }

        return response.json()
    },

    /**
     * Fetch a single client by ID
     */
    async getClientById(clientId: string, userId: string): Promise<Client> {
        const response = await fetch(`${API_BASE_URL}/${clientId}?userId=${userId}`)

        if (!response.ok) {
            throw new Error('Failed to fetch client')
        }

        return response.json()
    },

    /**
     * Create a new client
     */
    async createClient(data: CreateClientInput): Promise<Client> {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error('Failed to create client')
        }

        return response.json()
    },

    /**
     * Update an existing client
     */
    async updateClient(clientId: string, data: UpdateClientInput): Promise<Client> {
        const response = await fetch(`${API_BASE_URL}/${clientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            throw new Error('Failed to update client')
        }

        return response.json()
    },

    /**
     * Delete a client
     */
    async deleteClient(clientId: string): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/${clientId}`, {
            method: 'DELETE',
        })

        if (!response.ok) {
            throw new Error('Failed to delete client')
        }
    },
}
