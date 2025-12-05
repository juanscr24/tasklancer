import { NextRequest, NextResponse } from 'next/server'
import { db as prisma } from '@/lib/db'
import { Prisma } from '@prisma/client'
import {
    createProjectSchema,
    updateProjectSchema,
    projectQuerySchema,
    projectIdSchema,
} from '@/validations'
import { ZodError } from 'zod'

/**
 * Project Controller
 * Handles business logic for project API routes
 */

/**
 * Handle GET /api/projects - Fetch all projects for a user
 */
export async function handleGetProjects(request: NextRequest) {
    try {
        // Validate query parameters
        const userId = request.nextUrl.searchParams.get('userId')
        const validatedQuery = projectQuerySchema.parse({ userId })

        const projects = await prisma.project.findMany({
            where: {
                userId: validatedQuery.userId,
            },
            include: {
                tasks: true,
                client: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json(projects)
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            )
        }

        console.error('Error fetching projects:', error)
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        )
    }
}

/**
 * Handle POST /api/projects - Create a new project
 */
export async function handleCreateProject(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate request body
        const validatedData = createProjectSchema.parse(body)

        const project = await prisma.project.create({
            data: {
                name: validatedData.name,
                description: validatedData.description || null,
                icon: validatedData.icon || null,
                color: validatedData.color,
                status: validatedData.status,
                userId: validatedData.userId,
                clientId: validatedData.clientId || null,
            },
            include: {
                tasks: true,
                client: true,
            },
        })

        return NextResponse.json(project, { status: 201 })
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            )
        }

        console.error('Error creating project:', error)
        return NextResponse.json(
            { error: 'Failed to create project' },
            { status: 500 }
        )
    }
}

/**
 * Handle PUT /api/projects/[id] - Update a project
 */
export async function handleUpdateProject(
    request: NextRequest,
    params: { id: string }
) {
    try {
        // Validate project ID
        const validatedId = projectIdSchema.parse({ id: params.id })

        // Get userId from query params
        const userId = request.nextUrl.searchParams.get('userId')
        if (!userId) {
            return NextResponse.json(
                { error: 'userId is required' },
                { status: 400 }
            )
        }

        // Check if project exists and belongs to user
        const existingProject = await prisma.project.findUnique({
            where: { id: validatedId.id },
        })

        if (!existingProject) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            )
        }

        if (existingProject.userId !== userId) {
            return NextResponse.json(
                { error: 'Forbidden: You do not have permission to update this project' },
                { status: 403 }
            )
        }

        const body = await request.json()

        // Validate request body
        const validatedData = updateProjectSchema.parse(body)

        // Calculate totalPrice if hourlyRate or estimatedHours are provided
        let totalPrice: Prisma.Decimal | null = existingProject.totalPrice
        if (validatedData.hourlyRate !== undefined || validatedData.estimatedHours !== undefined) {
            const rate = validatedData.hourlyRate ?? (existingProject.hourlyRate ? Number(existingProject.hourlyRate) : 0)
            const hours = validatedData.estimatedHours ?? (existingProject.estimatedHours ? Number(existingProject.estimatedHours) : 0)
            totalPrice = new Prisma.Decimal(rate * hours)
        }

        const project = await prisma.project.update({
            where: { id: validatedId.id },
            data: {
                ...(validatedData.name && { name: validatedData.name }),
                ...(validatedData.description !== undefined && { description: validatedData.description }),
                ...(validatedData.icon !== undefined && { icon: validatedData.icon }),
                ...(validatedData.color && { color: validatedData.color }),
                ...(validatedData.status && { status: validatedData.status }),
                ...(validatedData.clientId !== undefined && { clientId: validatedData.clientId }),
                ...(validatedData.hourlyRate !== undefined && { hourlyRate: validatedData.hourlyRate }),
                ...(validatedData.estimatedHours !== undefined && { estimatedHours: validatedData.estimatedHours }),
                ...(validatedData.priority && { priority: validatedData.priority }),
                ...(totalPrice !== null && { totalPrice }),
            },
            include: {
                client: true,
            },
        })

        return NextResponse.json(project)
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            )
        }

        console.error('Error updating project:', error)
        return NextResponse.json(
            { error: 'Failed to update project' },
            { status: 500 }
        )
    }
}

/**
 * Handle DELETE /api/projects/[id] - Delete a project
 */
export async function handleDeleteProject(
    request: NextRequest,
    params: { id: string }
) {
    try {
        // Validate project ID
        const validatedId = projectIdSchema.parse({ id: params.id })

        // Get userId from query params
        const userId = request.nextUrl.searchParams.get('userId')
        if (!userId) {
            return NextResponse.json(
                { error: 'userId is required' },
                { status: 400 }
            )
        }

        // Check if project exists and belongs to user
        const existingProject = await prisma.project.findUnique({
            where: { id: validatedId.id },
        })

        if (!existingProject) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            )
        }

        if (existingProject.userId !== userId) {
            return NextResponse.json(
                { error: 'Forbidden: You do not have permission to delete this project' },
                { status: 403 }
            )
        }

        await prisma.project.delete({
            where: { id: validatedId.id },
        })

        return NextResponse.json({ message: 'Project deleted successfully' })
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            )
        }

        console.error('Error deleting project:', error)
        return NextResponse.json(
            { error: 'Failed to delete project' },
            { status: 500 }
        )
    }
}
