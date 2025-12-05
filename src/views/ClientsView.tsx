'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { ClientsHeader } from '@/components/features/ClientsHeader'
import { ClientsGrid } from '@/components/features/ClientsGrid'
import { NewClientModal, ClientFormData } from '@/components/features/NewClientModal'
import { useClients } from '@/hooks'


export const ClientsView = () => {

    const { data: session } = useSession()
    const [userId, setUserId] = useState<string | null>(null)
    const { clients: allClients, fetchClients, createClient, updateClient, deleteClient, clearClients } = useClients(userId)
    const [showNewClientModal, setShowNewClientModal] = useState(false)
    const [editingClient, setEditingClient] = useState<{ id: string; data: ClientFormData } | null>(null)

    // Get userId from session and clear data if user changed
    useEffect(() => {
        if (session?.user?.id) {
            // Si el usuario cambió, limpiar datos antiguos inmediatamente
            if (userId && userId !== session.user.id) {
                clearClients() // Limpiar clientes del usuario anterior
            }
            setUserId(session.user.id)
        }
    }, [session, userId, clearClients])

    // Fetch clients when userId is available
    useEffect(() => {
        if (userId) {
            fetchClients()
        }
    }, [userId, fetchClients])

    // Only show clients if userId matches session
    const clients = useMemo(() => {
        if (!session?.user?.id || !userId || session.user.id !== userId) {
            return [] // No mostrar datos si el userId no coincide
        }
        return allClients
    }, [allClients, session, userId])

    const handleAddClient = () => {
        setShowNewClientModal(true)
    }

    const handleCreateClient = async (data: ClientFormData) => {
        await createClient({
            name: data.name,
            email: data.email,
            phone: data.phone,
            role: data.role || null,
            company: data.company || null,
            address: data.address || null,
            notes: data.notes || null
        })
    }

    const handleEditClient = async (data: ClientFormData) => {
        if (editingClient) {
            await updateClient(editingClient.id, {
                name: data.name,
                email: data.email,
                phone: data.phone,
                role: data.role || null,
                company: data.company || null,
                address: data.address || null,
                notes: data.notes || null
            })
            setEditingClient(null)
        }
    }

    const handleDeleteClient = async (clientId: string) => {
        if (confirm('Are you sure you want to delete this client? This action cannot be undone.')) {
            await deleteClient(clientId)
        }
    }

    const openEditModal = (clientId: string) => {
        const client = clients.find(c => c.id === clientId)
        if (client) {
            setEditingClient({
                id: clientId,
                data: {
                    name: client.name,
                    email: client.email,
                    phone: client.phone,
                    role: client.role || '',
                    company: client.company || '',
                    address: client.address || '',
                    notes: client.notes || ''
                }
            })
        }
    }

    const handleViewProjects = (clientId: string) => {
        console.log('View projects for client:', clientId)
        // TODO: Navigate to projects view filtered by client
    }

    return (
        <div className="flex min-h-[calc(100vh-95px)] bg-(--bg-1)">
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <ClientsHeader onAddClient={handleAddClient} />

                {/* Main Content */}
                <main className="flex-1 px-8 overflow-y-auto custom-scrollbar">
                    {clients.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <p className="text-(--text-2) text-lg mb-4">No clients yet</p>
                                <p className="text-(--text-3) text-sm">Create your first client to get started</p>
                            </div>
                        </div>
                    ) : (
                        <ClientsGrid
                            clients={clients}
                            onViewProjects={handleViewProjects}
                            onEdit={openEditModal}
                            onDelete={handleDeleteClient}
                        />
                    )}
                </main>
            </div>

            {/* New Client Modal */}
            <NewClientModal
                isOpen={showNewClientModal}
                onClose={() => setShowNewClientModal(false)}
                onSubmit={handleCreateClient}
                mode="create"
            />

            {/* Edit Client Modal */}
            {editingClient && (
                <NewClientModal
                    isOpen={true}
                    onClose={() => setEditingClient(null)}
                    onSubmit={handleEditClient}
                    initialData={editingClient.data}
                    mode="edit"
                />
            )}
        </div>
    )
}
