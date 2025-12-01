import { CardResumen } from '@/components/ui/CardResumen';
import { CardUrgentTasks } from '@/components/ui/CardUrgentTasks';
import { CardActiveProjects } from '@/components/ui/CardActiveProjects';
import { CardFinancialSnapshot } from '@/components/ui/CardFinancialSnapshot';
import { Button } from '@/components';


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
                            <Button className='w-fit! text-xs py-3! text-white' primary children="Filter by Client" />
                            <Button className='w-fit! text-xs py-3! font-medium' secondary children="Client A" />
                            <Button className='w-fit! text-xs py-3! font-medium' secondary children="Client B" />
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
