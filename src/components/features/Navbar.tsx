'use client'

import { LanguageSwitcher } from "../ui/LanguageSwitcher"
import { ButtonMode } from "../ui/ButtonMode"
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTheme } from "@/utils/ThemeProvider";

const Navbar = () => {
    const t = useTranslations('navbar');
    const { theme } = useTheme()

    return (
        <header className="w-full sticky top-0 z-50 bg-(--bg-1) border-b border-(--text-2)/10 transition-colors duration-300">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-9">
                <div className="flex items-center justify-between h-20">

                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="h-12  flex items-center pt-2">
                            <Image
                                src={theme === 'dark' ? '/logo/logo_dm.png' : '/logo/logo_lm.png'}
                                alt="Logo"
                                width={200}
                                height={200}
                                loading="eager"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">

                        <nav className="hidden md:flex gap-6">
                            <div className="flex items-center gap-3">
                                <ButtonMode />
                                <LanguageSwitcher className="relative" />
                            </div>
                        </nav>

                        {/* Separador vertical */}
                        <div className="hidden md:block h-6 w-px bg-(--text-2)/20"></div>

                        <Link
                            href="/contact"
                            className="text-sm font-medium text-(--text-2) hover:text-(--text-1) transition-colors"
                        >
                            Contact
                        </Link>

                        <Link
                            href="/services"
                            className="text-sm font-medium text-(--text-2) hover:text-(--text-1) transition-colors"
                        >
                            Services
                        </Link>
                        <Link
                            href="/auth"
                            className="px-6 py-2.5 rounded-lg bg-(--btn-1) text-white font-semibold text-sm shadow-sm hover:opacity-90 transition-all active:scale-95"
                        >
                            Start Now
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
