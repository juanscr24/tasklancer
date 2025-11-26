'use client'

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type Locale = 'es' | 'en'

interface LocaleContextType {
    currentLocale: Locale
    setLocale: (locale: Locale) => void
    messages: Record<string, any>
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

interface LocaleProviderProps {
    children: ReactNode
    initialLocale: Locale
    initialMessages: Record<string, any>
}

export function LocaleProvider({ children, initialLocale, initialMessages }: LocaleProviderProps) {
    const [currentLocale, setCurrentLocale] = useState<Locale>(initialLocale)
    const [messages, setMessages] = useState<Record<string, any>>(initialMessages)

    const setLocale = async (newLocale: Locale) => {
        if (newLocale === currentLocale) return

        try {
            // Cargar los mensajes del nuevo idioma dinámicamente
            const newMessages = await import(`@/i18n/messages/${newLocale}/index.ts`)
            setMessages(newMessages.default)
            setCurrentLocale(newLocale)

            // Guardar la preferencia en localStorage
            localStorage.setItem('preferred-locale', newLocale)
        } catch (error) {
            console.error('Error loading locale messages:', error)
        }
    }

    // Cargar la preferencia guardada al montar
    useEffect(() => {
        const savedLocale = localStorage.getItem('preferred-locale') as Locale | null
        if (savedLocale && savedLocale !== currentLocale && (savedLocale === 'es' || savedLocale === 'en')) {
            setLocale(savedLocale)
        }
    }, [])

    return (
        <LocaleContext.Provider value={{ currentLocale, setLocale, messages }}>
            {children}
        </LocaleContext.Provider>
    )
}

export function useClientLocale() {
    const context = useContext(LocaleContext)
    if (context === undefined) {
        throw new Error('useClientLocale must be used within a LocaleProvider')
    }
    return context
}
