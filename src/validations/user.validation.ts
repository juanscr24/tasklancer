import { z } from 'zod'

// Update User Profile Schema
export const updateUserSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name is too long').optional(),
    phone: z.string().max(20, 'Phone is too long').nullable().optional(),
    bio: z.string().max(1000, 'Bio is too long').nullable().optional(),
    location: z.string().max(100, 'Location is too long').nullable().optional(),
    image: z.string().nullable().optional(),
})

// User ID Schema
export const userIdSchema = z.object({
    id: z.string().min(1, 'User ID is required')
})

// Types inferred from schemas
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type UserIdInput = z.infer<typeof userIdSchema>
