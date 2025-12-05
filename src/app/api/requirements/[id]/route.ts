import { handleUpdateRequirement, handleDeleteRequirement } from '../requirement.controller'

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params
    return handleUpdateRequirement(request as any, resolvedParams)
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params
    return handleDeleteRequirement(request as any, resolvedParams)
}
