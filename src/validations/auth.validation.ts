import { z } from 'zod';

// Login Schema
export const loginSchema = z.object({
    email: z
        .string()
        .min(1, 'emailRequired')
        .email('emailInvalid'),
    password: z
        .string()
        .min(1, 'passwordRequired')
        .min(6, 'passwordMin'),
});

// Register Schema
export const registerSchema = z.object({
    name: z
        .string()
        .min(1, 'nameRequired')
        .min(2, 'nameMin')
        .max(100, 'nameMax'),
    email: z
        .string()
        .min(1, 'emailRequired')
        .email('emailInvalid'),
    password: z
        .string()
        .min(1, 'passwordRequired')
        .min(6, 'passwordMin')
        .max(100, 'passwordMax'),
    confirmPassword: z
        .string()
        .min(1, 'confirmPasswordRequired'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'passwordsDoNotMatch',
    path: ['confirmPassword'],
});

// Types
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
