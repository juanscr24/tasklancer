'use client'

import { NextIntlClientProvider } from 'next-intl'
import { useClientLocale } from '@/contexts/LocaleContext'
import { ReactNode } from 'react'

interface DynamicIntlProviderProps {
    children: ReactNode
}

export function DynamicIntlProvider({ children }: DynamicIntlProviderProps) {
    const { currentLocale, messages } = useClientLocale()

    return (
        <NextIntlClientProvider messages={messages} locale={currentLocale}>
            {children}
        </NextIntlClientProvider>
    )
}
