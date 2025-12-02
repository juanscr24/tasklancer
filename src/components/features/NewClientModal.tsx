'use client'
import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@components'

interface NewClientModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: ClientFormData) => void
    initialData?: ClientFormData
    mode?: 'create' | 'edit'
}

export interface ClientFormData {
    name: string
    email: string
    phone: string
    role?: string
    company?: string
    address?: string
    notes?: string
}

export const NewClientModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    mode = 'create'
}: NewClientModalProps) => {
    const [formData, setFormData] = useState<ClientFormData>({
        name: '',
        email: '',
        phone: '',
        role: '',
        company: '',
        address: '',
        notes: ''
    })

    const [errors, setErrors] = useState<Partial<ClientFormData>>({})

    // Update form when initialData changes
    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                role: '',
                company: '',
                address: '',
                notes: ''
            })
        }
        setErrors({})
    }, [initialData, isOpen])

    const validateForm = () => {
        const newErrors: Partial<ClientFormData> = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Client name is required'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format'
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required'
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

    const handleChange = (field: keyof ClientFormData, value: string) => {
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
            title={mode === 'create' ? 'New Client' : 'Edit Client'}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Client Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-(--text-1) mb-2">
                        Client Name *
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg bg-(--bg-2) border ${errors.name ? 'border-red-500' : 'border-(--bg-2)'
                            } text-(--text-1) focus:outline-none focus:ring-2 focus:ring-(--btn-1) transition-all`}
                        placeholder="Enter client name"
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-(--text-1) mb-2">
                        Email *
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg bg-(--bg-2) border ${errors.email ? 'border-red-500' : 'border-(--bg-2)'
                            } text-(--text-1) focus:outline-none focus:ring-2 focus:ring-(--btn-1) transition-all`}
                        placeholder="client@example.com"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-(--text-1) mb-2">
                        Phone *
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg bg-(--bg-2) border ${errors.phone ? 'border-red-500' : 'border-(--bg-2)'
                            } text-(--text-1) focus:outline-none focus:ring-2 focus:ring-(--btn-1) transition-all`}
                        placeholder="+1 234 567 8900"
                    />
                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                </div>

                {/* Role */}
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-(--text-1) mb-2">
                        Role
                    </label>
                    <input
                        id="role"
                        type="text"
                        value={formData.role}
                        onChange={(e) => handleChange('role', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-(--bg-2) border border-(--bg-2) text-(--text-1) focus:outline-none focus:ring-2 focus:ring-(--btn-1) transition-all"
                        placeholder="e.g., CEO, Developer, Designer"
                    />
                </div>

                {/* Company */}
                <div>
                    <label htmlFor="company" className="block text-sm font-medium text-(--text-1) mb-2">
                        Company
                    </label>
                    <input
                        id="company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-(--bg-2) border border-(--bg-2) text-(--text-1) focus:outline-none focus:ring-2 focus:ring-(--btn-1) transition-all"
                        placeholder="Company name"
                    />
                </div>

                {/* Address */}
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-(--text-1) mb-2">
                        Address
                    </label>
                    <input
                        id="address"
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-(--bg-2) border border-(--bg-2) text-(--text-1) focus:outline-none focus:ring-2 focus:ring-(--btn-1) transition-all"
                        placeholder="Street address, city, country"
                    />
                </div>

                {/* Notes */}
                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-(--text-1) mb-2">
                        Notes
                    </label>
                    <textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => handleChange('notes', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg bg-(--bg-2) border border-(--bg-2) text-(--text-1) focus:outline-none focus:ring-2 focus:ring-(--btn-1) transition-all resize-none"
                        placeholder="Additional notes about the client"
                    />
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
                        {mode === 'create' ? 'Create Client' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
