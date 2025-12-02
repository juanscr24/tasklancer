import { NextRequest } from 'next/server'
import { handleGetProjects, handleCreateProject } from './project.controller'

/**
 * GET /api/projects - Fetch all projects for a user
 */
export async function GET(request: NextRequest) {
    return handleGetProjects(request)
}

/**
 * POST /api/projects - Create a new project
 */
export async function POST(request: NextRequest) {
    return handleCreateProject(request)
}

