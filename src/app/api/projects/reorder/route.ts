import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

/**
 * POST /api/projects/reorder
 * Update the order of projects
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { userId, projectIds } = body

        if (!userId || !Array.isArray(projectIds)) {
            return NextResponse.json(
                { error: 'Missing required fields: userId and projectIds array' },
                { status: 400 }
            )
        }

        // Update each project's order in a transaction
        await db.$transaction(
            projectIds.map((projectId, index) =>
                db.project.update({
                    where: {
                        id: projectId,
                        userId: userId // Ensure user owns the project
                    },
                    data: {
                        order: index
                    }
                })
            )
        )

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error updating project order:', error)
        return NextResponse.json(
            { error: 'Failed to update project order' },
            { status: 500 }
        )
    }
}
