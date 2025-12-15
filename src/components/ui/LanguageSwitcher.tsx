'use client'

import Image from 'next/image'
import { useTransition } from 'react'
import { LanguageSwitcherProps } from '@/types'
import { useLocaleStore } from '@/stores/localeStore'

export const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
    const { locale, setLocale } = useLocaleStore()
    const [isPending, startTransition] = useTransition()

    const toggleLanguage = () => {
        const newLocale = locale === 'es' ? 'en' : 'es'

        startTransition(() => {
            setLocale(newLocale)
        })
    }

    return (
        <button
            onClick={toggleLanguage}
            className={`flex items-center justify-center p-2 rounded-md hover:scale-103 h-12 w-12 transition-all duration-200 cursor-pointer ${className || ''}`}
            disabled={isPending}
        >
            <Image
                src={locale === 'es' ? '/flags/es.svg' : '/flags/en.svg'}
                alt={locale === 'es' ? 'Español' : 'English'}
                width={300}
                height={220}
                className={`rounded-sm transition-all duration-300 ${isPending ? 'opacity-60 scale-90' : 'opacity-100'
                    }`}
            />
        </button>
    )
}