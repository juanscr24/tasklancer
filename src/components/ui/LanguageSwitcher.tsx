'use client'

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Languages } from 'lucide-react';
import { useState, useTransition } from 'react';

export const LanguageSwitcher = ({ className }: { className?: string }) => {
    const t = useTranslations('language');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);

    const handleLanguageChange = (newLocale: 'es' | 'en') => {
        startTransition(() => {
            router.replace(pathname, { locale: newLocale });
            setIsOpen(false);
        });
    };

    return (
        <div className={className}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-(--bg-2) text-(--text-1) hover:bg-(--bg-3) transition-colors duration-200"
                disabled={isPending}
            >
                <Languages className="w-5 h-5" />
                <span className="font-medium">
                    {locale === 'es' ? t('spanish') : t('english')}
                </span>
            </button>

            {isOpen && (
                <div className="absolute top-full mt-2 right-0 bg-(--bg-2) rounded-lg shadow-lg overflow-hidden z-50 min-w-[150px]">
                    <button
                        onClick={() => handleLanguageChange('es')}
                        className={`w-full px-4 py-3 text-left hover:bg-(--bg-3) transition-colors duration-200 ${locale === 'es' ? 'bg-(--btn-1) text-white' : 'text-(--text-1)'
                            }`}
                    >
                        🇪🇸 {t('spanish')}
                    </button>
                    <button
                        onClick={() => handleLanguageChange('en')}
                        className={`w-full px-4 py-3 text-left hover:bg-(--bg-3) transition-colors duration-200 ${locale === 'en' ? 'bg-(--btn-1) text-white' : 'text-(--text-1)'
                            }`}
                    >
                        🇬🇧 {t('english')}
                    </button>
                </div>
            )}
        </div>
    );
};
