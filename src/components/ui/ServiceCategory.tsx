'use client'

import { ReactNode } from 'react'

interface ServiceCategoryProps {
    title: string
    description: string
    icon: ReactNode
    children: ReactNode
}

export const ServiceCategory = ({ title, description, icon, children }: ServiceCategoryProps) => {
    return (
        <div className="mb-12">
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-(--btn-1) rounded-xl">
                    {icon}
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-(--text-1)">{title}</h2>
                    <p className="text-(--text-2) text-sm mt-1">{description}</p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {children}
            </div>
        </div>
    )
}
