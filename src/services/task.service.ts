import { Task } from '@/types/features/project'
import { CreateTaskInput, UpdateTaskInput } from '@/validations'

/**
 * Task Service
 * Handles all API calls related to tasks
 */

const API_BASE_URL = '/api/tasks'

/**
 * Fetch all tasks for a user, optionally filtered by project
 */
export async function getTasks(userId: string, projectId?: string): Promise<Task[]> {
    const params = new URLSearchParams({ userId })
    if (projectId) {
        params.append('projectId', projectId)
    }

    const response = await fetch(`${API_BASE_URL}?${params.toString()}`)

    if (!response.ok) {
        const error = await response.json()
        console.error('Task fetch error:', error)
        throw new Error(error.error || 'Failed to fetch tasks')
    }

    return response.json()
}

/**
 * Fetch a single task by ID
 */
export async function getTaskById(taskId: string, userId: string): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/${taskId}?userId=${userId}`)

    if (!response.ok) {
        const error = await response.json()
        console.error('Task fetch error:', error)
        throw new Error(error.error || 'Failed to fetch task')
    }

    return response.json()
}

/**
 * Create a new task
 */
export async function createTask(data: CreateTaskInput): Promise<Task> {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json()
        console.error('Task creation error:', error)
        if (error.details) {
            console.error('Validation details:', error.details)
        }
        throw new Error(error.error || 'Failed to create task')
    }

    return response.json()
}

/**
 * Update an existing task
 */
export async function updateTask(
    taskId: string,
    data: UpdateTaskInput
): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        const error = await response.json()
        console.error('Task update error:', error)
        if (error.details) {
            console.error('Validation details:', error.details)
        }
        throw new Error(error.error || 'Failed to update task')
    }

    return response.json()
}

/**
 * Delete a task
 */
export async function deleteTask(taskId: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/${taskId}`, {
        method: 'DELETE',
    })

    if (!response.ok) {
        const error = await response.json()
        console.error('Task deletion error:', error)
        throw new Error(error.error || 'Failed to delete task')
    }

    return response.json()
}
