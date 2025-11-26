import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import esMessages from '@/i18n/messages/es'
import enMessages from '@/i18n/messages/en'

export type Locale = 'es' | 'en'

const messagesMap = {
    es: esMessages,
    en: enMessages
}

interface LocaleState {
    locale: Locale
    messages: Record<string, any>
    setLocale: (locale: Locale) => void
}

export const useLocaleStore = create<LocaleState>()(
    persist(
        (set) => ({
            locale: 'es',
            messages: esMessages,
            setLocale: (locale: Locale) =>
                set({
                    locale,
                    messages: messagesMap[locale]
                })
        }),
        {
            name: 'locale-storage',
            partialize: (state) => ({ locale: state.locale })
        }
    )
)
