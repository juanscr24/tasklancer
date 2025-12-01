import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

// PUT /api/tasks/[id] - Update a task
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await request.json()
        const { title, description, status, priority, dueDate } = body

        const task = await prisma.task.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(description !== undefined && { description }),
                ...(status && { status }),
                ...(priority && { priority }),
                ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null })
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

        return NextResponse.json(task)
    } catch (error) {
        console.error('Error updating task:', error)
        return NextResponse.json(
            { error: 'Failed to update task' },
            { status: 500 }
        )
    }
}

// DELETE /api/tasks/[id] - Delete a task
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        await prisma.task.delete({
            where: { id }
        })

        return NextResponse.json({ message: 'Task deleted successfully' })
    } catch (error) {
        console.error('Error deleting task:', error)
        return NextResponse.json(
            { error: 'Failed to delete task' },
            { status: 500 }
        )
    }
}
