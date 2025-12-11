import { z } from 'zod'

// Enums
export const ProjectStatusEnum = z.enum(['ACTIVE', 'COMPLETED', 'ON_HOLD', 'CANCELLED'])
export const ProjectPriorityEnum = z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT'])

// Create Project Schema
export const createProjectSchema = z.object({
    name: z.string().min(1, 'Project name is required').max(100, 'Project name is too long'),
    description: z.string().max(500, 'Description is too long').nullable().optional(),
    icon: z.string().nullable().optional(),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format').default('#3B82F6'),
    status: ProjectStatusEnum.default('ACTIVE'),
    userId: z.string().min(1, 'User ID is required'),
    clientId: z.string().nullable().optional()
})

// Update Project Schema
export const updateProjectSchema = z.object({
    name: z.string().min(1, 'Project name is required').max(100, 'Project name is too long').optional(),
    description: z.string().max(500, 'Description is too long').nullable().optional(),
    icon: z.string().nullable().optional(),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format').optional(),
    status: ProjectStatusEnum.optional(),
    clientId: z.string().nullable().optional(),
    hourlyRate: z.number().positive('Hourly rate must be positive').optional(),
    estimatedHours: z.number().positive('Estimated hours must be positive').optional(),
    priority: ProjectPriorityEnum.optional()
})

// Project ID Schema
export const projectIdSchema = z.object({
    id: z.string().min(1, 'Project ID is required')
})

// Project Query Schema
export const projectQuerySchema = z.object({
    userId: z.string().min(1, 'User ID is required')
})

// Types inferred from schemas
export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>
export type ProjectIdInput = z.infer<typeof projectIdSchema>
export type ProjectQueryInput = z.infer<typeof projectQuerySchema>
