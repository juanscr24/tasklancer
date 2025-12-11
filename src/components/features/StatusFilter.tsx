import { Check, Circle, Notebook, Pause } from "lucide-react"

export interface StatusFilterProps {
    setStatusFilter: (status: 'all' | 'active' | 'completed' | 'paused') => void
    statusFilter: 'all' | 'active' | 'completed' | 'paused'
}

const STATUS_CONFIG = [
    { key: "all", icon: Notebook, activeColor: "bg-(--btn-1)" },
    { key: "active", icon: Circle, activeColor: "bg-green-500" },
    { key: "completed", icon: Check, activeColor: "bg-blue-500" },
    { key: "paused", icon: Pause, activeColor: "bg-orange-500" },
] as const

export const StatusFilter = ({ setStatusFilter, statusFilter }: StatusFilterProps) => {
    return (
        <div className="grid grid-cols-4 gap-10 mb-4">
            {STATUS_CONFIG.map(({ key, icon: Icon, activeColor }) => {
                const isActive = statusFilter === key

                return (
                    <button
                        key={key}
                        onClick={() => setStatusFilter(key)}
                        className={`px-2 py-2 flex justify-center items-center rounded-md text-xs font-semibold transition-all duration-200 cursor-pointer
              ${isActive
                                ? `${activeColor} text-white shadow-lg scale-105`
                                : 'bg-(--bg-2) text-(--text-2) hover:bg-(--bg-2)/70 hover:scale-105'
                            }`}
                    >
                        <Icon className="h-4 w-4"/>
                    </button>
                )
            })}
        </div>
    )
}
