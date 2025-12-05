import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface Stats {
    totalProjects: number
    activeProjects: number
    totalClients: number
    totalTasks: number
    completedTasks: number
    totalInvoices: number
    paidInvoices: number
    totalRevenue: number
}

export const useStats = () => {
    const { data: session } = useSession()
    const [stats, setStats] = useState<Stats>({
        totalProjects: 0,
        activeProjects: 0,
        totalClients: 0,
        totalTasks: 0,
        completedTasks: 0,
        totalInvoices: 0,
        paidInvoices: 0,
        totalRevenue: 0
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            if (!session?.user?.id) return

            try {
                setIsLoading(true)
                const response = await fetch(`/api/stats?userId=${session.user.id}`)
                if (response.ok) {
                    const data = await response.json()
                    setStats(data)
                }
            } catch (error) {
                console.error('Error fetching stats:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchStats()
    }, [session?.user?.id])

    return { stats, isLoading }
}
