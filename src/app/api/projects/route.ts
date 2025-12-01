import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prismaClient'

// GET /api/projects - Fetch all projects for a user
export async function GET(request: NextRequest) {
    try {
        // TODO: Get userId from session/auth
        // For now, we'll get the first user or use a hardcoded ID
        const userId = request.nextUrl.searchParams.get('userId')

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            )
        }

        const projects = await prisma.project.findMany({
            where: {
                userId: userId
            },
            include: {
                tasks: true,
                client: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(projects)
    } catch (error) {
        console.error('Error fetching projects:', error)
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        )
    }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, description, icon, color, userId, clientId, status } = body

        if (!name || !userId) {
            return NextResponse.json(
                { error: 'Name and userId are required' },
                { status: 400 }
            )
        }

        const project = await prisma.project.create({
            data: {
                name,
                description: description || null,
                icon: icon || null,
                color: color || '#3B82F6',
                status: status || 'ACTIVE',
                userId,
                clientId: clientId || null
            },
            include: {
                tasks: true,
                client: true
            }
        })

        return NextResponse.json(project, { status: 201 })
    } catch (error) {
        console.error('Error creating project:', error)
        return NextResponse.json(
            { error: 'Failed to create project' },
            { status: 500 }
        )
    }
}
