export interface Client {
    id: string
    name: string
    role: string
    email: string
    phone: string
    avatar?: string
    projectsCount?: number
    company?: string
    address?: string
    notes?: string
    createdAt?: string
    updatedAt?: string
}

export interface ClientFormData {
    name: string
    role: string
    email: string
    phone: string
    avatar?: string
    company?: string
    address?: string
    notes?: string
}
