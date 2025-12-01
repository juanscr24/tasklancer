import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

// GET /api/tasks - Fetch tasks (optionally filtered by projectId)
export async function GET(request: NextRequest) {
    try {
        const projectId = request.nextUrl.searchParams.get('projectId')
        const userId = request.nextUrl.searchParams.get('userId')

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            )
        }

        const tasks = await prisma.task.findMany({
            where: {
                project: {
                    userId: userId
                },
                ...(projectId && { projectId })
            },
            include: {
                project: {
                    select: {
                        id: true,
                        name: true,
                        color: true,
                        icon: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(tasks)
    } catch (error) {
        console.error('Error fetching tasks:', error)
        return NextResponse.json(
            { error: 'Failed to fetch tasks' },
            { status: 500 }
        )
    }
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { title, description, status, priority, projectId, dueDate } = body

        if (!title || !projectId) {
            return NextResponse.json(
                { error: 'Title and projectId are required' },
                { status: 400 }
            )
        }

        const task = await prisma.task.create({
            data: {
                title,
                description: description || null,
                status: status || 'TODO',
                priority: priority || 'MEDIUM',
                projectId,
                dueDate: dueDate ? new Date(dueDate) : null
            },
            include: {
                project: {
                    select: {
                        id: true,
                        name: true,
                        color: true,
                        icon: true
                    }
                }
            }
        })

        return NextResponse.json(task, { status: 201 })
    } catch (error) {
        console.error('Error creating task:', error)
        return NextResponse.json(
            { error: 'Failed to create task' },
            { status: 500 }
        )
    }
}
