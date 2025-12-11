import { ReactNode } from 'react'
import { auth } from '@main/auth'
import { redirect } from 'next/navigation'
import { MainLayoutClient } from '@/components/features/MainLayoutClient'

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

    return <MainLayoutClient>{children}</MainLayoutClient>
}