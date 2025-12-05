import { ReactNode } from 'react'
import { HeaderSearch, Sidebar } from '@components'
import { auth } from '@main/auth'
import { redirect } from 'next/navigation'

interface Props {
    children: ReactNode
}

import { Metadata } from "next";
export const metadata: Metadata = {
    title: 'Dashboard',
}

export default async function MainLayout({ children }: Props) {
    const session = await auth()

    if (!session?.user) {
        redirect('/auth')
    }

    return (
        <div className="min-h-screen">
            {/* SIDEBAR */}
            <Sidebar />
            {/* CONTENIDO */}
            <main className="ml-60">
                <HeaderSearch />
                {children}
            </main>
        </div>
    )
}