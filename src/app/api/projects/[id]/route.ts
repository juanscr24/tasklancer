import { NextRequest } from 'next/server'
import { handleUpdateProject, handleDeleteProject } from '../project.controller'

/**
 * PUT /api/projects/[id] - Update a project
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    return handleUpdateProject(request, { id })
}

/**
 * DELETE /api/projects/[id] - Delete a project
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
    return handleDeleteProject(request, { id })
}

