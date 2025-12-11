export interface ProjectRequirement {
    id: string
    description: string
    completed: boolean
    order: number
    projectId: string
    createdAt: Date
    updatedAt: Date
}

export type CreateRequirementData = {
    description: string
    order?: number
    projectId: string
}

export type UpdateRequirementData = {
    description?: string
    completed?: boolean
    order?: number
}
