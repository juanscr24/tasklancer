'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@components'
import { useClients } from '@/hooks'
import { ProjectFormFields } from '@/components/form/ProjectFormFields'
import { PROJECT_ICONS, PROJECT_COLORS } from '@/constants/project'

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
    status?: 'ACTIVE' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED'
    clientId?: string | null
}

export const NewProjectModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    mode = 'create'
}: NewProjectModalProps) => {
    const t = useTranslations('projectModal')
    const { data: session } = useSession()
    const [userId, setUserId] = useState<string | null>(null)
    const { clients, fetchClients } = useClients(userId)

    const [formData, setFormData] = useState<ProjectFormData>({
        name: '',
        description: '',
        icon: PROJECT_ICONS[0].value,
        color: PROJECT_COLORS[0],
        status: 'ACTIVE',
        clientId: null
    })

    const [errors, setErrors] = useState<Partial<ProjectFormData>>({})

    // Get userId from session
    useEffect(() => {
        if (session?.user?.id) {
            setUserId(session.user.id)
        }
    }, [session])

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
                status: 'ACTIVE',
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

    const handleChange = (field: keyof ProjectFormData, value: string | null | undefined) => {
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
            title={mode === 'create' ? t('create.title') : t('edit.title')}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <ProjectFormFields
                    formData={formData}
                    errors={errors}
                    clients={clients}
                    mode={mode}
                    onChange={handleChange}
                />

                {/* Action Buttons */}
                <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="flex-1 py-2.5 bg-(--bg-2) text-(--text-1) hover:bg-(--bg-2)/80"
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        type="submit"
                        primary
                        className="flex-1 py-2.5 text-white"
                    >
                        {mode === 'create' ? t('create.submit') : t('edit.submit')}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
