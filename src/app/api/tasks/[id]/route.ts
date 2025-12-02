import { NextRequest } from 'next/server'
import { handleUpdateTask, handleDeleteTask } from '../task.controller'

/**
 * PUT /api/tasks/[id] - Update a task
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    return handleUpdateTask(request, { id })
}

/**
 * DELETE /api/tasks/[id] - Delete a task
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    return handleDeleteTask(request, { id })
}

