import { z } from 'zod'

// Update Project Quotation Schema
export const updateProjectQuotationSchema = z.object({
    hourlyRate: z.number().positive('Hourly rate must be positive').optional(),
    estimatedHours: z.number().positive('Estimated hours must be positive').optional(),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional()
})

// Create Requirement Schema
export const createRequirementSchema = z.object({
    description: z.string().min(1, 'Description is required').max(500, 'Description is too long'),
    order: z.number().int().min(0).optional()
})

// Update Requirement Schema
export const updateRequirementSchema = z.object({
    description: z.string().min(1, 'Description is required').max(500, 'Description is too long').optional(),
    completed: z.boolean().optional(),
    order: z.number().int().min(0).optional()
})

// Requirement ID Schema
export const requirementIdSchema = z.object({
    id: z.string().min(1, 'Requirement ID is required')
})

// Types inferred from schemas
export type UpdateProjectQuotationInput = z.infer<typeof updateProjectQuotationSchema>
export type CreateRequirementInput = z.infer<typeof createRequirementSchema>
export type UpdateRequirementInput = z.infer<typeof updateRequirementSchema>
export type RequirementIdInput = z.infer<typeof requirementIdSchema>
