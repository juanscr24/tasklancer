'use client'

import { MoreVertical } from 'lucide-react'
import { Button } from '@/components'

interface ClientCardProps {
    name: string
    role: string
    email: string
    phone: string
    avatar?: string
    projectsCount?: number
    onViewProjects?: () => void
    onMenuClick?: () => void
}

export const ClientCard = ({
    name,
    role,
    email,
    phone,
    avatar,
    projectsCount = 0,
    onViewProjects,
    onMenuClick
}: ClientCardProps) => {
    return (
        <div className="bg-(--bg-2) border border-(--border-1) rounded-xl p-6 hover:shadow-xl transition-all duration-300 group">
            {/* Header with Avatar and Menu */}
            <div className="flex items-start justify-between mb-4">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden">
                    {avatar ? (
                        <img src={avatar} alt={name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-white" />
                    )}
                </div>

                {/* Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="p-2 rounded-lg hover:bg-(--bg-1) transition-colors text-(--text-2) hover:text-(--text-1)"
                >
                    <MoreVertical className="w-5 h-5" />
                </button>
            </div>

            {/* Client Info */}
            <div className="mb-4">
                <h3 className="text-(--text-1) font-bold text-lg mb-1">{name}</h3>
                <p className="text-(--btn-1) text-sm font-medium">{role}</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-1 mb-4">
                <p className="text-(--text-2) text-xs">
                    <span className="font-medium">Email:</span> {email}
                </p>
                <p className="text-(--text-2) text-xs">
                    <span className="font-medium">Phone:</span> {phone}
                </p>
            </div>

            {/* Projects Button */}
            <Button
                primary
                onClick={onViewProjects}
                className="text-sm py-2 px-4 w-auto"
            >
                Projects
            </Button>
        </div>
    )
}
