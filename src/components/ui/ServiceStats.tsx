'use client'

interface StatItemProps {
    label: string
    value: string | number
    icon: React.ReactNode
    trend?: {
        value: string
        isPositive: boolean
    }
}

const StatItem = ({ label, value, icon, trend }: StatItemProps) => {
    return (
        <div className="bg-(--bg-2) border border-(--border-1) rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-(--btn-1) bg-opacity-10 rounded-lg">
                    {icon}
                </div>
                {trend && (
                    <span className={`text-xs font-semibold ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {trend.isPositive ? '↑' : '↓'} {trend.value}
                    </span>
                )}
            </div>
            <p className="text-(--text-2) text-sm mb-1">{label}</p>
            <p className="text-(--text-1) text-2xl font-bold">{value}</p>
        </div>
    )
}

interface ServiceStatsProps {
    stats: Array<{
        label: string
        value: string | number
        icon: React.ReactNode
        trend?: {
            value: string
            isPositive: boolean
        }
    }>
}

export const ServiceStats = ({ stats }: ServiceStatsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
                <StatItem key={index} {...stat} />
            ))}
        </div>
    )
}
