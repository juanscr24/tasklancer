'use client'

import { useState, useCallback } from 'react'

export interface UserProfile {
    id: string
    name: string | null
    email: string
    image: string | null
    phone: string | null
    bio: string | null
    location: string | null
    role: string
    createdAt: string
    updatedAt: string
}

export interface UpdateProfileData {
    name?: string
    phone?: string | null
    bio?: string | null
    location?: string | null
    image?: string | null
}

export const useProfile = (userId: string | null) => {
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchProfile = useCallback(async () => {
        if (!userId) return

        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/users/${userId}`)
            
            if (!response.ok) {
                throw new Error('Failed to fetch profile')
            }

            const data = await response.json()
            setProfile(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
        } finally {
            setLoading(false)
        }
    }, [userId])

    const updateProfile = useCallback(async (data: UpdateProfileData) => {
        if (!userId) return

        setLoading(true)
        setError(null)

        try {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error('Failed to update profile')
            }

            const updatedProfile = await response.json()
            setProfile(updatedProfile)
            return updatedProfile
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred')
            throw err
        } finally {
            setLoading(false)
        }
    }, [userId])

    return {
        profile,
        loading,
        error,
        fetchProfile,
        updateProfile,
    }
}
