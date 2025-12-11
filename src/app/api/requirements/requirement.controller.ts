import { NextRequest, NextResponse } from 'next/server'
import { db as prisma } from '@/lib/db'
import {
    createRequirementSchema,
    updateRequirementSchema,
    requirementIdSchema
} from '@/validations/requirement.validation'

/**
 * GET /api/projects/[id]/requirements - Get all requirements for a project
 */
export async function handleGetRequirements(
    request: NextRequest,
    params: { id: string }
) {
    try {
        const projectId = params.id

        // Verify project exists
        const project = await prisma.project.findUnique({
            where: { id: projectId }
        })

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            )
        }

        // Get all requirements for the project
        const requirements = await prisma.projectRequirement.findMany({
            where: { projectId },
            orderBy: { order: 'asc' }
        })

        return NextResponse.json(requirements)
    } catch (error) {
        console.error('Error fetching requirements:', error)
        return NextResponse.json(
            { error: 'Failed to fetch requirements' },
            { status: 500 }
        )
    }
}

/**
 * POST /api/projects/[id]/requirements - Create a new requirement
 */
export async function handleCreateRequirement(
    request: NextRequest,
    params: { id: string }
) {
    try {
        const projectId = params.id
        const body = await request.json()

        // Validate request body
        const validatedData = createRequirementSchema.parse(body)

        // Verify project exists
        const project = await prisma.project.findUnique({
            where: { id: projectId }
        })

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            )
        }

        // Create requirement
        const requirement = await prisma.projectRequirement.create({
            data: {
                ...validatedData,
                projectId
            }
        })

        return NextResponse.json(requirement, { status: 201 })
    } catch (error) {
        console.error('Error creating requirement:', error)

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Invalid request data' },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Failed to create requirement' },
            { status: 500 }
        )
    }
}

/**
 * PUT /api/requirements/[id] - Update a requirement
 */
export async function handleUpdateRequirement(
    request: NextRequest,
    params: { id: string }
) {
    try {
        const validatedId = requirementIdSchema.parse({ id: params.id })
        const body = await request.json()
        const validatedData = updateRequirementSchema.parse(body)

        // Check if requirement exists
        const existingRequirement = await prisma.projectRequirement.findUnique({
            where: { id: validatedId.id }
        })

        if (!existingRequirement) {
            return NextResponse.json(
                { error: 'Requirement not found' },
                { status: 404 }
            )
        }

        // Update requirement
        const updatedRequirement = await prisma.projectRequirement.update({
            where: { id: validatedId.id },
            data: validatedData
        })

        return NextResponse.json(updatedRequirement)
    } catch (error) {
        console.error('Error updating requirement:', error)

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Invalid request data' },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Failed to update requirement' },
            { status: 500 }
        )
    }
}

/**
 * DELETE /api/requirements/[id] - Delete a requirement
 */
export async function handleDeleteRequirement(
    request: NextRequest,
    params: { id: string }
) {
    try {
        const validatedId = requirementIdSchema.parse({ id: params.id })

        // Check if requirement exists
        const existingRequirement = await prisma.projectRequirement.findUnique({
            where: { id: validatedId.id }
        })

        if (!existingRequirement) {
            return NextResponse.json(
                { error: 'Requirement not found' },
                { status: 404 }
            )
        }

        // Delete requirement
        await prisma.projectRequirement.delete({
            where: { id: validatedId.id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting requirement:', error)

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Invalid request data' },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Failed to delete requirement' },
            { status: 500 }
        )
    }
}
