'use client'

import { ReactNode, useEffect, useState } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { useLocaleStore } from '@/stores/localeStore'

interface LocaleProviderProps {
    children: ReactNode
}

export function LocaleProvider({ children }: LocaleProviderProps) {
    const { locale, messages } = useLocaleStore()
    const [mounted, setMounted] = useState(false)

    // Evitar hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        // Renderizar con valores por defecto en el servidor
        return (
            <NextIntlClientProvider messages={messages} locale={locale}>
                {children}
            </NextIntlClientProvider>
        )
    }

    return (
        <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
        </NextIntlClientProvider>
    )
}
