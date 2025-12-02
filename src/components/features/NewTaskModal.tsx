'use client'
import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@components'

interface NewTaskModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: TaskFormData) => void
    initialData?: TaskFormData
    mode?: 'create' | 'edit'
    projectId?: string
    projects?: Array<{ id: string; name: string; icon?: string; color?: string }>
}

export interface TaskFormData {
    title: string
    description: string
    priority: 'LOW' | 'MEDIUM' | 'HIGH'
    dueDate: string
    projectId: string
}

const PRIORITY_OPTIONS = [
    { value: 'LOW', label: 'Low', color: 'bg-blue-500' },
    { value: 'MEDIUM', label: 'Medium', color: 'bg-yellow-500' },
    { value: 'HIGH', label: 'High', color: 'bg-red-500' }
]

export const NewTaskModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    mode = 'create',
    projectId,
    projects = []
}: NewTaskModalProps) => {
    const [formData, setFormData] = useState<TaskFormData>({
        title: '',
        description: '',
        priority: 'MEDIUM',
        dueDate: '',
        projectId: projectId || ''
    })

    const [errors, setErrors] = useState<{
        title?: string
        description?: string
        priority?: string
        dueDate?: string
        projectId?: string
    }>({})

    // Update form when initialData or projectId changes
    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        } else {
            setFormData({
                title: '',
                description: '',
                priority: 'MEDIUM',
                dueDate: '',
                projectId: projectId || ''
            })
        }
        setErrors({})
    }, [initialData, projectId, isOpen])

    const validateForm = () => {
        const newErrors: Partial<Record<keyof TaskFormData, string>> = {}

        if (!formData.title.trim()) {
            newErrors.title = 'Task title is required'
        }

        if (!formData.projectId) {
            newErrors.projectId = 'Please select a project'
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

    const handleChange = (field: keyof TaskFormData, value: string) => {
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
            title={mode === 'create' ? 'New Task' : 'Edit Task'}
        >
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Task Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-(--text-1) mb-2">
                        Task Title *
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-lg bg-(--bg-2) border ${errors.title ? 'border-red-500' : 'border-(--bg-2)'
                            } text-(--text-1) focus:outline-none focus:ring-2 focus:ring-(--btn-1) transition-all`}
                        placeholder="Enter task title"
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                    )}
                </div>

                {/* Task Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-(--text-1) mb-2">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-lg bg-(--bg-2) border border-(--bg-2) text-(--text-1) focus:outline-none focus:ring-2 focus:ring-(--btn-1) transition-all resize-none"
                        placeholder="Enter task description"
                    />
                </div>

                {/* Project Selection */}
                {!projectId && (
                    <div>
                        <label htmlFor="projectId" className="block text-sm font-medium text-(--text-1) mb-2">
                            Project *
                        </label>
                        <select
                            id="projectId"
                            value={formData.projectId}
                            onChange={(e) => handleChange('projectId', e.target.value)}
                            className={`w-full px-4 py-2.5 rounded-lg bg-(--bg-2) border ${errors.projectId ? 'border-red-500' : 'border-(--bg-2)'
                                } text-(--text-1) focus:outline-none focus:ring-2 focus:ring-(--btn-1) transition-all`}
                        >
                            <option value="">Select a project</option>
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.icon} {project.name}
                                </option>
                            ))}
                        </select>
                        {errors.projectId && (
                            <p className="mt-1 text-sm text-red-500">{errors.projectId}</p>
                        )}
                    </div>
                )}

                {/* Priority Selection */}
                <div>
                    <label className="block text-sm font-medium text-(--text-1) mb-2">
                        Priority
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {PRIORITY_OPTIONS.map((priority) => (
                            <button
                                key={priority.value}
                                type="button"
                                onClick={() => handleChange('priority', priority.value)}
                                className={`p-3 rounded-lg border-2 transition-all duration-200 ${formData.priority === priority.value
                                    ? 'border-(--btn-1) bg-(--btn-1)/10'
                                    : 'border-(--bg-2) hover:border-(--btn-1)/50'
                                    }`}
                            >
                                <div className={`w-full h-1 rounded-full ${priority.color} mb-2`} />
                                <div className="text-sm text-(--text-1) text-center">{priority.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Due Date */}
                <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-(--text-1) mb-2">
                        Due Date
                    </label>
                    <input
                        id="dueDate"
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => handleChange('dueDate', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-(--bg-2) border border-(--bg-2) text-(--text-1) focus:outline-none focus:ring-2 focus:ring-(--btn-1) transition-all"
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
                        {mode === 'create' ? 'Create Task' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
