import { handleGetClients, handleCreateClient } from './client.controller'

export async function GET(request: Request) {
    return handleGetClients(request as any)
}

export async function POST(request: Request) {
    return handleCreateClient(request as any)
}
