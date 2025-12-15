'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
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
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        }
    }, [initialData])

    useEffect(() => {
        if (isOpen && mounted) {
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, mounted])

    if (!isOpen || !mounted) return null

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

    const modalContent = (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
                aria-hidden="true"
            />
            
            {/* Modal */}
            <div className="relative bg-(--bg-2) border border-(--border-1) rounded-xl sm:rounded-2xl w-full max-w-lg p-4 sm:p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h2 className="text-(--text-1) text-lg sm:text-xl font-bold">{getTitle()}</h2>
                    <button 
                        onClick={onClose}
                        className="text-(--text-2) hover:text-(--text-1) transition-colors p-1"
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    {section === 'personal' && (
                        <>
                            <div>
                                <label className="block text-(--text-2) text-xs sm:text-sm font-medium mb-2">
                                    {t('fullName')}
                                </label>
                                <input
                                    type="text"
                                    value={formData.name || ''}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-(--bg-3) border border-(--border-1) rounded-lg sm:rounded-xl text-(--text-1) text-sm sm:text-base placeholder:text-(--text-2) focus:outline-none focus:ring-2 focus:ring-(--btn-1)"
                                    placeholder={t('placeholders.name')}
                                />
                            </div>
                            <div>
                                <label className="block text-(--text-2) text-xs sm:text-sm font-medium mb-2">
                                    {t('phone')}
                                </label>
                                <input
                                    type="tel"
                                    value={formData.phone || ''}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-(--bg-3) border border-(--border-1) rounded-lg sm:rounded-xl text-(--text-1) text-sm sm:text-base placeholder:text-(--text-2) focus:outline-none focus:ring-2 focus:ring-(--btn-1)"
                                    placeholder={t('placeholders.phone')}
                                />
                            </div>
                        </>
                    )}

                    {section === 'location' && (
                        <div>
                            <label className="block text-(--text-2) text-xs sm:text-sm font-medium mb-2">
                                {t('location')}
                            </label>
                            <input
                                type="text"
                                value={formData.location || ''}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-(--bg-3) border border-(--border-1) rounded-lg sm:rounded-xl text-(--text-1) text-sm sm:text-base placeholder:text-(--text-2) focus:outline-none focus:ring-2 focus:ring-(--btn-1)"
                                placeholder={t('placeholders.location')}
                            />
                        </div>
                    )}

                    {section === 'bio' && (
                        <div>
                            <label className="block text-(--text-2) text-xs sm:text-sm font-medium mb-2">
                                {t('bio')}
                            </label>
                            <textarea
                                value={formData.bio || ''}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                rows={6}
                                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-(--bg-3) border border-(--border-1) rounded-lg sm:rounded-xl text-(--text-1) text-sm sm:text-base placeholder:text-(--text-2) focus:outline-none focus:ring-2 focus:ring-(--btn-1) resize-none"
                                placeholder={t('bioPlaceholder')}
                            />
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 pt-2 sm:pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 sm:py-3 bg-(--bg-3) text-(--text-1) rounded-lg sm:rounded-xl font-medium hover:bg-(--border-1) transition-colors text-sm sm:text-base"
                        >
                            {t('cancel')}
                        </button>
                        <Button
                            type="submit"
                            primary
                            className="flex-1 py-2.5 sm:py-3 text-sm sm:text-base"
                            disabled={loading}
                        >
                            {loading ? t('saving') : t('save')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )

    return createPortal(modalContent, document.body)
}
