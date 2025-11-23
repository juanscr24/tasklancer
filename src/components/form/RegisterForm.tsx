'use client'

import { Button, Input } from "@components"
import { useTranslations } from "next-intl"

export const RegisterForm = () => {
    const t = useTranslations('form');
    const tAuth = useTranslations('auth');

    return (
        <>
            <Input
                id="name"
                type="text"
                label={t('fullName')}
                placeholder={t('fullNamePlaceholder')}
            />
            <Input
                id="email"
                type="email"
                label={t('email')}
                placeholder={t('emailPlaceholder')}
            />
            <Input
                id="password"
                type="password"
                label={t('password')}
                placeholder={t('passwordPlaceholder')}
            />
            <Input
                id="confirm-password"
                type="password"
                label={t('confirmPassword')}
                placeholder={t('passwordPlaceholder')}
            />
            <Button type="submit">{tAuth('register')}</Button>
        </>
    )
}
