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
            className={`flex items-center justify-center p-2 rounded-md hover:scale-103 transition-all duration-200 cursor-pointer ${className || ''}`}
            disabled={isPending}
        >
            <Image
                src={locale === 'es' ? '/flags/es.svg' : '/flags/en.svg'}
                alt={locale === 'es' ? 'Español' : 'English'}
                width={30}
                height={22}
                className={`rounded-sm transition-all duration-300 ${isPending ? 'opacity-60 scale-90' : 'opacity-100'
                    }`}
            />
        </button>
    )
}

// import { Languages } from 'lucide-react';
// import { useState, useTransition } from 'react';
// import { LanguageSwitcherProps } from '@/types';
// import { useLocale, useTranslations } from 'next-intl';
// import { useRouter, usePathname } from '@/i18n/routing';

// export const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
//     const t = useTranslations('language');
//     const locale = useLocale();
//     const router = useRouter();
//     const pathname = usePathname();
//     const [isPending, startTransition] = useTransition();
//     const [isOpen, setIsOpen] = useState(false);

//     const handleLanguageChange = (newLocale: 'es' | 'en') => {
//         startTransition(() => {
//             router.replace(pathname, { locale: newLocale });
//             setIsOpen(false);
//         });
//     };

//     return (
//         <div className={className}>
//             <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="flex items-center gap-2 px-4 py-2 rounded-lg text-(--text-1) hover:scale-103 transition-all duration-200 cursor-pointer"
//                 disabled={isPending}
//             >
//                 <Languages className="w-5 h-5" />
//                 <span className="font-medium">
//                     {locale === 'es' ? t('spanish') : t('english')}
//                 </span>
//             </button>

//             {isOpen && (
//                 <div className="absolute top-full bg-(--bg-1) mt-2 right-0 rounded-lg shadow-lg overflow-hidden z-50 min-w-[150px]">
//                     <button
//                         onClick={() => handleLanguageChange('es')}
//                         className={`w-full px-4 py-3 text-left hover:bg-(--btn-1) transition-colors duration-200 cursor-pointer hover:text-white ${locale === 'es' ? 'bg-(--btn-1) text-white' : 'text-(--text-1)'
//                             }`}
//                     >
//                         🇪🇸 {t('spanish')}
//                     </button>
//                     <button
//                         onClick={() => handleLanguageChange('en')}
//                         className={`w-full px-4 py-3 text-left hover:bg-(--btn-1) transition-colors duration-200 cursor-pointer hover:text-white ${locale === 'en' ? 'bg-(--btn-1) text-white' : 'text-(--text-1)'
//                             }`}
//                     >
//                         🇬🇧 {t('english')}
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// };
