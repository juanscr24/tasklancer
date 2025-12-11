'use client'
import { useState, ReactNode } from 'react'
import { HeaderSearch, Sidebar } from '@components'

interface MainLayoutClientProps {
    children: ReactNode
}

export const MainLayoutClient = ({ children }: MainLayoutClientProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="h-screen overflow-hidden flex flex-col">
            {/* SIDEBAR */}
            <Sidebar
                isMobileOpen={isSidebarOpen}
                onMobileClose={() => setIsSidebarOpen(false)}
            />

            {/* CONTENIDO */}
            <main className="ml-60 max-md:ml-0 flex-1 flex flex-col overflow-hidden">
                <HeaderSearch onMenuClick={() => setIsSidebarOpen(true)} />
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </main>
        </div>
    )
}
