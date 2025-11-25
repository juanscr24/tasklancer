'use client'

import { LanguageSwitcher } from "../ui/LanguageSwitcher"
import { ButtonMode } from "../ui/ButtonMode"
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTheme } from "@/utils/ThemeProvider";
import { useEffect, useState } from "react";

const Navbar = () => {
    const t = useTranslations('navbar');
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    return (
        // Quité el padding del nav, el contenedor de adentro se encarga del ancho
        <nav className="w-full bg-(--bg-1) border-b border-(--text-2)/10 transition-colors duration-300">
            {/* CORRECCIÓN CLAVE: Usamos max-w-7xl y px-8 para que coincida EXACTAMENTE con TextsSection */}
            <div className="max-w-8/10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Link href="/" className="h-12 flex items-center pt-2">
                            {mounted && (
                                <Image
                                    src={theme === 'dark' ? '/logo/logo_dm.png' : '/logo/logo_lm.png'}
                                    alt="Logo"
                                    width={180} // Ajusté un poco para que no se vea tan masivo
                                    height={50}
                                    priority
                                    className="object-contain h-40 w-auto"
                                />
                            )}
                        </Link>
                    </div>

                    {/* Navegación */}
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex gap-6 items-center">
                            <div className="flex items-center gap-3">
                                <ButtonMode />
                                <LanguageSwitcher className="relative" />
                            </div>

                            {/* Separador */}
                            <div className="h-6 w-px bg-(--text-2)/20"></div>

                            <Link
                                href="/contact"
                                className="text-sm font-medium text-(--text-2) hover:text-(--text-1) transition-colors">
                                Contact
                            </Link>
                            <Link
                                href="/services"
                                className="text-sm font-medium text-(--text-2) hover:text-(--text-1) transition-colors">
                                Services
                            </Link>
                        </div>

                        <Link
                            href="/auth"
                            className="px-6 py-2.5 rounded-lg bg-(--btn-1) text-white font-semibold text-sm shadow-sm hover:opacity-90 transition-all active:scale-95">
                            Start Now
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
