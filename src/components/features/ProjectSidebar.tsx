'use client'
import { useState } from 'react'
import { useProjectStore } from '@/stores/projectStore'
import { Button, SearchBar } from '@components'

export const ProjectSidebar = () => {
    const { projects, selectedProjectId, setSelectedProject, tasks } = useProjectStore()
    const [searchQuery, setSearchQuery] = useState('')
    const [showNewProjectModal, setShowNewProjectModal] = useState(false)

    // Filter projects by search query
    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Calculate progress for each project
    const getProjectProgress = (projectId: string) => {
        const projectTasks = tasks.filter((task) => task.projectId === projectId)
        if (projectTasks.length === 0) return 0
        const completedTasks = projectTasks.filter((task) => task.status === 'done')
        return Math.round((completedTasks.length / projectTasks.length) * 100)
    }

    return (
        <div className="w-80 h-screen flex flex-col bg-(--bg-2) py-7 px-4 border-r border-(--bg-2)">
            {/* Header */}
            <div className="flex gap-4 items-center mb-6">
                <h2 className="text-3xl text-(--text-1) font-bold">Projects</h2>
                <Button
                    className="text-sm py-2 px-4 text-white"
                    primary
                    onClick={() => setShowNewProjectModal(true)}
                    title="New Project"
                >
                    New project
                </Button>
            </div>

            {/* Search Bar */}
            <SearchBar
                className="mt-2 mb-6 bg-white dark:bg-[#232F48]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Projects List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                {filteredProjects.map((project) => {
                    const progress = getProjectProgress(project.id)
                    const isSelected = selectedProjectId === project.id
                    const taskCount = tasks.filter((task) => task.projectId === project.id).length

                    return (
                        <div
                            key={project.id}
                            onClick={() => setSelectedProject(project.id)}
                            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${isSelected
                                    ? 'bg-(--btn-1) text-white'
                                    : 'bg-(--bg-1) hover:bg-(--bg-2) text-(--text-1)'
                                }`}
                        >
                            {/* Project Header */}
                            <div className="flex items-center gap-3 mb-3">
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center text-2xl"
                                    style={{ backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : project.color }}
                                >
                                    {project.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-sm truncate">{project.name}</h3>
                                    <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-(--text-2)'}`}>
                                        {project.description}
                                    </p>
                                </div>
                                <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-(--text-2)'}`}>
                                    {taskCount}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-(--bg-2) rounded-full h-2 overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-300 ${isSelected ? 'bg-white' : 'bg-(--btn-1)'
                                        }`}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )
                })}

                {filteredProjects.length === 0 && (
                    <div className="text-center py-8 text-(--text-2)">
                        <p className="text-sm">No projects found</p>
                    </div>
                )}
            </div>

            {/* TODO: Add NewProjectModal */}
            {showNewProjectModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-(--bg-1) p-6 rounded-lg">
                        <h2 className="text-(--text-1) text-xl font-bold mb-4">New Project Modal</h2>
                        <button
                            onClick={() => setShowNewProjectModal(false)}
                            className="bg-(--btn-1) text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
