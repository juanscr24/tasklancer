import { NextRequest } from 'next/server'
import { handleGetUser, handleUpdateUser } from '../user.controller'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params
    return handleGetUser(request, resolvedParams)
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params
    return handleUpdateUser(request, resolvedParams)
}
