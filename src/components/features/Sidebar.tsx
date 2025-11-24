'use client'

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { FaUser } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { useTranslations } from "next-intl";
import { IoMdSettings } from "react-icons/io";
import { usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { useTheme } from "@/utils/ThemeProvider";
import { navItems } from "@/constants/sidebar_item";
import { ButtonMode, LanguageSwitcher, Modal } from "@components";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isPending] = useTransition()
    const { theme } = useTheme()
    const pathname = usePathname()

    const t = useTranslations('sidebar')

    return (
        <>
            <aside className="bg-(--bg-1) fixed top-0 left-0 z-50 w-60 h-screen flex flex-col py-6 px-4 border-r-2 border-(--bg-2)">
                {/* Logo */}
                <div className="mb-8 h-12 shrink-0 flex items-center justify-start pr-10 pt-2">
                    <Image
                        src={theme === 'dark' ? '/logo/logo_dm.png' : '/logo/logo_lm.png'}
                        alt="Logo"
                        width={200}
                        height={200}
                        loading="eager"
                        className="object-cover"
                    />
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col gap-2 w-full">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname.includes(item.href)

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={t(item.labelKey)}
                                className={`flex items-center gap-4 px-3.5 py-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-(--bg-2) text-(--text-1)'
                                    : 'text-(--text-2) hover:bg-(--bg-2) hover:text-(--text-1)'
                                    }`}
                            >
                                <Icon className="w-5 h-5 shrink-0" />
                                <h3 className="text-sm font-semibold whitespace-nowrap">
                                    {t(item.labelKey)}
                                </h3>
                            </Link>
                        )
                    })}

                    {/* Settings Button */}
                    <button
                        title={t('settings')}
                        onClick={() => setIsOpen(true)}
                        className="w-full flex items-center gap-4 px-3.5 py-3 rounded-lg text-(--text-2) hover:bg-(--bg-2) hover:text-(--text-1) transition-all duration-200 cursor-pointer"
                        disabled={isPending}
                    >
                        <IoMdSettings className="w-5 h-5 shrink-0" />
                        <h3 className="text-sm font-semibold whitespace-nowrap">
                            {t('settings')}
                        </h3>
                    </button>
                </nav>

                {/* User Profile */}
                <div className={`flex justify-between px-3.5 py-3 items-center rounded-lg transition-all duration-200 ${pathname.includes('/profile')
                    ? 'bg-(--btn-1) text-(--text-1)'
                    : 'text-(--text-2) bg-(--bg-2) hover:bg-(--btn-1) hover:text-(--text-1)'
                    }`}>
                    <Link
                        href="/profile"
                        title={t('profile')}
                        className="flex gap-4 items-center"
                    >
                        <FaUser className="w-5 h-5 shrink-0" />
                        <h3 className="text-sm font-semibold whitespace-nowrap">
                            {t('profile')}
                        </h3>
                    </Link>
                    <button onClick={() => alert('Cerraste sesion')} className="cursor-pointer font-bold">
                        <CgLogOut className="h-5 w-5 shrink-0" />
                    </button>
                </div>
            </aside>

            {/* Settings Modal */}
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={t('settings')}>
                <div className="flex flex-col gap-6">
                    {/* Appearance */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-(--text-2) uppercase tracking-wide">
                            {t('appearance')}
                        </h3>

                        <ButtonMode
                            className="p-3 flex justify-center items-center rounded-lg transition-all duration-200"
                        />
                    </div>

                    {/* Language */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-(--text-2) uppercase tracking-wide">
                            {t('language')}
                        </h3>

                        <LanguageSwitcher
                            className="bg-(--bg-2) hover:bg-(--btn-1) w-full p-3 flex justify-center items-center rounded-lg transition-all duration-200"
                        />
                    </div>
                </div>
            </Modal>
        </>
    )
}
