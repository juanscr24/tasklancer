import { NextResponse } from 'next/server';
import { auth } from '@main/auth';
import { db } from '@/lib/db';

export async function GET(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const clientId = searchParams.get('clientId');
        const userId = session.user.id;

        // 0. Fetch Clients for Filter
        const clients = await db.client.findMany({
            where: { userId },
            select: { id: true, name: true },
            orderBy: { name: 'asc' },
        });

        // 1. Summary Stats
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const tasksDueToday = await db.task.count({
            where: {
                project: {
                    userId,
                    ...(clientId ? { clientId } : {}),
                },
                status: { not: 'DONE' },
                dueDate: {
                    gte: todayStart,
                    lte: todayEnd,
                },
            },
        });

        // Planned Hours: Sum of estimatedHours for active projects
        const activeProjectsStats = await db.project.aggregate({
            where: {
                userId,
                status: 'ACTIVE',
                ...(clientId ? { clientId } : {}),
            },
            _sum: {
                estimatedHours: true,
            },
        });
        const plannedHours = Number(activeProjectsStats._sum.estimatedHours || 0);

        const activeProjectsCount = await db.project.count({
            where: {
                userId,
                status: 'ACTIVE',
                ...(clientId ? { clientId } : {}),
            },
        });

        const totalClients = await db.client.count({
            where: {
                userId,
                // No filtering by client for total clients count, usually we want to see total available
                // But if filtered, maybe we want to see 1? Let's keep it total for now or filter if desired.
                // If filtering by a specific client, total clients is 1 (if exists) or 0.
                ...(clientId ? { id: clientId } : {}),
            },
        });

        // 2. Urgent Tasks (Top 5, not done, sorted by due date, due within 7 days)
        const sevenDaysFromNow = new Date();
        sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
        sevenDaysFromNow.setHours(23, 59, 59, 999);

        const urgentTasks = await db.task.findMany({
            where: {
                project: {
                    userId,
                    ...(clientId ? { clientId } : {}),
                },
                status: { not: 'DONE' },
                dueDate: {
                    not: null,
                    lte: sevenDaysFromNow
                },
            },
            orderBy: {
                dueDate: 'asc',
            },
            take: 5,
            select: {
                id: true,
                title: true,
                status: true,
                dueDate: true,
                project: {
                    select: {
                        name: true,
                        client: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        // Process urgent tasks to add statusText and formatted dueDate
        const formattedUrgentTasks = urgentTasks.map(task => {
            const dueDate = new Date(task.dueDate!);
            // Reset time part for comparison
            const dueDateOnly = new Date(dueDate);
            dueDateOnly.setHours(0, 0, 0, 0);

            const todayOnly = new Date();
            todayOnly.setHours(0, 0, 0, 0);

            const tomorrowOnly = new Date(todayOnly);
            tomorrowOnly.setDate(tomorrowOnly.getDate() + 1);

            let status = 'due-later';
            let statusText = 'Due Later';

            if (dueDateOnly < todayOnly) {
                status = 'overdue';
                statusText = 'Overdue';
            } else if (dueDateOnly.getTime() === todayOnly.getTime()) {
                status = 'due-today';
                statusText = 'Due Today';
            } else if (dueDateOnly.getTime() === tomorrowOnly.getTime()) {
                status = 'due-tomorrow';
                statusText = 'Due Tomorrow';
            }

            return {
                id: task.id,
                title: task.title,
                status,
                statusText,
                dueDate: dueDate.toLocaleDateString(),
                project: task.project.name,
                client: task.project.client?.name || 'No Client',
            };
        });

        // 3. Recent Invoices (Top 5, sorted by createdAt desc)
        const recentInvoices = await db.invoice.findMany({
            where: {
                userId,
                ...(clientId ? { clientId } : {}),
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 5,
            select: {
                id: true,
                invoiceNumber: true,
                total: true,
                status: true,
                dueDate: true,
                client: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        const formattedInvoices = recentInvoices.map(invoice => {
            const dueDate = new Date(invoice.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const diffTime = dueDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            let statusText = '';
            if (diffDays < 0) {
                statusText = `Overdue ${Math.abs(diffDays)} days`;
            } else {
                statusText = `Due in ${diffDays} days`;
            }

            return {
                code: invoice.invoiceNumber,
                amount: Number(invoice.total).toFixed(2),
                statusText: statusText,
                clientName: invoice.client.name,
            }
        });

        // Calculate Total Outstanding (Sent + Overdue)
        const outstandingStats = await db.invoice.aggregate({
            where: {
                userId,
                status: { in: ['SENT', 'OVERDUE'] },
                ...(clientId ? { clientId } : {}),
            },
            _sum: {
                total: true,
            },
        });
        const totalOutstanding = Number(outstandingStats._sum.total || 0);


        // 4. Active Projects List (Top 5)
        const activeProjectsList = await db.project.findMany({
            where: {
                userId,
                status: 'ACTIVE',
                ...(clientId ? { clientId } : {}),
            },
            take: 5,
            include: {
                client: {
                    select: { name: true },
                },
                tasks: {
                    select: { status: true },
                },
            },
        });

        const formattedProjects = activeProjectsList.map(project => {
            const totalTasks = project.tasks.length;
            const completedTasks = project.tasks.filter(t => t.status === 'DONE').length;
            const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

            return {
                name: project.name,
                progress,
                client: project.client?.name || 'No Client',
            };
        });

        // 5. Quotations (Active and Completed Projects with totalPrice > 0)
        const quotations = await db.project.findMany({
            where: {
                userId,
                totalPrice: { gt: 0 },
                status: { in: ['ACTIVE', 'COMPLETED'] },
                ...(clientId ? { clientId } : {}),
            },
            orderBy: {
                updatedAt: 'desc',
            },
            include: {
                client: {
                    select: { name: true },
                },
            },
        });

        const quotationsTotal = quotations.reduce((sum, project) => {
            return sum + (Number(project.totalPrice) || 0);
        }, 0);

        const formattedQuotations = quotations.map(q => ({
            id: q.id,
            name: q.name,
            clientName: q.client?.name || 'No Client',
            totalPrice: Number(q.totalPrice),
            status: q.status,
        }));

        return NextResponse.json({
            summary: {
                tasksDueToday,
                plannedHours,
                activeProjects: activeProjectsCount,
                totalClients,
            },
            urgentTasks: formattedUrgentTasks,
            recentInvoices: formattedInvoices,
            activeProjects: formattedProjects,
            totalOutstanding,
            clients,
            quotations: formattedQuotations,
            quotationsTotal,
        });

    } catch (error) {
        console.error('[DASHBOARD_GET]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}