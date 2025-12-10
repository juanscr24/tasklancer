'use client'

import { ClientCard } from '@/components/features/ClientCard'
import { Client } from '@/types/features/client'

interface ClientsGridProps {
    clients: Client[]
    onViewProjects?: (clientId: string) => void
    onEdit?: (clientId: string) => void
    onDelete?: (clientId: string) => void
}

export const ClientsGrid = ({ clients, onViewProjects, onEdit, onDelete }: ClientsGridProps) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {clients.map((client) => (
                <ClientCard
                    key={client.id}
                    name={client.name}
                    role={client.role || 'No role'}
                    email={client.email}
                    phone={client.phone}
                    avatar={client.avatar}
                    company={client.company}
                    notes={client.notes}
                    projectsCount={client.projectsCount}
                    onViewProjects={() => onViewProjects?.(client.id)}
                    onEdit={() => onEdit?.(client.id)}
                    onDelete={() => onDelete?.(client.id)}
                />
            ))}
        </div>
    )
}
