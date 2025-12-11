import { z } from 'zod'

// Enums
export const TaskStatusEnum = z.enum(['TODO', 'IN_PROGRESS', 'DONE'])
export const TaskPriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH'])

// Helper to transform empty strings to null
const nullableString = z.union([
    z.string().min(1),
    z.literal(''),
    z.null(),
    z.undefined()
]).transform(val => val === '' ? null : val)

// Create Task Schema
export const createTaskSchema = z.object({
    title: z.string().min(1, 'Task title is required').max(200, 'Task title is too long'),
    description: nullableString.optional(),
    status: TaskStatusEnum.default('TODO'),
    priority: TaskPriorityEnum.default('MEDIUM'),
    projectId: z.string().min(1, 'Project ID is required'),
    dueDate: nullableString.optional()
})

// Update Task Schema
export const updateTaskSchema = z.object({
    title: z.string().min(1, 'Task title is required').max(200, 'Task title is too long').optional(),
    description: nullableString.optional(),
    status: TaskStatusEnum.optional(),
    priority: TaskPriorityEnum.optional(),
    dueDate: nullableString.optional()
})

// Task ID Schema
export const taskIdSchema = z.object({
    id: z.string().min(1, 'Task ID is required')
})

// Task Query Schema
export const taskQuerySchema = z.object({
    userId: z.string().min(1, 'User ID is required'),
    projectId: z.union([z.string(), z.null(), z.undefined()]).optional().transform(val => val === null ? undefined : val)
})

// Types inferred from schemas
export type CreateTaskInput = z.infer<typeof createTaskSchema>
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>
export type TaskIdInput = z.infer<typeof taskIdSchema>
export type TaskQueryInput = z.infer<typeof taskQuerySchema>
