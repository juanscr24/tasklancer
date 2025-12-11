import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            )
        }

        // Get all stats in parallel
        const [
            totalProjects,
            activeProjects,
            totalClients,
            totalTasks,
            completedTasks,
            invoices,
            projects
        ] = await Promise.all([
            // Total projects
            db.project.count({
                where: { userId }
            }),
            // Active projects
            db.project.count({
                where: { userId, status: 'ACTIVE' }
            }),
            // Total clients
            db.client.count({
                where: { userId }
            }),
            // Total tasks
            db.task.count({
                where: {
                    project: { userId }
                }
            }),
            // Completed tasks
            db.task.count({
                where: {
                    project: { userId },
                    status: 'DONE'
                }
            }),
            // All invoices with totals
            db.invoice.findMany({
                where: { userId },
                select: {
                    status: true,
                    total: true
                }
            }),
            // All projects with totalPrice (quotes)
            db.project.findMany({
                where: { userId },
                select: {
                    totalPrice: true
                }
            })
        ])

        // Calculate invoice stats
        const totalInvoices = invoices.length
        const paidInvoices = invoices.filter(inv => inv.status === 'PAID').length

        // Calculate total revenue from project quotes (totalPrice)
        const totalRevenue = projects
            .reduce((sum, project) => sum + Number(project.totalPrice || 0), 0)

        return NextResponse.json({
            totalProjects,
            activeProjects,
            totalClients,
            totalTasks,
            completedTasks,
            totalInvoices,
            paidInvoices,
            totalRevenue
        })
    } catch (error) {
        console.error('Error fetching stats:', error)
        return NextResponse.json(
            { error: 'Failed to fetch stats' },
            { status: 500 }
        )
    }
}
