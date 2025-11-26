import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Project, Task } from '@/types/features/project'

interface ProjectState {
    projects: Project[]
    tasks: Task[]
    selectedProjectId: string | null
    addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void
    addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void
    updateTask: (taskId: string, updates: Partial<Task>) => void
    deleteTask: (taskId: string) => void
    setSelectedProject: (projectId: string | null) => void
    getProjectTasks: (projectId: string) => Task[]
}

// Mock data inicial
const initialProjects: Project[] = [
    {
        id: '1',
        name: 'Website Redesign',
        description: 'Development',
        icon: '🏠',
        color: '#3B82F6',
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        name: 'Mobile App',
        description: 'Development',
        icon: '📱',
        color: '#8B5CF6',
        createdAt: new Date().toISOString()
    },
    {
        id: '3',
        name: 'Marketing Campaign',
        description: 'Marketing',
        icon: '📊',
        color: '#F59E0B',
        createdAt: new Date().toISOString()
    }
]

const initialTasks: Task[] = [
    // Website Redesign - To-Do
    {
        id: '1',
        title: 'Design Homepage',
        description: 'Create mockups for the new homepage design',
        status: 'todo',
        priority: 'high',
        projectId: '1',
        dueDate: '2025-12-01',
        createdAt: new Date().toISOString()
    },
    {
        id: '2',
        title: 'Setup Development Environment',
        description: 'Configure Next.js and Tailwind CSS',
        status: 'todo',
        priority: 'medium',
        projectId: '1',
        dueDate: '2025-11-28',
        createdAt: new Date().toISOString()
    },
    // Website Redesign - In Progress
    {
        id: '3',
        title: 'Implement Navigation',
        description: 'Build responsive navigation component',
        status: 'in-progress',
        priority: 'high',
        projectId: '1',
        dueDate: '2025-11-30',
        createdAt: new Date().toISOString()
    },
    // Website Redesign - Done
    {
        id: '4',
        title: 'Research Competitors',
        description: 'Analyze competitor websites for inspiration',
        status: 'done',
        priority: 'low',
        projectId: '1',
        dueDate: '2025-11-25',
        createdAt: new Date().toISOString()
    },
    // Mobile App - To-Do
    {
        id: '5',
        title: 'Create User Flow',
        description: 'Design user journey and flow diagrams',
        status: 'todo',
        priority: 'high',
        projectId: '2',
        dueDate: '2025-12-05',
        createdAt: new Date().toISOString()
    },
    {
        id: '6',
        title: 'Setup React Native',
        description: 'Initialize React Native project',
        status: 'todo',
        priority: 'medium',
        projectId: '2',
        dueDate: '2025-12-02',
        createdAt: new Date().toISOString()
    },
    // Mobile App - In Progress
    {
        id: '7',
        title: 'Design App Icons',
        description: 'Create app icon variations for iOS and Android',
        status: 'in-progress',
        priority: 'medium',
        projectId: '2',
        dueDate: '2025-11-29',
        createdAt: new Date().toISOString()
    },
    // Marketing Campaign - To-Do
    {
        id: '8',
        title: 'Plan Social Media Strategy',
        description: 'Create content calendar for Q1 2026',
        status: 'todo',
        priority: 'high',
        projectId: '3',
        dueDate: '2025-12-10',
        createdAt: new Date().toISOString()
    }
]

export const useProjectStore = create<ProjectState>()(
    persist(
        (set, get) => ({
            projects: initialProjects,
            tasks: initialTasks,
            selectedProjectId: initialProjects[0].id,

            addProject: (projectData) => {
                const newProject: Project = {
                    ...projectData,
                    id: Date.now().toString(),
                    createdAt: new Date().toISOString()
                }
                set((state) => ({
                    projects: [...state.projects, newProject]
                }))
            },

            addTask: (taskData) => {
                const newTask: Task = {
                    ...taskData,
                    id: Date.now().toString(),
                    createdAt: new Date().toISOString()
                }
                set((state) => ({
                    tasks: [...state.tasks, newTask]
                }))
            },

            updateTask: (taskId, updates) => {
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                        task.id === taskId ? { ...task, ...updates } : task
                    )
                }))
            },

            deleteTask: (taskId) => {
                set((state) => ({
                    tasks: state.tasks.filter((task) => task.id !== taskId)
                }))
            },

            setSelectedProject: (projectId) => {
                set({ selectedProjectId: projectId })
            },

            getProjectTasks: (projectId) => {
                return get().tasks.filter((task) => task.projectId === projectId)
            }
        }),
        {
            name: 'project-storage',
            partialize: (state) => ({
                projects: state.projects,
                tasks: state.tasks,
                selectedProjectId: state.selectedProjectId
            })
        }
    )
)
