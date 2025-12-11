'use client';

import { useEffect, useState } from 'react';
import { CardResumen } from '@/components/ui/CardResumen';
import { CardUrgentTasks } from '@/components/ui/CardUrgentTasks';
import { CardActiveProjects } from '@/components/ui/CardActiveProjects';
import { CardFinancialSnapshot } from '@/components/ui/CardFinancialSnapshot';
import { DashboardData } from '@/types/dashboard';
import { useLocaleStore } from '@/stores/localeStore';

export const DashboardView = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState<string | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const { messages } = useLocaleStore();
    const t = messages.dashboard;

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const query = selectedClient ? `?clientId=${selectedClient}` : '';
                const response = await fetch(`/api/dashboard${query}`);
                if (response.ok) {
                    const jsonData = await response.json();
                    setData(jsonData);
                }
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [selectedClient]);

    if (loading && !data) { // Only show full loading spinner on initial load
        return (
            <div className="flex min-h-[calc(100vh-95px)] bg-(--bg-1) text-white font-sans items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="flex min-h-[calc(100vh-95px)] bg-(--bg-1) text-white font-sans items-center justify-center">
                <p>Failed to load dashboard data.</p>
            </div>
        );
    }

    const resumenData = [
        { title: t.summary.tasksDueToday, value: data.summary.tasksDueToday },
        { title: t.summary.plannedHours, value: data.summary.plannedHours },
        { title: t.summary.activeProjects, value: data.summary.activeProjects },
        { title: t.summary.totalClients, value: data.summary.totalClients },
    ];

    return (
        <div className="flex min-h-screen bg-(--bg-1) text-white font-sans">
            {/* Main Content - Offset by sidebar width (w-60 = 15rem = 240px) */}
            <div className="flex-1 flex flex-col">

                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-(--text-1)">{t.title}</h1>
                        <p className="text-(--text-2) mt-2 text-sm">{t.subtitle}</p>
                    </div>

                    {/* CONTENEDOR PRINCIPAL FLEX COLUMNA */}
                    <div className="flex flex-col gap-8">

                        {/* 1. FILA SUPERIOR: 4 Tarjetas (Grid Responsive) */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full" >
                            {resumenData.map((item, i) => (
                                <CardResumen key={i} {...item} />
                            ))}
                        </div>

                        {/* Filter Section - Dropdown */}
                        <div className="relative w-full sm:w-64 z-20">
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="w-full flex items-center justify-between px-4 py-2 bg-(--bg-2) border border-(--border-1) rounded-lg text-sm text-(--text-1) hover:bg-(--bg-3) transition-colors"
                            >
                                <span className="truncate">
                                    {selectedClient
                                        ? data.clients?.find(c => c.id === selectedClient)?.name
                                        : t.filter.allClients}
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isFilterOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsFilterOpen(false)}
                                    />
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-(--bg-2) border border-(--border-1) rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto custom-scrollbar">
                                        <button
                                            onClick={() => {
                                                setSelectedClient(null);
                                                setIsFilterOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 text-sm hover:bg-(--bg-3) transition-colors ${!selectedClient ? 'text-(--btn-1) font-medium' : 'text-(--text-2)'}`}
                                        >
                                            {t.filter.allClients}
                                        </button>
                                        {data.clients?.map((client) => (
                                            <button
                                                key={client.id}
                                                onClick={() => {
                                                    setSelectedClient(client.id);
                                                    setIsFilterOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2 text-sm hover:bg-(--bg-3) transition-colors ${selectedClient === client.id ? 'text-(--btn-1) font-medium' : 'text-(--text-2)'}`}
                                            >
                                                {client.name}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* 2. FILA MEDIA: Urgent Tasks (66%) + Financial (33%) */}
                        <div className="flex flex-col lg:flex-row gap-6 w-full">
                            {/* Urgent Tasks - Flex 2 */}
                            <div className="lg:w-2/3 flex flex-col">
                                <CardUrgentTasks tasks={data.urgentTasks} />
                            </div>

                            {/* Financial Snapshot - Flex 1 */}
                            <div className="lg:w-1/3 flex flex-col">
                                <CardFinancialSnapshot total={data.quotationsTotal || 0} quotations={data.quotations || []} />
                            </div>
                        </div>

                        {/* 3. FILA INFERIOR: Proyectos (Ancho completo) */}
                        <div className="w-full flex flex-col">
                            <h4 className="text-lg font-semibold mb-4 text-(--text-1)">{t.activeProjects.title}</h4>
                            <CardActiveProjects projects={data.activeProjects} />
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
