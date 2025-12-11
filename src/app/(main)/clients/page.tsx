import { ClientsView } from '@/views/ClientsView'
import { auth } from '@main/auth'

export default async function ClientsPage() {
    const session = await auth()
    if (!session?.user) {
        return <div className="flex items-center justify-center min-h-[calc(100vh-95px)]">Por favor, inicia sesión para ver el dashboard</div>
    }
    return <ClientsView />
}