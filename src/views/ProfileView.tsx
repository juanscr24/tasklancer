'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useProfile, UpdateProfileData } from '@/hooks/useProfile'
import { EditProfileModal, ProfileFormData } from '@/components/features/EditProfileModal'
import { useTranslations } from 'next-intl'

export const ProfileView = () => {
    const t = useTranslations('profile')
    const { data: session } = useSession()
    const userId = session?.user?.id || null
    const { profile, loading, error, fetchProfile, updateProfile } = useProfile(userId)
    
    const [editingSection, setEditingSection] = useState<'personal' | 'location' | 'bio' | null>(null)

    useEffect(() => {
        if (userId) {
            fetchProfile()
        }
    }, [userId, fetchProfile])

    const handleUpdateProfile = async (data: ProfileFormData) => {
        const updateData: UpdateProfileData = {}
        
        if (data.name !== undefined) updateData.name = data.name
        if (data.phone !== undefined) updateData.phone = data.phone || null
        if (data.location !== undefined) updateData.location = data.location || null
        if (data.bio !== undefined) updateData.bio = data.bio || null
        
        await updateProfile(updateData)
    }

    const getInitialData = (): ProfileFormData => {
        if (!profile) return {}
        
        switch (editingSection) {
            case 'personal':
                return {
                    name: profile.name || '',
                    phone: profile.phone || '',
                }
            case 'location':
                return {
                    location: profile.location || '',
                }
            case 'bio':
                return {
                    bio: profile.bio || '',
                }
            default:
                return {}
        }
    }

    if (loading && !profile) {
        return (
            <div className="flex min-h-[calc(100vh-95px)] bg-(--bg-1) items-center justify-center">
                <div className="text-(--text-2)">Loading profile...</div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex min-h-[calc(100vh-95px)] bg-(--bg-1) items-center justify-center">
                <div className="text-red-500">Error: {error}</div>
            </div>
        )
    }

    return (
        <div className="min-h-[calc(100vh-95px)] bg-(--bg-1) py-4 sm:py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Profile Header */}
                <div className="bg-(--bg-2) border border-(--border-1) rounded-xl sm:rounded-2xl p-4 sm:p-8 mb-4 sm:mb-6">
                    <h1 className="text-(--text-1) text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{t('title')}</h1>
                    <p className="text-(--text-2) text-sm sm:text-base">{t('subtitle')}</p>
                </div>

                {/* Avatar Section */}
                <div className="bg-(--bg-2) border border-(--border-1) rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                        {/* Avatar */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-(--btn-1) flex items-center justify-center overflow-hidden border-4 border-(--btn-1)/20 shrink-0">
                            {profile?.image ? (
                                <img 
                                    src={profile.image} 
                                    alt={profile.name || 'Profile'} 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-white text-xl sm:text-2xl font-bold">
                                    {profile?.name?.charAt(0)?.toUpperCase() || 'U'}
                                </span>
                            )}
                        </div>
                        
                        {/* Upload Info */}
                        <div className="flex-1">
                            <p className="text-(--text-1) font-semibold mb-1 text-sm sm:text-base">{t('uploadPhoto')}</p>
                            <p className="text-(--text-2) text-xs sm:text-sm">{t('uploadSpecs')}</p>
                            <p className="text-(--text-2) text-xs sm:text-sm">{t('uploadFormat')}</p>
                        </div>
                    </div>
                </div>

                {/* Personal Info Section */}
                <div className="bg-(--bg-2) border border-(--border-1) rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <h2 className="text-(--text-1) text-base sm:text-lg font-semibold">{t('personalInfo')}</h2>
                        <button 
                            onClick={() => setEditingSection('personal')}
                            className="flex items-center gap-1 sm:gap-2 text-(--btn-1) hover:text-(--btn-1)/80 transition-colors font-medium text-sm sm:text-base"
                        >
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            {t('edit')}
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        <div>
                            <p className="text-(--text-2) text-xs sm:text-sm mb-1">{t('fullName')}</p>
                            <p className="text-(--text-1) font-medium text-sm sm:text-base truncate">{profile?.name || t('notSet')}</p>
                        </div>
                        <div>
                            <p className="text-(--text-2) text-xs sm:text-sm mb-1">{t('email')}</p>
                            <p className="text-(--text-1) font-medium text-sm sm:text-base truncate">{profile?.email || t('notSet')}</p>
                        </div>
                        <div>
                            <p className="text-(--text-2) text-xs sm:text-sm mb-1">{t('phone')}</p>
                            <p className="text-(--text-1) font-medium text-sm sm:text-base truncate">{profile?.phone || t('notSet')}</p>
                        </div>
                    </div>
                </div>

                {/* Location Section */}
                <div className="bg-(--bg-2) border border-(--border-1) rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h2 className="text-(--text-1) text-base sm:text-lg font-semibold">{t('location')}</h2>
                        <button 
                            onClick={() => setEditingSection('location')}
                            className="text-(--text-2) hover:text-(--text-1) transition-colors text-sm sm:text-base"
                        >
                            {t('cancel')}
                        </button>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                        <div className="flex-1 flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 bg-(--bg-3) border border-(--border-1) rounded-lg sm:rounded-xl">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-(--text-2) shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-(--text-1) text-sm sm:text-base truncate">{profile?.location || t('notSet')}</span>
                        </div>
                        <button 
                            onClick={() => setEditingSection('location')}
                            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-(--btn-1) text-white rounded-lg sm:rounded-xl font-medium hover:bg-(--btn-1)/90 transition-colors text-sm sm:text-base whitespace-nowrap"
                        >
                            {t('save')}
                        </button>
                    </div>
                </div>

                {/* Bio Section */}
                <div className="bg-(--bg-2) border border-(--border-1) rounded-xl sm:rounded-2xl p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h2 className="text-(--text-1) text-base sm:text-lg font-semibold">{t('bio')}</h2>
                        <button 
                            onClick={() => setEditingSection('bio')}
                            className="flex items-center gap-1 sm:gap-2 text-(--btn-1) hover:text-(--btn-1)/80 transition-colors font-medium text-sm sm:text-base"
                        >
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            {t('edit')}
                        </button>
                    </div>
                    
                    <p className="text-(--text-2) leading-relaxed text-sm sm:text-base">
                        {profile?.bio || t('noBio')}
                    </p>
                </div>

                {/* Member Since */}
                <div className="mt-4 sm:mt-6 text-center">
                    <p className="text-(--text-2) text-xs sm:text-sm">
                        {t('memberSince')} {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}
                    </p>
                </div>
            </div>

            {/* Edit Modal */}
            {editingSection && (
                <EditProfileModal
                    isOpen={true}
                    onClose={() => setEditingSection(null)}
                    onSubmit={handleUpdateProfile}
                    initialData={getInitialData()}
                    section={editingSection}
                />
            )}
        </div>
    )
}
