import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Project, Task } from '@/types/features/project'

interface ProjectState {
    projects: Project[]
    tasks: Task[]
    selectedProjectId: string | null
    isLoading: boolean
    error: string | null
    userId: string | null

    // Actions
    setUserId: (userId: string) => void
    fetchProjects: () => Promise<void>
    fetchTasks: (projectId?: string) => Promise<void>
    addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => Promise<void>
    updateProject: (projectId: string, updates: Partial<Project>) => Promise<void>
    deleteProject: (projectId: string) => Promise<void>
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
    updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>
    deleteTask: (taskId: string) => Promise<void>
    setSelectedProject: (projectId: string | null) => void
    getProjectTasks: (projectId: string) => Task[]
}

export const useProjectStore = create<ProjectState>()(
    persist(
        (set, get) => ({
            projects: [],
            tasks: [],
            selectedProjectId: null,
            isLoading: false,
            error: null,
            userId: null,

            setUserId: (userId: string) => {
                set({ userId })
            },

            fetchProjects: async () => {
                const { userId } = get()
                if (!userId) {
                    set({ error: 'User ID not set' })
                    return
                }

                set({ isLoading: true, error: null })
                try {
                    const response = await fetch(`/api/projects?userId=${userId}`)
                    if (!response.ok) throw new Error('Failed to fetch projects')

                    const projects = await response.json()
                    set({ projects, isLoading: false })
                } catch (error) {
                    console.error('Error fetching projects:', error)
                    set({ error: 'Failed to fetch projects', isLoading: false })
                }
            },

            fetchTasks: async (projectId?: string) => {
                const { userId } = get()
                if (!userId) {
                    set({ error: 'User ID not set' })
                    return
                }

                set({ isLoading: true, error: null })
                try {
                    const url = projectId
                        ? `/api/tasks?userId=${userId}&projectId=${projectId}`
                        : `/api/tasks?userId=${userId}`

                    const response = await fetch(url)
                    if (!response.ok) throw new Error('Failed to fetch tasks')

                    const tasks = await response.json()
                    set({ tasks, isLoading: false })
                } catch (error) {
                    console.error('Error fetching tasks:', error)
                    set({ error: 'Failed to fetch tasks', isLoading: false })
                }
            },

            addProject: async (projectData) => {
                const { userId } = get()
                if (!userId) {
                    set({ error: 'User ID not set' })
                    return
                }

                set({ isLoading: true, error: null })
                try {
                    const response = await fetch('/api/projects', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ ...projectData, userId })
                    })

                    if (!response.ok) throw new Error('Failed to create project')

                    const newProject = await response.json()
                    set((state) => ({
                        projects: [...state.projects, newProject],
                        isLoading: false
                    }))
                } catch (error) {
                    console.error('Error creating project:', error)
                    set({ error: 'Failed to create project', isLoading: false })
                }
            },

            updateProject: async (projectId, updates) => {
                set({ isLoading: true, error: null })
                try {
                    const response = await fetch(`/api/projects/${projectId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updates)
                    })

                    if (!response.ok) throw new Error('Failed to update project')

                    const updatedProject = await response.json()
                    set((state) => ({
                        projects: state.projects.map((p) =>
                            p.id === projectId ? updatedProject : p
                        ),
                        isLoading: false
                    }))
                } catch (error) {
                    console.error('Error updating project:', error)
                    set({ error: 'Failed to update project', isLoading: false })
                }
            },

            deleteProject: async (projectId) => {
                set({ isLoading: true, error: null })
                try {
                    const response = await fetch(`/api/projects/${projectId}`, {
                        method: 'DELETE'
                    })

                    if (!response.ok) throw new Error('Failed to delete project')

                    set((state) => ({
                        projects: state.projects.filter((p) => p.id !== projectId),
                        selectedProjectId: state.selectedProjectId === projectId ? null : state.selectedProjectId,
                        isLoading: false
                    }))
                } catch (error) {
                    console.error('Error deleting project:', error)
                    set({ error: 'Failed to delete project', isLoading: false })
                }
            },

            addTask: async (taskData) => {
                set({ isLoading: true, error: null })
                try {
                    const response = await fetch('/api/tasks', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(taskData)
                    })

                    if (!response.ok) throw new Error('Failed to create task')

                    const newTask = await response.json()
                    set((state) => ({
                        tasks: [...state.tasks, newTask],
                        isLoading: false
                    }))
                } catch (error) {
                    console.error('Error creating task:', error)
                    set({ error: 'Failed to create task', isLoading: false })
                }
            },

            updateTask: async (taskId, updates) => {
                set({ isLoading: true, error: null })
                try {
                    const response = await fetch(`/api/tasks/${taskId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updates)
                    })

                    if (!response.ok) throw new Error('Failed to update task')

                    const updatedTask = await response.json()
                    set((state) => ({
                        tasks: state.tasks.map((t) =>
                            t.id === taskId ? updatedTask : t
                        ),
                        isLoading: false
                    }))
                } catch (error) {
                    console.error('Error updating task:', error)
                    set({ error: 'Failed to update task', isLoading: false })
                }
            },

            deleteTask: async (taskId) => {
                set({ isLoading: true, error: null })
                try {
                    const response = await fetch(`/api/tasks/${taskId}`, {
                        method: 'DELETE'
                    })

                    if (!response.ok) throw new Error('Failed to delete task')

                    set((state) => ({
                        tasks: state.tasks.filter((t) => t.id !== taskId),
                        isLoading: false
                    }))
                } catch (error) {
                    console.error('Error deleting task:', error)
                    set({ error: 'Failed to delete task', isLoading: false })
                }
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
                selectedProjectId: state.selectedProjectId,
                userId: state.userId
            })
        }
    )
)
