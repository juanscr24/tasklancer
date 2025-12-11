import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Project, Task } from '@/types/features/project'
import { projectService, taskService } from '@/services'

interface ProjectState {
    projects: Project[]
    tasks: Task[]
    selectedProjectId: string | null
    isLoading: boolean
    error: string | null
    userId: string | null

    // Actions
    setUserId: (userId: string) => void
    clearData: () => void
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
    reorderProjects: (projectIds: string[]) => Promise<void>
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

            clearData: () => {
                set({
                    projects: [],
                    tasks: [],
                    selectedProjectId: null,
                    error: null
                })
            },

            fetchProjects: async () => {
                const { userId } = get()
                if (!userId) {
                    set({ error: 'User ID not set' })
                    return
                }

                set({ isLoading: true, error: null })
                try {
                    const projects = await projectService.getProjects(userId)
                    set({ projects, isLoading: false })
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch projects'
                    console.error('Error fetching projects:', error)
                    set({ error: errorMessage, isLoading: false })
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
                    const tasks = await taskService.getTasks(userId, projectId)
                    set({ tasks, isLoading: false })
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tasks'
                    console.error('Error fetching tasks:', error)
                    set({ error: errorMessage, isLoading: false })
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
                    const newProject = await projectService.createProject({ ...projectData, userId })
                    set((state) => ({
                        projects: [...state.projects, newProject],
                        isLoading: false
                    }))
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Failed to create project'
                    console.error('Error creating project:', error)
                    set({ error: errorMessage, isLoading: false })
                }
            },

            updateProject: async (projectId, updates) => {
                const { userId } = get()
                if (!userId) {
                    set({ error: 'User ID not set' })
                    return
                }

                set({ isLoading: true, error: null })
                try {
                    // Filter out null values for quotation fields
                    const cleanUpdates = {
                        ...updates,
                        hourlyRate: updates.hourlyRate === null ? undefined : updates.hourlyRate,
                        estimatedHours: updates.estimatedHours === null ? undefined : updates.estimatedHours,
                        totalPrice: updates.totalPrice === null ? undefined : updates.totalPrice
                    } as any

                    const updatedProject = await projectService.updateProject(projectId, userId, cleanUpdates)
                    set((state) => ({
                        projects: state.projects.map((p) =>
                            p.id === projectId ? updatedProject : p
                        ),
                        isLoading: false
                    }))
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Failed to update project'
                    console.error('Error updating project:', error)
                    set({ error: errorMessage, isLoading: false })
                }
            },

            deleteProject: async (projectId) => {
                const { userId } = get()
                if (!userId) {
                    set({ error: 'User ID not set' })
                    return
                }

                set({ isLoading: true, error: null })
                try {
                    await projectService.deleteProject(projectId, userId)
                    set((state) => ({
                        projects: state.projects.filter((p) => p.id !== projectId),
                        selectedProjectId: state.selectedProjectId === projectId ? null : state.selectedProjectId,
                        isLoading: false
                    }))
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Failed to delete project'
                    console.error('Error deleting project:', error)
                    set({ error: errorMessage, isLoading: false })
                }
            },

            addTask: async (taskData) => {
                set({ isLoading: true, error: null })
                try {
                    const newTask = await taskService.createTask(taskData)
                    set((state) => ({
                        tasks: [...state.tasks, newTask],
                        isLoading: false
                    }))
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Failed to create task'
                    console.error('Error creating task:', error)
                    set({ error: errorMessage, isLoading: false })
                }
            },

            updateTask: async (taskId, updates) => {
                // Optimistic update: Update UI immediately
                const previousTasks = get().tasks
                const taskToUpdate = previousTasks.find((t) => t.id === taskId)

                if (!taskToUpdate) {
                    set({ error: 'Task not found' })
                    return
                }

                // Immediately update the UI with optimistic data
                set((state) => ({
                    tasks: state.tasks.map((t) =>
                        t.id === taskId ? { ...t, ...updates } : t
                    )
                }))

                // Then make the API call in the background
                try {
                    const updatedTask = await taskService.updateTask(taskId, updates)
                    // Update with real data from server
                    set((state) => ({
                        tasks: state.tasks.map((t) =>
                            t.id === taskId ? updatedTask : t
                        ),
                        error: null
                    }))
                } catch (error) {
                    // Rollback on error
                    set({
                        tasks: previousTasks,
                        error: error instanceof Error ? error.message : 'Failed to update task'
                    })
                    console.error('Error updating task:', error)
                }
            },

            deleteTask: async (taskId) => {
                set({ isLoading: true, error: null })
                try {
                    await taskService.deleteTask(taskId)
                    set((state) => ({
                        tasks: state.tasks.filter((t) => t.id !== taskId),
                        isLoading: false
                    }))
                } catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Failed to delete task'
                    console.error('Error deleting task:', error)
                    set({ error: errorMessage, isLoading: false })
                }
            },

            setSelectedProject: (projectId) => {
                set({ selectedProjectId: projectId })
            },

            getProjectTasks: (projectId) => {
                return get().tasks.filter((task) => task.projectId === projectId)
            },

            reorderProjects: async (projectIds) => {
                const { projects, userId } = get()
                if (!userId) return

                // Optimistically update UI
                const reorderedProjects = projectIds
                    .map(id => projects.find(p => p.id === id))
                    .filter(Boolean) as Project[]
                set({ projects: reorderedProjects })

                // Persist to backend
                try {
                    const { updateProjectsOrder } = await import('@/services/project.service')
                    await updateProjectsOrder(userId, projectIds)
                } catch (error) {
                    console.error('Error updating project order:', error)
                    // Optionally revert on error
                    set({ projects })
                }
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