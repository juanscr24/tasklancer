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

    // leemos el query param ?verified=true
    const verified = searchParams.get("verified") === "true";

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setError(undefined);
            startTransition(async () => {
                const response = await loginAction(data);
                console.log(response);
                if (response.error) {
                    setError(response.error);
                } else {
                    router.push('/dashboard');
                }
            });
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <form
            className="flex flex-col items-center gap-6 md:gap-8 w-8/10 max-w-md"
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Mensaje de email verificado */}
            {verified && (
                <div className="p-3 text-sm text-green-600 bg-green-100 border border-green-200 rounded-md w-full mb-2">
                    {tAuth('emailVerifiedSuccessfully') /* o el key que uses */}
                </div>
            )}

            <Input
                id="email"
                type="email"
                label={t('email')}
                placeholder={t('emailPlaceholder')}
                register={register('email')}
                error={
                    errors.email?.message
                        ? tValidations(errors.email.message as any)
                        : undefined
                }
            />
            <Input
                id="password"
                type="password"
                label={t('password')}
                placeholder={t('passwordPlaceholder')}
                register={register('password')}
                error={
                    errors.password?.message
                        ? tValidations(errors.password.message as any)
                        : undefined
                }
            />

            {error && (
                <div className="p-3 text-sm text-red-500 bg-red-100 border border-red-200 rounded-md w-full">
                    {error}
                </div>
            )}

            <Button primary type="submit" disabled={isSubmitting || isPending}>
                {isSubmitting || isPending ? '...' : tAuth('signIn')}
            </Button>
        </form>
    )
}
