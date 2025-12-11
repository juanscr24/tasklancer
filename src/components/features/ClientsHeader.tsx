'use client'

import { Plus } from 'lucide-react'
import { Button } from '@components'
import { useTranslations } from 'next-intl'

interface ClientsHeaderProps {
    onAddClient?: () => void
}

export const ClientsHeader = ({ onAddClient }: ClientsHeaderProps) => {
    const t = useTranslations('clients')
    
    return (
        <div className="flex justify-between items-center px-8 py-6 bg-(--bg-1)">
            {/* Title */}
            <h1 className="text-3xl font-bold text-(--text-1)">{t('title')}</h1>

            {/* Add Client Button */}
            <Button
                className="text-sm py-3 px-4 w-29! text-white"
                primary
                onClick={onAddClient}
                title={t('newClient')}
            >
                {t('addClient')}
            </Button>
        </div>
    )
}
