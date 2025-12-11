import { NextRequest, NextResponse } from 'next/server'
import { db as prisma } from '@/lib/db'
import { updateUserSchema, userIdSchema } from '@/validations/user.validation'
import { ZodError } from 'zod'

/**
 * User Controller
 * Handles business logic for user API routes
 */

/**
 * Handle GET /api/users/[id] - Fetch user profile by ID
 */
export async function handleGetUser(
    request: NextRequest,
    params: { id: string }
) {
    try {
        // Validate user ID
        const validatedId = userIdSchema.parse({ id: params.id })

        const user = await prisma.user.findUnique({
            where: { id: validatedId.id },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                phone: true,
                bio: true,
                location: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(user)
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            )
        }

        console.error('Error fetching user:', error)
        return NextResponse.json(
            { error: 'Failed to fetch user' },
            { status: 500 }
        )
    }
}

/**
 * Handle PUT /api/users/[id] - Update user profile
 */
export async function handleUpdateUser(
    request: NextRequest,
    params: { id: string }
) {
    try {
        // Validate user ID
        const validatedId = userIdSchema.parse({ id: params.id })

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { id: validatedId.id },
        })

        if (!existingUser) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        const body = await request.json()

        // Validate request body
        const validatedData = updateUserSchema.parse(body)

        const user = await prisma.user.update({
            where: { id: validatedId.id },
            data: {
                ...(validatedData.name !== undefined && { name: validatedData.name }),
                ...(validatedData.phone !== undefined && { phone: validatedData.phone }),
                ...(validatedData.bio !== undefined && { bio: validatedData.bio }),
                ...(validatedData.location !== undefined && { location: validatedData.location }),
                ...(validatedData.image !== undefined && { image: validatedData.image }),
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
                phone: true,
                bio: true,
                location: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: 'Validation error', details: error.issues },
                { status: 400 }
            )
        }

        console.error('Error updating user:', error)
        return NextResponse.json(
            { error: 'Failed to update user' },
            { status: 500 }
        )
    }
}
