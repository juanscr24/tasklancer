export type TaskStatus = 'todo' | 'in-progress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
    id: string
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    projectId: string
    dueDate: string
    createdAt: string
}

export interface Project {
    id: string
    name: string
    description: string
    icon: string
    color: string
    createdAt: string
}
