'use client'

import { ServiceCard } from '@/components/ui/ServiceCard'
import { ServiceCategory } from '@/components/ui/ServiceCategory'
import { ServiceStats } from '@/components/ui/ServiceStats'
import { useStats } from '@/hooks/useStats'
import { useTranslations } from 'next-intl'

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
    const t = useTranslations('services')

    // Real stats from database
    const statsData = [
        {
            label: t('stats.activeProjects'),
            value: isLoading ? '...' : stats.activeProjects.toString(),
            icon: Briefcase,
            trend: {
                value: `${stats.totalProjects} ${t('stats.total')}`,
                isPositive: true
            }
        },
        {
            label: t('stats.clients'),
            value: isLoading ? '...' : stats.totalClients.toString(),
            icon: Users,
            trend: {
                value: t('stats.active'),
                isPositive: true
            }
        },
        {
            label: t('stats.completedTasks'),
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
            label: t('stats.totalRevenue'),
            value: isLoading ? '...' : `$${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
            icon: DollarSign,
            trend: {
                value: `${stats.paidInvoices} ${t('stats.paidInvoices')}`,
                isPositive: true
            }
        }
    ]

    return (
        <div className="flex flex-col bg-(--bg-1)">
            {/* Header */}
            <div className="px-8 py-6 bg-(--bg-1)">
                <h1 className="text-3xl font-bold text-(--text-1)">{t('title')}</h1>
                <p className="text-(--text-2) mt-2 text-sm">
                    {t('subtitle')}
                </p>
            </div>

            {/* Main Content */}
            <main className="flex-1 px-8 pb-8">
                {/* Stats Overview */}
                <ServiceStats stats={statsData} />

                {/* Project Management Category */}
                <ServiceCategory
                    title={t('categories.projectManagement.title')}
                    description={t('categories.projectManagement.description')}
                    icon={<Briefcase className="w-6 h-6 text-white" />}
                >
                    <ServiceCard
                        title={t('services.projectsAndTasks.title')}
                        description={t('services.projectsAndTasks.description')}
                        icon={Briefcase}
                        badge={t('badges.implemented')}
                        onClick={() => console.log('Proyectos')}
                    />
                    <ServiceCard
                        title={t('services.projectQuotes.title')}
                        description={t('services.projectQuotes.description')}
                        icon={FileText}
                        badge={t('badges.implemented')}
                        onClick={() => console.log('Cotizaciones')}
                    />
                    <ServiceCard
                        title={t('services.clientRequirements.title')}
                        description={t('services.clientRequirements.description')}
                        icon={CheckSquare}
                        badge={t('badges.implemented')}
                        onClick={() => console.log('Requerimientos')}
                    />
                </ServiceCategory>

                {/* Client Management Category */}
                <ServiceCategory
                    title={t('categories.clientManagement.title')}
                    description={t('categories.clientManagement.description')}
                    icon={<Users className="w-6 h-6 text-white" />}
                >
                    <ServiceCard
                        title={t('services.clientDatabase.title')}
                        description={t('services.clientDatabase.description')}
                        icon={Users}
                        badge={t('badges.implemented')}
                        onClick={() => console.log('Clientes')}
                    />
                </ServiceCategory>

                {/* Time Management Category */}
                <ServiceCategory
                    title={t('categories.timeManagement.title')}
                    description={t('categories.timeManagement.description')}
                    icon={<Clock className="w-6 h-6 text-white" />}
                >
                    <ServiceCard
                        title={t('services.timeTracker.title')}
                        description={t('services.timeTracker.description')}
                        icon={Clock}
                        badge={t('badges.comingSoon')}
                        onClick={() => console.log('Time Tracker')}
                    />
                </ServiceCategory>

                {/* Invoicing Category */}
                <ServiceCategory
                    title={t('categories.invoicing.title')}
                    description={t('categories.invoicing.description')}
                    icon={<FileText className="w-6 h-6 text-white" />}
                >
                    <ServiceCard
                        title={t('services.invoiceGenerator.title')}
                        description={t('services.invoiceGenerator.description')}
                        icon={FileText}
                        badge={t('badges.comingSoon')}
                        onClick={() => console.log('Facturas')}
                    />
                </ServiceCategory>
            </main>
        </div>
    )
}
