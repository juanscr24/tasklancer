'use client'

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Settings, User } from "lucide-react";
import { useState, useTransition } from "react";
import { useTheme } from "@/utils/ThemeProvider";
import { navItems } from "@/constants/sidebar_item";
import { ButtonMode, LanguageSwitcher, Modal } from "@components";
import { useTranslations } from "next-intl";

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isPending] = useTransition()
    const { theme } = useTheme()

    const t = useTranslations('sidebar')

    return (
        <>
            <aside className="group bg-(--bg-1) fixed top-0 left-0 z-50 w-20 hover:w-60 transition-all duration-300 h-screen flex flex-col py-6 px-4 shadow-xl">
                {/* Logo */}
                <div className="relative mb-8 h-12 shrink-0 flex items-center justify-start overflow-hidden">
                    {/* Collapsed Logo */}
                    <div className="absolute left-0 w-12 h-12 bg-(--btn-1) rounded-lg p-1 opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                        <Image
                            src="/logo/logo.png"
                            alt="Logo"
                            width={200}
                            height={200}
                            loading="eager"
                        />
                    </div>

                    {/* Expanded Logo */}
                    <div className="absolute left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-full pl-1 pr-10">
                        <Image
                            src={theme === 'dark' ? '/logo/logo_dm.png' : '/logo/logo_lm.png'}
                            alt="Logo"
                            width={500}
                            height={500}
                            loading="eager"
                            className="h-30 object-cover"
                        />
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col gap-2 w-full overflow-hidden">
                    {navItems.map((item) => {
                        const Icon = item.icon

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={t(item.labelKey)}
                                className="relative flex items-center gap-4 px-3.5 py-3 rounded-lg text-(--text-2) hover:bg-(--bg-2) hover:text-(--text-1) transition-all duration-200 group/item"
                            >
                                <Icon className="w-5 h-5 shrink-0" />

                                <h3 className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                        <Settings className="w-5 h-5 shrink-0" />

                        <h3 className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {t('settings')}
                        </h3>
                    </button>
                </nav>

                {/* User Profile */}
                <div className="mt-auto pt-4 border-t border-(--bg-2)">
                    <Link
                        href="/profile"
                        title={t('profile')}
                        className="flex items-center gap-4 px-3.5 py-3 rounded-lg text-(--text-2) bg-(--bg-2) hover:bg-(--btn-1) hover:text-(--text-1) transition-all duration-200"
                    >
                        <User className="w-5 h-5 shrink-0" />

                        <h3 className="text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {t('profile')}
                        </h3>
                    </Link>
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
                            className="bg-(--bg-2) hover:bg-(--btn-1) w-full p-3 flex justify-center items-center rounded-lg transition-all duration-200"
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
