import { z } from 'zod'

// Create Client Schema
export const createClientSchema = z.object({
    name: z.string().min(1, 'Client name is required').max(100, 'Client name is too long'),
    email: z.string().email('Invalid email format'),
    phone: z.string().min(1, 'Phone is required'),
    role: z.string().max(100, 'Role is too long').nullable().optional(),
    company: z.string().max(100, 'Company name is too long').nullable().optional(),
    address: z.string().max(200, 'Address is too long').nullable().optional(),
    avatar: z.string().nullable().optional(),
    notes: z.string().max(1000, 'Notes are too long').nullable().optional(),
    userId: z.string().min(1, 'User ID is required')
})

// Update Client Schema
export const updateClientSchema = z.object({
    name: z.string().min(1, 'Client name is required').max(100, 'Client name is too long').optional(),
    email: z.string().email('Invalid email format').optional(),
    phone: z.string().min(1, 'Phone is required').optional(),
    role: z.string().max(100, 'Role is too long').nullable().optional(),
    company: z.string().max(100, 'Company name is too long').nullable().optional(),
    address: z.string().max(200, 'Address is too long').nullable().optional(),
    avatar: z.string().nullable().optional(),
    notes: z.string().max(1000, 'Notes are too long').nullable().optional()
})

// Client ID Schema
export const clientIdSchema = z.object({
    id: z.string().min(1, 'Client ID is required')
})

// Client Query Schema
export const clientQuerySchema = z.object({
    userId: z.string().min(1, 'User ID is required')
})

// Types inferred from schemas
export type CreateClientInput = z.infer<typeof createClientSchema>
export type UpdateClientInput = z.infer<typeof updateClientSchema>
export type ClientIdInput = z.infer<typeof clientIdSchema>
export type ClientQueryInput = z.infer<typeof clientQuerySchema>
