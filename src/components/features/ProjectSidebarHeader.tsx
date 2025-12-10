'use client'
import { useTranslations } from 'next-intl'
import { Button } from '@components'

interface ProjectSidebarHeaderProps {
    onNewProject: () => void
}

export const ProjectSidebarHeader = ({ onNewProject }: ProjectSidebarHeaderProps) => {
    const t = useTranslations('projects')

    return (
        <div className="flex gap-4 justify-between mb-6">
            <h2 className="text-3xl text-(--text-1) font-bold">{t('header')}</h2>
            <Button
                className="text-sm py-2 px-2 w-25! text-white"
                primary
                onClick={onNewProject}
                title={t('newProject')}
            >
                {t('newProject')}
            </Button>
        </div>
    )
}
