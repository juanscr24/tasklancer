import { ReactNode } from 'react'
import { Sidebar } from '@components'

interface Props {
    children: ReactNode
}

export default function MainLayout({ children }: Props) {
    return (
        <div className="min-h-screen">
            {/* SIDEBAR */}
            <Sidebar />
            {/* CONTENIDO */}
            <main className="ml-60">
                {children}
            </main>
        </div>
    )
}