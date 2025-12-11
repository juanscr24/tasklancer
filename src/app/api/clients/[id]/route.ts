import { handleUpdateClient, handleDeleteClient } from '../client.controller'

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params
    return handleUpdateClient(request as any, resolvedParams)
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params
    return handleDeleteClient(request as any, resolvedParams)
}
