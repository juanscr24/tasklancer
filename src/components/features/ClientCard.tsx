'use client'

import { Button } from '@/components'
import { DropdownMenu } from '@/components/ui/DropdownMenu'
import { useTranslations } from 'next-intl'

interface ClientCardProps {
    name: string
    role: string
    email: string
    phone: string
    avatar?: string
    company?: string
    notes?: string
    projectsCount?: number
    onViewProjects?: () => void
    onEdit?: () => void
    onDelete?: () => void
}

export const ClientCard = ({
    name,
    role,
    email,
    phone,
    avatar,
    company,
    notes,
    projectsCount = 0,
    onViewProjects,
    onEdit,
    onDelete
}: ClientCardProps) => {
    const t = useTranslations('clients.card')
    
    return (
        <div className="bg-(--bg-2) border border-(--border-1) rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:shadow-2xl transition-all duration-300 group">
            {/* Left: Avatar/Image Section */}
            <div className="w-full sm:w-[180px] min-h-[200px] sm:min-h-auto bg-(--bg-3) relative shrink-0">
                {avatar ? (
                    <img 
                        src={avatar} 
                        alt={name} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    />
                ) : (
                    <div className="w-full h-full bg-(--bg-3) flex items-center justify-center border-b sm:border-b-0 sm:border-r border-(--border-1)">
                        <span className="text-(--text-2) text-4xl font-bold opacity-20 capitalize">
                            {name.charAt(0)}
                        </span>
                    </div>
                )}
            </div>

            {/* Right: Content Section */}
            <div className="flex-1 p-5 flex flex-col w-full">
                {/* Header Section */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex-1 mr-4">
                        <div className="flex items-center gap-2 mb-1">
                            {/* Logo/Icon placeholder */}
                            <div className="w-6 h-6 rounded-full bg-(--text-1) flex items-center justify-center shrink-0">
                                <span className="text-(--bg-1) text-xs font-bold transform -rotate-12">T</span>
                            </div>
                            <h3 className="text-(--text-1) font-bold uppercase tracking-tight text-lg leading-none">
                                {company || t('independentClient')}
                            </h3>
                        </div>
                        <p className="text-(--text-2) text-[10px] uppercase tracking-widest font-mono">
                            UPC00{phone.replace(/\D/g, '').slice(0, 8) || '000000'}
                        </p>
                    </div>

                    <div className="flex items-center gap-1">
                         {onEdit && onDelete && (
                            <DropdownMenu
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        )}
                    </div>
                </div>

                {/* Info Fields */}
                <div className="space-y-4 mb-6">
                    <div className="border-b border-(--text-2)/20 pb-1">
                        <div className="flex items-baseline">
                            <span className="text-(--text-1) text-xs uppercase font-bold w-16 shrink-0">{t('name')}</span>
                            <span className="text-(--text-1) font-mono text-sm truncate">{name}</span>
                        </div>
                    </div>
                    
                    <div className="border-b border-(--text-2)/20 pb-1">
                        <div className="flex items-baseline">
                            <span className="text-(--text-1) text-xs uppercase font-bold w-16 shrink-0">{t('role')}</span>
                            <span className="text-(--text-1) font-mono text-sm truncate uppercase">{role}</span>
                        </div>
                    </div>

                    <div className="border-b border-(--text-2)/20 pb-1">
                        <div className="flex items-baseline">
                            <span className="text-(--text-1) text-xs uppercase font-bold w-16 shrink-0">{t('email')}</span>
                            <span className="text-(--text-1) font-mono text-sm truncate lowercase">{email}</span>
                        </div>
                    </div>
                </div>

                {/* Notes/Review Section & Action */}
                <div className="mt-auto flex flex-col gap-4">
                    <div className="bg-(--bg-3)/50 rounded p-3 relative group/review">
                        <span className="text-[10px] uppercase font-bold text-(--text-2) absolute -top-2 left-2 bg-(--bg-2) px-1">
                            {t('aboutNotes')}
                        </span>
                        <p className="text-(--text-2) text-xs font-mono leading-relaxed line-clamp-2 sm:line-clamp-3">
                            {notes || t('noNotes')}
                        </p>
                    </div>

                    <Button
                        primary
                        onClick={onViewProjects}
                        className="w-full text-xs py-2 uppercase tracking-wide font-bold"
                    >
                        {t('projects')} ({projectsCount})
                    </Button>
                </div>
            </div>
        </div>
    )
}
