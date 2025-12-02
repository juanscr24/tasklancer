export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH'
export type ProjectStatus = 'ACTIVE' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED'

export interface Task {
    id: string
    title: string
    description: string | null
    status: TaskStatus
    priority: TaskPriority
    projectId: string
    dueDate: string | null
    createdAt: string
    updatedAt: string
    project?: {
        id: string
        name: string
        color?: string
        icon?: string
    }
}

export interface Project {
    id: string
    name: string
    description: string | null
    icon: string | null
    color: string
    status: ProjectStatus
    userId: string
    clientId: string | null
    createdAt: string
    updatedAt: string
    tasks?: Task[]
    client?: {
        id: string
        name: string
    }
}

