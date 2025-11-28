import { CardResumen } from '@/components/ui/CardResumen';
import { CardUrgentTasks } from '@/components/ui/CardUrgentTasks';
import { CardActiveProjects } from '@/components/ui/CardActiveProjects';
import { CardFinancialSnapshot } from '@/components/ui/CardFinancialSnapshot';

export const DashboardView = () => {
    // Datos de ejemplo para las tarjetas
    const resumenData = [
        { title: "Today's Tasks", value: 5 },
        { title: "Planned Hours", value: 5 },
        { title: "Active Projects", value: 3 },
        { title: "Active Projects", value: 3 },
    ];
    const tasks = [
        { title: 'Finalize Marketing Campaign Mockups', status: 'overdue', statusText: 'Overdue', dueDate: 'Yesterday' },
        { title: 'Finalize Marketing Campaign Mockups', status: 'due-today', statusText: 'Due Today', dueDate: '11:59 PM' },
        { title: 'Finalize Marketing Campaign Mockups', status: 'due-tomorrow', statusText: 'Due Tomorrow', dueDate: 'Yesterday' },
    ];
    const invoices = [
        { code: 'INV-2023-098', amount: '4,200', statusText: 'Due in 3 days' },
        { code: 'INV-2023-098', amount: '4,200', statusText: 'Overdue 5 days' },
        { code: 'INV-2023-098', amount: '4,200', statusText: 'Due in 15 days' },
    ];
    const projects = [
        { name: 'Project Phoenix', progress: 85, client: 'Client A' },
        { name: 'Project Phoenix', progress: 5, client: 'Client A' },
        { name: 'Project Phoenix', progress: 15, client: 'Client A' },
    ];

    return (

        <div className="flex min-h-[calc(100vh-95px)] bg-(--bg-1) text-white font-sans">

            {/* Main Content - Offset by sidebar width (w-60 = 15rem = 240px) */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <main className="flex-1 p-8 overflow-y-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-(--text-1)">Welcome back, XXX</h1>
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
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2336] rounded-lg text-xs font-medium text-(--text-2) hover:bg-gray-700 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                Filter by Client
                            </button>
                            <button className="px-4 py-2 bg-[#135BEC] rounded-lg text-xs font-medium text-white shadow-lg shadow-blue-500/30 hover:bg-[#135BEC]">
                                Client A
                            </button>
                            <button className="px-4 py-2 bg-[#1A2336] rounded-lg text-xs font-medium text-(--text-2) hover:bg-gray-700  transition duration-700 ease-in-out ">
                                Client A
                            </button>
                        </div>

                        {/* 2. FILA MEDIA: Urgent Tasks (66%) + Financial (33%) */}
                        <div className="flex flex-col lg:flex-row gap-6 w-full">
                            {/* Urgent Tasks - Flex 2 */}
                            <div className="lg:flex-2 flex flex-col">
                                <CardUrgentTasks tasks={tasks} />
                            </div>

                            {/* Financial Snapshot - Flex 1 */}
                            <div className="lg:flex-1 flex flex-col">
                                <CardFinancialSnapshot total="8,450.00" invoices={invoices} />
                            </div>
                        </div>

                        {/* 3. FILA INFERIOR: Proyectos (Ancho completo) */}
                        <div className="w-full flex flex-col">
                            <h4 className="text-lg font-semibold mb-4 text-(--text-1)">Active Projects</h4>
                            <CardActiveProjects projects={projects} />
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
