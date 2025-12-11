'use client'

import { Button, Input } from "@components"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginFormData } from "@/validations"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { loginAction } from "@/actions/auth-action"

export const LoginForm = () => {
    const t = useTranslations('form');
    const tAuth = useTranslations('auth');
    const tValidations = useTranslations('validations');
    const [error, setError] = useState<string | undefined>(undefined);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const searchParams = useSearchParams();
    const verified = searchParams.get("verified");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setError(undefined); // Reset previous error
            // Perform login action
            startTransition(async () => {
                const response = await loginAction(data)
                console.log(response);
                if (response.error) {
                    setError(response.error)
                } else {
                    // Handle successful login, e.g., redirect or update UI
                    router.push('/dashboard'); // Redirect to dashboard after login
                }
            });
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <form className="flex flex-col items-center gap-8 w-1/2" onSubmit={handleSubmit(onSubmit)}>
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

            {error && (
                <div className="p-3 text-sm text-red-500 bg-red-100 border border-red-200 rounded-md">
                    {error}
                </div>
            )}

            <Button primary type="submit" disabled={isSubmitting}>
                {isSubmitting ? '...' : tAuth('signIn')}
            </Button>
        </form>
    )
}
