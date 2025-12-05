'use client'

import { ServiceCard } from '@/components/ui/ServiceCard'
import { ServiceCategory } from '@/components/ui/ServiceCategory'
import { ServiceStats } from '@/components/ui/ServiceStats'
import { useStats } from '@/hooks/useStats'

import {
    FileText,
    Clock,
    Users,
    Briefcase,
    CheckSquare,
    DollarSign
} from 'lucide-react'

export const ServicesView = () => {
    const { stats, isLoading } = useStats()

    // Real stats from database
    const statsData = [
        {
            label: 'Proyectos Activos',
            value: isLoading ? '...' : stats.activeProjects.toString(),
            icon: Briefcase,
            trend: {
                value: `${stats.totalProjects} total`,
                isPositive: true
            }
        },
        {
            label: 'Clientes',
            value: isLoading ? '...' : stats.totalClients.toString(),
            icon: Users,
            trend: {
                value: 'activos',
                isPositive: true
            }
        },
        {
            label: 'Tareas Completadas',
            value: isLoading ? '...' : `${stats.completedTasks}/${stats.totalTasks}`,
            icon: CheckSquare,
            trend: {
                value: stats.totalTasks > 0
                    ? `${Math.round((stats.completedTasks / stats.totalTasks) * 100)}%`
                    : '0%',
                isPositive: true
            }
        },
        {
            label: 'Ingresos Totales',
            value: isLoading ? '...' : `$${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            icon: DollarSign,
            trend: {
                value: `${stats.paidInvoices} facturas pagadas`,
                isPositive: true
            }
        }
    ]

    return (
        <div className="flex min-h-[calc(100vh-95px) bg-(--bg-1)">
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="px-8 py-6 bg-(--bg-1)">
                    <h1 className="text-3xl font-bold text-(--text-1)">Servicios para Freelancers</h1>
                    <p className="text-(--text-2) mt-2 text-sm">
                        Herramientas profesionales para gestionar tu negocio freelance
                    </p>
                </div>

                {/* Main Content */}
                <main className="flex-1 px-8 overflow-y-auto custom-scrollbar">
                    {/* Stats Overview */}
                    <ServiceStats stats={statsData} />

                    {/* Project Management Category */}
                    <ServiceCategory
                        title="Gestión de Proyectos"
                        description="Organiza y administra tus proyectos freelance"
                        icon={<Briefcase className="w-6 h-6 text-white" />}
                    >
                        <ServiceCard
                            title="Proyectos y Tareas"
                            description="Crea proyectos, asigna tareas y organiza tu trabajo con tableros Kanban"
                            icon={Briefcase}
                            badge="Implementado"
                            onClick={() => console.log('Proyectos')}
                        />
                        <ServiceCard
                            title="Cotizaciones de Proyectos"
                            description="Genera cotizaciones profesionales con estimación de horas y precios"
                            icon={FileText}
                            badge="Implementado"
                            onClick={() => console.log('Cotizaciones')}
                        />
                        <ServiceCard
                            title="Requerimientos del Cliente"
                            description="Documenta y gestiona los requerimientos de cada proyecto"
                            icon={CheckSquare}
                            badge="Implementado"
                            onClick={() => console.log('Requerimientos')}
                        />
                    </ServiceCategory>

                    {/* Client Management Category */}
                    <ServiceCategory
                        title="Gestión de Clientes"
                        description="Organiza y mantén relaciones con tus clientes"
                        icon={<Users className="w-6 h-6 text-white" />}
                    >
                        <ServiceCard
                            title="Base de Datos de Clientes"
                            description="Almacena información de contacto, empresa, proyectos asociados y notas importantes"
                            icon={Users}
                            badge="Implementado"
                            onClick={() => console.log('Clientes')}
                        />
                    </ServiceCategory>

                    {/* Time Management Category */}
                    <ServiceCategory
                        title="Gestión de Tiempo"
                        description="Registra y optimiza tu tiempo de trabajo"
                        icon={<Clock className="w-6 h-6 text-white" />}
                    >
                        <ServiceCard
                            title="Time Tracker"
                            description="Registra las horas trabajadas por proyecto con inicio/pausa automático"
                            icon={Clock}
                            badge="Próximamente"
                            onClick={() => console.log('Time Tracker')}
                        />
                    </ServiceCategory>

                    {/* Invoicing Category */}
                    <ServiceCategory
                        title="Facturación"
                        description="Gestiona tus facturas y pagos de manera profesional"
                        icon={<FileText className="w-6 h-6 text-white" />}
                    >
                        <ServiceCard
                            title="Generador de Facturas"
                            description="Crea facturas profesionales con detalles del cliente y conceptos personalizados"
                            icon={FileText}
                            badge="Próximamente"
                            onClick={() => console.log('Facturas')}
                        />
                    </ServiceCategory>
                </main>
            </div>
        </div>
    )
}
