'use client'
import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { CgLogOut } from "react-icons/cg";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useThemeStore } from "@/stores/themeStore";
import { Eclipse, Languages } from "lucide-react";
import { navItems } from "@/constants/sidebar_item";
import { ButtonMode, LanguageSwitcher } from "@components";

export const Sidebar = () => {
    const { theme } = useThemeStore()
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
                <nav className="flex-1 flex flex-col gap-3 w-full">
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
                                <Icon className="w-6 h-6 shrink-0" />
                                <h3 className="text-md whitespace-nowrap">
                                    {t(item.labelKey)}
                                </h3>
                            </Link>
                        )
                    })}
                </nav>

                {/* User Profile */}
                <section className="flex flex-col gap-2 w-full">
                    <div className="border-t-2 border-(--bg-2) mb-3.5"></div>

                    <div className={`flex justify-between px-3.5 py-3 items-center rounded-lg transition-all duration-200 ${pathname.includes('/profile')
                        ? 'bg-(--btn-1) text-(--text-1)'
                        : 'text-(--text-2) bg-(--bg-2) hover:bg-(--btn-1) hover:text-(--text-1)'
                        }`}>
                        <Link
                            href="/profile"
                            title={t('profile')}
                            className="flex gap-4 items-center"
                        >
                            <FaUser className="w-6 h-6 shrink-0" />
                            <h3 className="text-md whitespace-nowrap">
                                {t('profile')}
                            </h3>
                        </Link>
                        <button onClick={() => alert('Cerraste sesion')} className="cursor-pointer py-0">
                            <CgLogOut className="h-6 w-6 shrink-0" />
                        </button>
                    </div>
                </section>
            </aside>
        </>
    )
}
