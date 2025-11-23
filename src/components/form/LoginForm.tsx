'use client'

import { Button, Input } from "@components"
import { useTranslations } from "next-intl"

export const LoginForm = () => {
    const t = useTranslations('form');
    const tAuth = useTranslations('auth');

    return (
        <>
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
            <Button type="submit">{tAuth('signIn')}</Button>
        </>
    )
}
