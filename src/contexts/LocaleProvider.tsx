'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import esMessages from '@/i18n/messages/es'
import enMessages from '@/i18n/messages/en'

type Locale = 'es' | 'en'

const messagesMap = {
    es: esMessages,
    en: enMessages
}

interface LocaleContextType {
    locale: Locale
    setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextType>({
    locale: 'es',
    setLocale: () => { }
})

interface LocaleProviderProps {
    children: ReactNode
}

export function LocaleProvider({ children }: LocaleProviderProps) {
    const [locale, setLocaleState] = useState<Locale>('es')
    const [messages, setMessages] = useState<Record<string, any>>(esMessages)

    // Cargar idioma guardado al montar
    useEffect(() => {
        const savedLocale = localStorage.getItem('locale') as Locale | null
        if (savedLocale && (savedLocale === 'es' || savedLocale === 'en')) {
            setLocaleState(savedLocale)
            setMessages(messagesMap[savedLocale])
        }
    }, [])

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale)
        setMessages(messagesMap[newLocale])
        localStorage.setItem('locale', newLocale)
    }

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            <NextIntlClientProvider messages={messages} locale={locale}>
                {children}
            </NextIntlClientProvider>
        </LocaleContext.Provider>
    )
}

export function useClientLocale() {
    const context = useContext(LocaleContext)
    if (!context) {
        throw new Error('useClientLocale must be used within LocaleProvider')
    }
    return context
}
