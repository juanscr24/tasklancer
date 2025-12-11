import { NextRequest } from 'next/server'
import { handleGetTasks, handleCreateTask } from './task.controller'

/**
 * GET /api/tasks - Fetch tasks (optionally filtered by projectId)
 */
export async function GET(request: NextRequest) {
    return handleGetTasks(request)
}

/**
 * POST /api/tasks - Create a new task
 */
export async function POST(request: NextRequest) {
    return handleCreateTask(request)
}

