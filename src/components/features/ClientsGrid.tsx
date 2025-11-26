'use client'

import { ClientCard } from '@/components/features/ClientCard'
import { Client } from '@/types/features/client'

interface ClientsGridProps {
    clients: Client[]
    onViewProjects?: (clientId: string) => void
    onMenuClick?: (clientId: string) => void
}

export const ClientsGrid = ({ clients, onViewProjects, onMenuClick }: ClientsGridProps) => {
    return (
        <div className="grid grid-cols-5 gap-6">
            {clients.map((client) => (
                <ClientCard
                    key={client.id}
                    name={client.name}
                    role={client.role}
                    email={client.email}
                    phone={client.phone}
                    avatar={client.avatar}
                    projectsCount={client.projectsCount}
                    onViewProjects={() => onViewProjects?.(client.id)}
                    onMenuClick={() => onMenuClick?.(client.id)}
                />
            ))}
        </div>
    )
}
