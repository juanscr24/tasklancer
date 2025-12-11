'use client'

import { Button, Input } from "@components"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, RegisterFormData } from "@/validations"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { registerAction } from "@/actions/auth-action"

export const RegisterForm = () => {
    const t = useTranslations('form');
    const tAuth = useTranslations('auth');
    const tValidations = useTranslations('validations');
    const [error, setError] = useState<string | undefined>(undefined);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            setError(undefined); // Reset previous error
            // Perform register action
            startTransition(async () => {
                const response = await registerAction(data)
                console.log(response);
                if (response.error) {
                    setError(response.error)
                } else {
                    // Handle successful registration, e.g., redirect or update UI
                    router.push('/dashboard'); // Redirect to dashboard after registration
                }
            });
        } catch (error) {
            console.error('Register error:', error);
        }
    };

    return (
        <form
            className="flex flex-col items-center gap-6 md:gap-8 w-8/10 max-w-md"
            onSubmit={handleSubmit(onSubmit)}>
            <Input
                id="name"
                type="text"
                label={t('fullName')}
                placeholder={t('fullNamePlaceholder')}
                register={register('name')}
                error={errors.name?.message ? tValidations(errors.name.message as any) : undefined}
            />
            <Input
                id="email"
                type="email"
                label={t('email')}
                placeholder={t('emailPlaceholder')}
                register={register('email')}
                error={errors.email?.message ? tValidations(errors.email.message as any) : undefined}
            />
            <Input
                id="password"
                type="password"
                label={t('password')}
                placeholder={t('passwordPlaceholder')}
                register={register('password')}
                error={errors.password?.message ? tValidations(errors.password.message as any) : undefined}
            />
            <Input
                id="confirm-password"
                type="password"
                label={t('confirmPassword')}
                placeholder={t('passwordPlaceholder')}
                register={register('confirmPassword')}
                error={errors.confirmPassword?.message ? tValidations(errors.confirmPassword.message as any) : undefined}
            />

            {error && (
                <div className="p-3 text-sm text-red-500 bg-red-100 border border-red-200 rounded-md w-full">
                    {error}
                </div>
            )}

            <Button primary type="submit" disabled={isSubmitting}>
                {isSubmitting ? '...' : tAuth('register')}
            </Button>
        </form>
    )
}
