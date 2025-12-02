import { useState, useCallback } from 'react'
import { Task } from '@/types/features/project'
import { taskService } from '@/services'
import { CreateTaskInput, UpdateTaskInput } from '@/validations'

/**
 * Custom hook for managing tasks
 * Provides state management and CRUD operations for tasks
 */
export function useTasks(userId: string | null) {
    const [tasks, setTasks] = useState<Task[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    /**
     * Fetch all tasks for the user, optionally filtered by project
     */
    const fetchTasks = useCallback(async (projectId?: string) => {
        if (!userId) {
            setError('User ID is required')
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const data = await taskService.getTasks(userId, projectId)
            setTasks(data)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch tasks'
            setError(errorMessage)
            console.error('Error fetching tasks:', err)
        } finally {
            setIsLoading(false)
        }
    }, [userId])

    /**
     * Fetch a single task by ID
     */
    const fetchTaskById = useCallback(async (taskId: string) => {
        if (!userId) {
            setError('User ID is required')
            return null
        }

        setIsLoading(true)
        setError(null)

        try {
            const data = await taskService.getTaskById(taskId, userId)
            return data
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch task'
            setError(errorMessage)
            console.error('Error fetching task:', err)
            return null
        } finally {
            setIsLoading(false)
        }
    }, [userId])

    /**
     * Create a new task
     */
    const createTask = useCallback(async (data: CreateTaskInput) => {
        setIsLoading(true)
        setError(null)

        try {
            const newTask = await taskService.createTask(data)
            setTasks((prev) => [...prev, newTask])
            return newTask
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create task'
            setError(errorMessage)
            console.error('Error creating task:', err)
            return null
        } finally {
            setIsLoading(false)
        }
    }, [])

    /**
     * Update an existing task
     */
    const updateTask = useCallback(async (taskId: string, data: UpdateTaskInput) => {
        setIsLoading(true)
        setError(null)

        try {
            const updatedTask = await taskService.updateTask(taskId, data)
            setTasks((prev) =>
                prev.map((task) => (task.id === taskId ? updatedTask : task))
            )
            return updatedTask
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update task'
            setError(errorMessage)
            console.error('Error updating task:', err)
            return null
        } finally {
            setIsLoading(false)
        }
    }, [])

    /**
     * Delete a task
     */
    const deleteTask = useCallback(async (taskId: string) => {
        setIsLoading(true)
        setError(null)

        try {
            await taskService.deleteTask(taskId)
            setTasks((prev) => prev.filter((task) => task.id !== taskId))
            return true
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete task'
            setError(errorMessage)
            console.error('Error deleting task:', err)
            return false
        } finally {
            setIsLoading(false)
        }
    }, [])

    /**
     * Get tasks for a specific project
     */
    const getProjectTasks = useCallback((projectId: string) => {
        return tasks.filter((task) => task.projectId === projectId)
    }, [tasks])

    return {
        tasks,
        isLoading,
        error,
        fetchTasks,
        fetchTaskById,
        createTask,
        updateTask,
        deleteTask,
        getProjectTasks,
    }
}
