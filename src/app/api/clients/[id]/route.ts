import { handleUpdateClient, handleDeleteClient } from '../client.controller'

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    return handleUpdateClient(request as any, params)
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    return handleDeleteClient(request as any, params)
}
