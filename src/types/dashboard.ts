export interface DashboardData {
    summary: {
        tasksDueToday: number;
        plannedHours: number;
        activeProjects: number;
        totalClients: number;
    };
    urgentTasks: {
        id: string;
        title: string;
        status: string;
        statusText: string;
        dueDate: string;
        project: string;
        client: string;
    }[];
    recentInvoices: {
        code: string;
        amount: string;
        statusText: string;
        clientName: string;
    }[];
    activeProjects: {
        name: string;
        progress: number;
        client: string;
    }[];
    totalOutstanding: number;
    clients: {
        id: string;
        name: string;
    }[];
}
