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
        <div className="min-h-[calc(100vh-95px)] bg-(--bg-1) py-8">
            <div className="max-w-4xl mx-auto px-6">
                {/* Profile Header */}
                <div className="bg-(--bg-2) border border-(--border-1) rounded-2xl p-8 mb-6">
                    <h1 className="text-(--text-1) text-2xl font-bold mb-2">{t('title')}</h1>
                    <p className="text-(--text-2)">{t('subtitle')}</p>
                </div>

                {/* Avatar Section */}
                <div className="bg-(--bg-2) border border-(--border-1) rounded-2xl p-6 mb-6">
                    <div className="flex items-center gap-6">
                        {/* Avatar */}
                        <div className="w-20 h-20 rounded-full bg-(--btn-1) flex items-center justify-center overflow-hidden border-4 border-(--btn-1)/20">
                            {profile?.image ? (
                                <img 
                                    src={profile.image} 
                                    alt={profile.name || 'Profile'} 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-white text-2xl font-bold">
                                    {profile?.name?.charAt(0)?.toUpperCase() || 'U'}
                                </span>
                            )}
                        </div>
                        
                        {/* Upload Info */}
                        <div>
                            <p className="text-(--text-1) font-semibold mb-1">{t('uploadPhoto')}</p>
                            <p className="text-(--text-2) text-sm">{t('uploadSpecs')}</p>
                            <p className="text-(--text-2) text-sm">{t('uploadFormat')}</p>
                        </div>
                    </div>
                </div>

                {/* Personal Info Section */}
                <div className="bg-(--bg-2) border border-(--border-1) rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-(--text-1) text-lg font-semibold">{t('personalInfo')}</h2>
                        <button 
                            onClick={() => setEditingSection('personal')}
                            className="flex items-center gap-2 text-(--btn-1) hover:text-(--btn-1)/80 transition-colors font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            {t('edit')}
                        </button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <p className="text-(--text-2) text-sm mb-1">{t('fullName')}</p>
                            <p className="text-(--text-1) font-medium">{profile?.name || t('notSet')}</p>
                        </div>
                        <div>
                            <p className="text-(--text-2) text-sm mb-1">{t('email')}</p>
                            <p className="text-(--text-1) font-medium">{profile?.email || t('notSet')}</p>
                        </div>
                        <div>
                            <p className="text-(--text-2) text-sm mb-1">{t('phone')}</p>
                            <p className="text-(--text-1) font-medium">{profile?.phone || t('notSet')}</p>
                        </div>
                    </div>
                </div>

                {/* Location Section */}
                <div className="bg-(--bg-2) border border-(--border-1) rounded-2xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-(--text-1) text-lg font-semibold">{t('location')}</h2>
                        <button 
                            onClick={() => setEditingSection('location')}
                            className="text-(--text-2) hover:text-(--text-1) transition-colors"
                        >
                            {t('cancel')}
                        </button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-(--bg-3) border border-(--border-1) rounded-xl">
                            <svg className="w-5 h-5 text-(--text-2)" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-(--text-1)">{profile?.location || t('notSet')}</span>
                        </div>
                        <button 
                            onClick={() => setEditingSection('location')}
                            className="px-6 py-3 bg-(--btn-1) text-white rounded-xl font-medium hover:bg-(--btn-1)/90 transition-colors"
                        >
                            {t('save')}
                        </button>
                    </div>
                </div>

                {/* Bio Section */}
                <div className="bg-(--bg-2) border border-(--border-1) rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-(--text-1) text-lg font-semibold">{t('bio')}</h2>
                        <button 
                            onClick={() => setEditingSection('bio')}
                            className="flex items-center gap-2 text-(--btn-1) hover:text-(--btn-1)/80 transition-colors font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            {t('edit')}
                        </button>
                    </div>
                    
                    <p className="text-(--text-2) leading-relaxed">
                        {profile?.bio || t('noBio')}
                    </p>
                </div>

                {/* Member Since */}
                <div className="mt-6 text-center">
                    <p className="text-(--text-2) text-sm">
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
