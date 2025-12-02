'use client'
import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@components'
import { useClients } from '@/hooks'

interface NewProjectModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: ProjectFormData) => void
    initialData?: ProjectFormData
    mode?: 'create' | 'edit'
}

export interface ProjectFormData {
    name: string
    description: string
    icon: string
    color: string
    clientId?: string | null
}

const PROJECT_ICONS = [
    { value: '📱', label: 'Desarrollo & Tecnología' },
    { value: '🎨', label: 'Diseño & Creatividad' },
    { value: '💻', label: 'Marketing Digital' },
    { value: '✍️', label: 'Escritura & Traducción' },
    { value: '🎬', label: 'Video & Audio' },
    { value: '📊', label: 'Negocios & Finanzas' },
    { value: '🛒', label: 'Ecommerce' },
    { value: '🏗️', label: 'Ingeniería & Arquitectura' }
];


const PROJECT_COLORS = [
    '#3B82F6', // Blue
    '#8B5CF6', // Purple
    '#10B981', // Green
    '#F59E0B', // Orange
    '#EF4444', // Red
    '#EC4899', // Pink
    '#14B8A6', // Teal
    '#6366F1'  // Indigo
]

export const NewProjectModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    mode = 'create'
}: NewProjectModalProps) => {
    // Get userId from localStorage or context (temporary solution)
    const [userId, setUserId] = useState<string | null>(null)
    const { clients, fetchClients } = useClients(userId)

    const [formData, setFormData] = useState<ProjectFormData>({
        name: '',
        description: '',
        icon: PROJECT_ICONS[0].value,
        color: PROJECT_COLORS[0],
        clientId: null
    })

    const [errors, setErrors] = useState<Partial<ProjectFormData>>({})

    // Fetch userId on mount
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await fetch('/api/users/first')
                if (response.ok) {
                    const user = await response.json()
                    setUserId(user.id)
                }
            } catch (error) {
                console.error('Error fetching user:', error)
            }
        }
        fetchUserId()
    }, [])

    // Fetch clients when userId is available
    useEffect(() => {
        if (userId) {
            fetchClients()
        }
    }, [userId, fetchClients])

    // Update form when initialData changes
    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        } else {
            setFormData({
                name: '',
                description: '',
                icon: PROJECT_ICONS[0].value,
                color: PROJECT_COLORS[0],
                clientId: null
            })
        }
        setErrors({})
    }, [initialData, isOpen])

    const validateForm = () => {
        const newErrors: Partial<ProjectFormData> = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Project name is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            onSubmit(formData)
            onClose()
        }
    }

    const handleChange = (field: keyof ProjectFormData, value: string | null) => {
        setFormData(prev => ({ ...prev, [field]: value }))
        // Clear error for this field
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }))
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === 'create' ? 'New Project' : 'Edit Project'}
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Project Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-(--text-1) mb-2">
                        Project Name *
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg bg-(--bg-2) border ${errors.name ? 'border-red-500' : 'border-(--bg-2)'
                            } text-(--text-1) focus:outline-none focus:ring-2 focus:ring-(--btn-1) transition-all`}
                        placeholder="Enter project name"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                </div>

                {/* Project Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-(--text-1) mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg bg-(--bg-2) border border-(--bg-2) text-(--text-1) focus:outline-none focus:ring-2 focus:ring-(--btn-1) transition-all resize-none"
                        placeholder="Enter project description"
                    />
                </div>

                {/* Client Selection */}
                <div>
                    <label htmlFor="client" className="block text-sm font-medium text-(--text-1) mb-2">
                        Client (Optional)
                    </label>
                    <select
                        id="client"
                        value={formData.clientId || ''}
                        onChange={(e) => handleChange('clientId', e.target.value || null)}
                        className="w-full px-4 py-2.5 rounded-lg bg-(--bg-2) border border-(--bg-2) text-(--text-1) focus:outline-none focus:ring-2 focus:ring-(--btn-1) transition-all"
                    >
                        <option value="">No client</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.name} {client.company ? `(${client.company})` : ''}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Icon Selection */}
                <div>
                    <label className="block text-sm font-medium text-(--text-1) mb-2">
                        Project Icon
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                        {PROJECT_ICONS.map((icon) => (
                            <button
                                key={icon.value}
                                type="button"
                                onClick={() => handleChange('icon', icon.value)}
                                className={`p-4 rounded-lg border-2 transition-all duration-200 ${formData.icon === icon.value
                                    ? 'border-(--btn-1) bg-(--btn-1)/10'
                                    : 'border-(--bg-2) hover:border-(--btn-1)/50'
                                    }`}
                            >
                                <div className="text-3xl text-center">{icon.value}</div>
                                <div className="text-xs text-(--text-2) text-center mt-1">{icon.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Color Selection */}
                <div>
                    <label className="block text-sm font-medium text-(--text-1) mb-2">
                        Project Color
                    </label>
                    <div className="grid grid-cols-8 gap-2">
                        {PROJECT_COLORS.map((color) => (
                            <button
                                key={color}
                                type="button"
                                onClick={() => handleChange('color', color)}
                                className={`w-10 h-10 rounded-lg transition-all duration-200 ${formData.color === color
                                    ? 'ring-2 ring-offset-2 ring-(--btn-1) scale-110'
                                    : 'hover:scale-105'
                                    }`}
                                style={{ backgroundColor: color }}
                                aria-label={`Select color ${color}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-2.5 bg-(--bg-2) text-(--text-1) hover:bg-(--bg-2)/80"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        primary
                        className="flex-1 py-2.5 text-white"
                    >
                        {mode === 'create' ? 'Create Project' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
