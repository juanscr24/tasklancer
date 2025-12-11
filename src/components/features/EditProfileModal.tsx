'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components'
import { useTranslations } from 'next-intl'

interface EditProfileModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: ProfileFormData) => Promise<void>
    initialData?: ProfileFormData
    section: 'personal' | 'location' | 'bio'
}

export interface ProfileFormData {
    name?: string
    phone?: string
    location?: string
    bio?: string
}

export const EditProfileModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    section
}: EditProfileModalProps) => {
    const t = useTranslations('profile')
    const [formData, setFormData] = useState<ProfileFormData>(initialData || {})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        }
    }, [initialData])

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await onSubmit(formData)
            onClose()
        } catch (error) {
            console.error('Error updating profile:', error)
        } finally {
            setLoading(false)
        }
    }

    const getTitle = () => {
        switch (section) {
            case 'personal':
                return t('sections.personal')
            case 'location':
                return t('sections.location')
            case 'bio':
                return t('sections.bio')
            default:
                return t('sections.personal')
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative bg-(--bg-2) border border-(--border-1) rounded-2xl w-full max-w-lg mx-4 p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-(--text-1) text-xl font-bold">{getTitle()}</h2>
                    <button 
                        onClick={onClose}
                        className="text-(--text-2) hover:text-(--text-1) transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {section === 'personal' && (
                        <>
                            <div>
                                <label className="block text-(--text-2) text-sm font-medium mb-2">
                                    {t('fullName')}
                                </label>
                                <input
                                    type="text"
                                    value={formData.name || ''}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-(--bg-3) border border-(--border-1) rounded-xl text-(--text-1) placeholder:text-(--text-2) focus:outline-none focus:ring-2 focus:ring-(--btn-1)"
                                    placeholder={t('placeholders.name')}
                                />
                            </div>
                            <div>
                                <label className="block text-(--text-2) text-sm font-medium mb-2">
                                    {t('phone')}
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone || ''}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 bg-(--bg-3) border border-(--border-1) rounded-xl text-(--text-1) placeholder:text-(--text-2) focus:outline-none focus:ring-2 focus:ring-(--btn-1)"
                                    placeholder={t('placeholders.phone')}
                                />
                            </div>
                        </>
                    )}

                    {section === 'location' && (
                        <div>
                            <label className="block text-(--text-2) text-sm font-medium mb-2">
                                {t('location')}
                            </label>
                            <input
                                type="text"
                                value={formData.location || ''}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full px-4 py-3 bg-(--bg-3) border border-(--border-1) rounded-xl text-(--text-1) placeholder:text-(--text-2) focus:outline-none focus:ring-2 focus:ring-(--btn-1)"
                                placeholder={t('placeholders.location')}
                            />
                        </div>
                    )}

                    {section === 'bio' && (
                        <div>
                            <label className="block text-(--text-2) text-sm font-medium mb-2">
                                {t('bio')}
                            </label>
                            <textarea
                                value={formData.bio || ''}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                rows={6}
                                className="w-full px-4 py-3 bg-(--bg-3) border border-(--border-1) rounded-xl text-(--text-1) placeholder:text-(--text-2) focus:outline-none focus:ring-2 focus:ring-(--btn-1) resize-none"
                                placeholder={t('bioPlaceholder')}
                            />
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-(--bg-3) text-(--text-1) rounded-xl font-medium hover:bg-(--border-1) transition-colors"
                        >
                            {t('cancel')}
                        </button>
                        <Button
                            type="submit"
                            primary
                            className="flex-1 py-3"
                            disabled={loading}
                        >
                            {loading ? t('saving') : t('save')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
