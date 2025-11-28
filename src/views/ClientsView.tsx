'use client'

import { ClientsHeader } from '@/components/features/ClientsHeader'
import { ClientsGrid } from '@/components/features/ClientsGrid'

export const ClientsView = () => {
    // Mock data - esto se reemplazará con datos reales del store o API
    const clients = [
        {
            id: '1',
            name: 'Camilo Parra',
            role: 'DevOps Engineer',
            email: 'camilo@gmail.com',
            phone: '+57 3202020020',
            projectsCount: 3
        },
        {
            id: '2',
            name: 'Camilo Parra',
            role: 'DevOps Engineer',
            email: 'camilo@gmail.com',
            phone: '+57 3202020020',
            projectsCount: 5
        },
        {
            id: '3',
            name: 'Camilo Parra',
            role: 'DevOps Engineer',
            email: 'camilo@gmail.com',
            phone: '+57 3202020020',
            projectsCount: 2
        },
        {
            id: '4',
            name: 'Camilo Parra',
            role: 'DevOps Engineer',
            email: 'camilo@gmail.com',
            phone: '+57 3202020020',
            projectsCount: 2
        },
        {
            id: '5',
            name: 'Camilo Parra',
            role: 'DevOps Engineer',
            email: 'camilo@gmail.com',
            phone: '+57 3202020020',
            projectsCount: 2
        }
    ]

    const handleAddClient = () => {
        console.log('Add new client')
        // Aquí se abrirá un modal o se navegará a un formulario
    }

    const handleViewProjects = (clientId: string) => {
        console.log('View projects for client:', clientId)
        // Aquí se navegará a la vista de proyectos del cliente
    }

    const handleMenuClick = (clientId: string) => {
        console.log('Menu clicked for client:', clientId)
        // Aquí se mostrará un menú contextual (editar, eliminar, etc.)
    }

    return (
        <div className="flex min-h-[calc(100vh-95px)] bg-(--bg-1)">
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <ClientsHeader onAddClient={handleAddClient} />

                {/* Main Content */}
                <main className="flex-1 px-8 overflow-y-auto custom-scrollbar">
                    <ClientsGrid
                        clients={clients}
                        onViewProjects={handleViewProjects}
                        onMenuClick={handleMenuClick}
                    />
                </main>
            </div>
        </div>
    )
}
