'use client'

import { Plus } from 'lucide-react'
import { Button } from '@components'

interface ClientsHeaderProps {
    onAddClient?: () => void
}

export const ClientsHeader = ({ onAddClient }: ClientsHeaderProps) => {
    return (
        <div className="flex justify-between items-center px-8 py-6 bg-(--bg-1)">
            {/* Title */}
            <h1 className="text-3xl font-bold text-(--text-1)">Clients</h1>

            {/* Add Client Button */}
            <Button
                className="text-sm py-3 px-4 w-29! text-white"
                primary
                onClick={onAddClient}
                title="new Client"
            >
                + New Client
            </Button>
        </div>
    )
}
