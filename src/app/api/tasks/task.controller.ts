import { NextRequest, NextResponse } from 'next/server'
import { db as prisma } from '@/lib/db'
import {
    createTaskSchema,
    updateTaskSchema,
    taskQuerySchema,
    taskIdSchema,
} from '@/validations'
import { ZodError } from 'zod'

/**
 * Task Controller
 * Handles business logic for task API routes
 */

/**
 * Handle GET /api/tasks - Fetch tasks (optionally filtered by projectId)
 */
export async function handleGetTasks(request: NextRequest) {
    try {
        // Validate query parameters
        const userId = request.nextUrl.searchParams.get('userId')
        const projectId = request.nextUrl.searchParams.get('projectId')

        const validatedQuery = taskQuerySchema.parse({ userId, projectId })

        const tasks = await prisma.task.findMany({
            where: {
                project: {
                    userId: validatedQuery.userId,
                },
                ...(validatedQuery.projectId && { projectId: validatedQuery.projectId }),
            },
            include: {
                project: {
                    select: {
                        id: true,
                        name: true,
                        color: true,
                        icon: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json(tasks)
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            )
        }

        console.error('Error fetching tasks:', error)
        return NextResponse.json(
            { error: 'Failed to fetch tasks' },
            { status: 500 }
        )
    }
}

/**
 * Handle POST /api/tasks - Create a new task
 */
export async function handleCreateTask(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate request body
        const validatedData = createTaskSchema.parse(body)

        const task = await prisma.task.create({
            data: {
                title: validatedData.title,
                description: validatedData.description || null,
                status: validatedData.status,
                priority: validatedData.priority,
                projectId: validatedData.projectId,
                dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
            },
            include: {
                project: {
                    select: {
                        id: true,
                        name: true,
                        color: true,
                        icon: true,
                    },
                },
            },
        })

        return NextResponse.json(task, { status: 201 })
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            )
        }

        console.error('Error creating task:', error)
        return NextResponse.json(
            { error: 'Failed to create task' },
            { status: 500 }
        )
    }
}

/**
 * Handle PUT /api/tasks/[id] - Update a task
 */
export async function handleUpdateTask(
    request: NextRequest,
    params: { id: string }
) {
    try {
        // Validate task ID
        const validatedId = taskIdSchema.parse({ id: params.id })

        const body = await request.json()

        // Validate request body
        const validatedData = updateTaskSchema.parse(body)

        const task = await prisma.task.update({
            where: { id: validatedId.id },
            data: {
                ...(validatedData.title && { title: validatedData.title }),
                ...(validatedData.description !== undefined && { description: validatedData.description }),
                ...(validatedData.status && { status: validatedData.status }),
                ...(validatedData.priority && { priority: validatedData.priority }),
                ...(validatedData.dueDate !== undefined && {
                    dueDate: validatedData.dueDate ? new Date(validatedData.dueDate) : null,
                }),
            },
            include: {
                project: {
                    select: {
                        id: true,
                        name: true,
                        color: true,
                        icon: true,
                    },
                },
            },
        })

        return NextResponse.json(task)
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            )
        }

        console.error('Error updating task:', error)
        return NextResponse.json(
            { error: 'Failed to update task' },
            { status: 500 }
        )
    }
}

/**
 * Handle DELETE /api/tasks/[id] - Delete a task
 */
export async function handleDeleteTask(
    request: NextRequest,
    params: { id: string }
) {
    try {
        // Validate task ID
        const validatedId = taskIdSchema.parse({ id: params.id })

        await prisma.task.delete({
            where: { id: validatedId.id },
        })

        return NextResponse.json({ message: 'Task deleted successfully' })
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            )
        }

        console.error('Error deleting task:', error)
        return NextResponse.json(
            { error: 'Failed to delete task' },
            { status: 500 }
        )
    }
}
