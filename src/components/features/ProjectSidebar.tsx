'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { SearchBar } from '@components'
import { NewProjectModal } from './NewProjectModal'
import { ProjectDetailsModal } from './ProjectDetailsModal'
import { ProjectSidebarHeader } from './ProjectSidebarHeader'
import { ProjectList } from './ProjectList'
import { useProjectSidebar } from '@/hooks/useProjectSidebar'
import { StatusFilter } from './StatusFilter'
import { X, FolderKanban } from 'lucide-react'

export const ProjectSidebar = () => {
    const t = useTranslations('projects')
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    const {
        filteredProjects,
        selectedProjectId,
        tasks,
        searchQuery,
        statusFilter,
        showNewProjectModal,
        editingProject,
        detailsProject,
        setSearchQuery,
        setStatusFilter,
        setShowNewProjectModal,
        setEditingProject,
        setDetailsProject,
        handleCreateProject,
        handleEditProject,
        handleDeleteProject,
        handleUpdateProject,
        handleProjectSelect,
        handleOpenProjectModal,
        openEditModal,
        handleReorderProjects
    } = useProjectSidebar()

    return (
        <>
            {/* Floating Button for Mobile */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="fixed bottom-8 right-6 max-lg:flex hidden z-50 w-14 h-14 bg-(--btn-1) text-white rounded-full shadow-2xl items-center justify-center hover:scale-110 transition-all duration-200"
                aria-label="Open projects"
            >
                <FolderKanban className="w-6 h-6" />
            </button>

            {/* Mobile Backdrop */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 max-lg:block hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                w-80 max-md:w-6/10 max-sm:w-8/10 h-full flex flex-col bg-(--bg-2) py-7 px-4 border-r border-(--bg-2) overflow-hidden
                max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:h-screen max-lg:z-50
                max-lg:transition-transform max-lg:duration-300
                ${isMobileOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full'}
            `}>
                {/* Header with Close Button for Mobile */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                        <ProjectSidebarHeader onNewProject={() => setShowNewProjectModal(true)} />
                    </div>
                </div>

                {/* Search Bar */}
                <SearchBar
                    className="mt-2 mb-4 bg-white dark:bg-[#232F48]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                />

                {/* Status Filter */}
                <StatusFilter setStatusFilter={setStatusFilter} statusFilter={statusFilter} />

                {/* Projects List */}
                <ProjectList
                    projects={filteredProjects}
                    tasks={tasks}
                    selectedProjectId={selectedProjectId}
                    onProjectSelect={handleProjectSelect}
                    onProjectOpenModal={handleOpenProjectModal}
                    onProjectEdit={openEditModal}
                    onProjectDelete={handleDeleteProject}
                    onReorder={handleReorderProjects}
                />

                {/* New Project Modal */}
                <NewProjectModal
                    isOpen={showNewProjectModal}
                    onClose={() => {
                        setShowNewProjectModal(false)
                        setIsMobileOpen(false)
                    }}
                    onSubmit={(data) => {
                        handleCreateProject(data)
                        setIsMobileOpen(false)
                    }}
                    mode="create"
                />

                {/* Edit Project Modal */}
                {editingProject && (
                    <NewProjectModal
                        isOpen={true}
                        onClose={() => setEditingProject(null)}
                        onSubmit={handleEditProject}
                        initialData={editingProject.data}
                        mode="edit"
                    />
                )}

                {/* Project Details Modal */}
                {detailsProject && (
                    <ProjectDetailsModal
                        project={detailsProject}
                        onClose={() => {
                            setDetailsProject(null)
                            setIsMobileOpen(false)
                        }}
                        onUpdate={handleUpdateProject}
                    />
                )}
            </div>
        </>
    )
}
