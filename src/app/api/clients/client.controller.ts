import { NextRequest, NextResponse } from 'next/server'
import { db as prisma } from '@/lib/db'
import {
    createClientSchema,
    updateClientSchema,
    clientQuerySchema,
    clientIdSchema,
} from '@/validations/client.validation'
import { ZodError } from 'zod'

/**
 * Client Controller
 * Handles business logic for client API routes
 */

/**
 * Handle GET /api/clients - Fetch all clients for a user
 */
export async function handleGetClients(request: NextRequest) {
    try {
        // Validate query parameters
        const userId = request.nextUrl.searchParams.get('userId')
        const validatedQuery = clientQuerySchema.parse({ userId })

        const clients = await prisma.client.findMany({
            where: {
                userId: validatedQuery.userId,
            },
            include: {
                projects: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        // Add projectsCount to each client
        const clientsWithCount = clients.map(client => ({
            ...client,
            projectsCount: client.projects.length,
        }))

        return NextResponse.json(clientsWithCount)
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            )
        }

        console.error('Error fetching clients:', error)
        return NextResponse.json(
            { error: 'Failed to fetch clients' },
            { status: 500 }
        )
    }
}

/**
 * Handle POST /api/clients - Create a new client
 */
export async function handleCreateClient(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate request body
        const validatedData = createClientSchema.parse(body)

        const client = await prisma.client.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                phone: validatedData.phone,
                role: validatedData.role || null,
                company: validatedData.company || null,
                address: validatedData.address || null,
                avatar: validatedData.avatar || null,
                notes: validatedData.notes || null,
                userId: validatedData.userId,
            },
            include: {
                projects: true,
            },
        })

        return NextResponse.json(client, { status: 201 })
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            )
        }

        console.error('Error creating client:', error)
        return NextResponse.json(
            { error: 'Failed to create client' },
            { status: 500 }
        )
    }
}

/**
 * Handle PUT /api/clients/[id] - Update a client
 */
export async function handleUpdateClient(
    request: NextRequest,
    params: { id: string }
) {
    try {
        // Validate client ID
        const validatedId = clientIdSchema.parse({ id: params.id })

        // Get userId from query params
        const userId = request.nextUrl.searchParams.get('userId')
        if (!userId) {
            return NextResponse.json(
                { error: 'userId is required' },
                { status: 400 }
            )
        }

        // Check if client exists and belongs to user
        const existingClient = await prisma.client.findUnique({
            where: { id: validatedId.id },
        })

        if (!existingClient) {
            return NextResponse.json(
                { error: 'Client not found' },
                { status: 404 }
            )
        }

        if (existingClient.userId !== userId) {
            return NextResponse.json(
                { error: 'Forbidden: You do not have permission to update this client' },
                { status: 403 }
            )
        }

        const body = await request.json()

        // Validate request body
        const validatedData = updateClientSchema.parse(body)

        const client = await prisma.client.update({
            where: { id: validatedId.id },
            data: {
                ...(validatedData.name && { name: validatedData.name }),
                ...(validatedData.email && { email: validatedData.email }),
                ...(validatedData.phone && { phone: validatedData.phone }),
                ...(validatedData.role !== undefined && { role: validatedData.role }),
                ...(validatedData.company !== undefined && { company: validatedData.company }),
                ...(validatedData.address !== undefined && { address: validatedData.address }),
                ...(validatedData.avatar !== undefined && { avatar: validatedData.avatar }),
                ...(validatedData.notes !== undefined && { notes: validatedData.notes }),
            },
            include: {
                projects: true,
            },
        })

        return NextResponse.json(client)
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            )
        }

        console.error('Error updating client:', error)
        return NextResponse.json(
            { error: 'Failed to update client' },
            { status: 500 }
        )
    }
}

/**
 * Handle DELETE /api/clients/[id] - Delete a client
 */
export async function handleDeleteClient(
    request: NextRequest,
    params: { id: string }
) {
    try {
        // Validate client ID
        const validatedId = clientIdSchema.parse({ id: params.id })

        // Get userId from query params
        const userId = request.nextUrl.searchParams.get('userId')
        if (!userId) {
            return NextResponse.json(
                { error: 'userId is required' },
                { status: 400 }
            )
        }

        // Check if client exists and belongs to user
        const existingClient = await prisma.client.findUnique({
            where: { id: validatedId.id },
        })

        if (!existingClient) {
            return NextResponse.json(
                { error: 'Client not found' },
                { status: 404 }
            )
        }

        if (existingClient.userId !== userId) {
            return NextResponse.json(
                { error: 'Forbidden: You do not have permission to delete this client' },
                { status: 403 }
            )
        }

        await prisma.client.delete({
            where: { id: validatedId.id },
        })

        return NextResponse.json({ message: 'Client deleted successfully' })
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            )
        }

        console.error('Error deleting client:', error)
        return NextResponse.json(
            { error: 'Failed to delete client' },
            { status: 500 }
        )
    }
}
