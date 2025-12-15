'use client'
import { motion } from "motion/react";
import { LanguageSwitcher } from "../ui/LanguageSwitcher"
import { ButtonMode } from "../ui/ButtonMode"
import { useTranslations } from "next-intl";
import Image from "next/image";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useThemeStore } from "@/stores/themeStore";

import {
    img_logo_icon,
    img_logo_icon_text_dark,
    img_logo_icon_text
} from "../../../public/images/logos";
import { MenuOption } from "./MenuOption";

const Navbar = () => {
    const t = useTranslations('navbar');
    const { theme } = useThemeStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (window.location.pathname === '/' || window.location.pathname === '/en' || window.location.pathname === '/es') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (window.location.pathname === '/' || window.location.pathname === '/en' || window.location.pathname === '/es') {
            e.preventDefault();
            const element = document.getElementById('contact');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.location.href = '/#contact';
            }
        }
    };


    const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (window.location.pathname === '/' || window.location.pathname === '/en' || window.location.pathname === '/es') {
            e.preventDefault();
            const element = document.getElementById('services');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.location.href = '/#services';
            }
        }
    };

    return (
        <nav className="w-full bg-(--bg-1) border-b border-(--text-2)/10 transition-colors duration-300">
            <div className="max-w-8/10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <div className="flex-0 flex items-center">
                        <Link href="/" onClick={scrollToTop} className="flex items-center gap-0 ">
                            {mounted && (
                                <div className="flex items-center relative h-60 w-60 -ml-11">

                                    <motion.div
                                        className="relative w-full h-full z-10" // z-10 para que esté por encima del texto si se cruzan
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: [0, 0.71, 0.2, 1.01], // Curva personalizada para un rebote sutil pero elegante
                                            scale: {
                                                type: "spring",
                                                damping: 10,
                                                stiffness: 100,
                                            }
                                        }}
                                    >
                                        <Image
                                            src={img_logo_icon}
                                            alt="Tasklancer Icon"
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </motion.div>

                                    <motion.div
                                        className="absolute inset-0 z-0"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.2,
                                            ease: "easeOut"
                                        }}
                                    >
                                        <Image
                                            src={theme === 'dark' ? img_logo_icon_text : img_logo_icon_text_dark}
                                            alt="Tasklancer Text"
                                            fill
                                            className="object-contain object-left ml-2"
                                            priority
                                        />
                                    </motion.div>
                                </div>
                            )}
                        </Link>
                    </div>

                    {/* Navegación */}
                    <div className="flex items-center gap-6 max-md:gap-0">
                        <div className="md:hidden">
                        <MenuOption />
                        </div>
                        <div className="flex gap-6 max-lg:gap-4 items-center">
                            <div className="max-md:hidden flex gap-4 items-center text-(--text-2)">
                                <LanguageSwitcher />
                                <ButtonMode />
                            </div>

                            {/* Separador */}
                            <div className="h-6 w-px bg-(--text-2)/20 max-md:hidden"></div>
                            <div className="hidden md:flex gap-6 items-center">
                                <Link
                                    href="/#contact"
                                    onClick={scrollToContact}
                                    className="text-sm font-medium text-(--text-2) hover:text-(--text-1) transition-colors">
                                    Contact
                                </Link>

                                {/* Link de Services actualizado con scroll suave */}
                                <Link
                                    href="/#services" // Apunta al ID
                                    onClick={scrollToServices} // Ejecuta la función
                                    className="text-sm font-medium text-(--text-2) hover:text-(--text-1) transition-colors">
                                    Services
                                </Link>
                            </div>
                        </div>

                        <Link
                            href="/auth"
                            className="max-md:hidden px-6 py-2.5 rounded-lg bg-(--btn-1) text-white font-semibold text-sm shadow-sm hover:opacity-90 transition-all active:scale-95">
                            Start Now
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
