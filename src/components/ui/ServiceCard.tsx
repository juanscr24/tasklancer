'use client'

import { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
    title: string
    description: string
    icon: LucideIcon
    badge?: string
    onClick?: () => void
}

export const ServiceCard = ({ title, description, icon: Icon, badge, onClick }: ServiceCardProps) => {
    return (
        <div
            onClick={onClick}
            className="bg-(--bg-2) border border-(--border-1) rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:border-(--btn-1)"
        >
            {/* Icon and Badge */}
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-(--btn-1) rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                </div>
                {badge && (
                    <span className="px-3 py-1 bg-(--btn-1) text-white text-xs font-semibold rounded-full">
                        {badge}
                    </span>
                )}
            </div>

            {/* Title */}
            <h3 className="text-(--text-1) font-bold text-lg mb-2 group-hover:text-(--btn-1) transition-colors">
                {title}
            </h3>

            {/* Description */}
            <p className="text-(--text-2) text-sm leading-relaxed">
                {description}
            </p>

            {/* Arrow indicator */}
            <div className="mt-4 flex items-center text-(--btn-1) text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Abrir</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    )
}
