'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components';
import { Bell, Search } from 'lucide-react';
import { CardResumen } from '@/components/ui/CardResumen';
import { CardUrgentTasks } from '@/components/ui/CardUrgentTasks';
import { CardActiveProjects } from '@/components/ui/CardActiveProjects';
import { CardFinancialSnapshot } from '@/components/ui/CardFinancialSnapshot';
import { DashboardData } from '@/types/dashboard';

export const DashboardView = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState<string | null>(null);

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
        { title: "Today's Tasks", value: data.summary.tasksDueToday },
        { title: "Planned Hours", value: data.summary.plannedHours },
        { title: "Active Projects", value: data.summary.activeProjects },
        { title: "Total Clients", value: data.summary.totalClients },
    ];


    return (
        <div className="flex min-h-screen bg-(--bg-1) text-white font-sans">
            {/* Main Content - Offset by sidebar width (w-60 = 15rem = 240px) */}
            <div className="flex-1 flex flex-col">

                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-(--text-1)">Dashboard Overview</h1>
                        <p className="text-(--text-2) mt-2 text-sm">Here's your command center for today</p>
                    </div>

                    {/* CONTENEDOR PRINCIPAL FLEX COLUMNA */}
                    <div className="flex flex-col gap-8">

                        {/* 1. FILA SUPERIOR: 3 Tarjetas (Anchos iguales) */}
                        <div className="flex flex-row justify-around items-center gap-6 w-full bg-(--bg-2) rounded-xl shadow-lg p-6 text-(--text-1) h-full border border-(--border-1)" >
                            {resumenData.map((item, i) => (
                                <div key={i} className="flex justify-around items-center w-full">
                                    <CardResumen {...item} />
                                </div>
                            ))}
                        </div>

                        {/* Filter Section */}
                        <div className="flex items-center gap-4 overflow-x-auto pb-2">
                            <button
                                onClick={() => setSelectedClient(null)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${!selectedClient ? 'bg-[#135BEC] text-white shadow-lg shadow-blue-500/30' : 'bg-[#1A2336] text-(--text-2) hover:bg-gray-700'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                All Clients
                            </button>
                            {data.clients?.map((client) => (
                                <button
                                    key={client.id}
                                    onClick={() => setSelectedClient(client.id)}
                                    className={`px-4 py-2 rounded-lg text-xs font-medium transition duration-300 ease-in-out ${selectedClient === client.id ? 'bg-[#135BEC] text-white shadow-lg shadow-blue-500/30' : 'bg-[#1A2336] text-(--text-2) hover:bg-gray-700'}`}
                                >
                                    {client.name}
                                </button>
                            ))}
                        </div>

                        {/* 2. FILA MEDIA: Urgent Tasks (66%) + Financial (33%) */}
                        <div className="flex flex-col lg:flex-row gap-6 w-full">
                            {/* Urgent Tasks - Flex 2 */}
                            <div className="lg:flex-2 flex flex-col">
                                <CardUrgentTasks tasks={data.urgentTasks} />
                            </div>

                            {/* Financial Snapshot - Flex 1 */}
                            <div className="lg:flex-1 flex flex-col">
                                <CardFinancialSnapshot total={data.totalOutstanding} invoices={data.recentInvoices} />
                            </div>
                        </div>

                        {/* 3. FILA INFERIOR: Proyectos (Ancho completo) */}
                        <div className="w-full flex flex-col">
                            <h4 className="text-lg font-semibold mb-4 text-(--text-1)">Active Projects</h4>
                            <CardActiveProjects projects={data.activeProjects} />
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
