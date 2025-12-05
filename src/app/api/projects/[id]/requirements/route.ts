import { handleGetRequirements, handleCreateRequirement } from '../../../requirements/requirement.controller'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params
    return handleGetRequirements(request as any, resolvedParams)
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params
    return handleCreateRequirement(request as any, resolvedParams)
}
