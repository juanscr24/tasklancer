import { NextResponse } from 'next/server'
import { db as prisma } from '@/lib/db'

// GET /api/users/first - Get the first user (for testing purposes)
export async function GET() {
    try {
        const user = await prisma.user.findFirst({
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'No users found. Please run the seed script.' },
                { status: 404 }
            )
        }

        return NextResponse.json(user)
    } catch (error) {
        console.error('Error fetching user:', error)
        return NextResponse.json(
            { error: 'Failed to fetch user' },
            { status: 500 }
        )
    }
}
