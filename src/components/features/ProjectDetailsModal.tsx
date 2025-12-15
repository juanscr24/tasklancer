'use client'

import { useState, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { X, Plus, DollarSign, Clock, FileText, Download } from 'lucide-react'
import { Project } from '@/types/features/project'
import { useRequirements } from '@/hooks/useRequirements'
import { RequirementItem } from './RequirementItem'
import { generateQuotationPDF } from '@/lib/pdf-generator'

interface ProjectDetailsModalProps {
    project: Project
    onClose: () => void
    onUpdate: (projectId: string, updates: Partial<Project>) => Promise<void>
}

export const ProjectDetailsModal = ({ project, onClose, onUpdate }: ProjectDetailsModalProps) => {
    const { requirements, fetchRequirements, createRequirement, updateRequirement, deleteRequirement } = useRequirements(project.id)

    const [hourlyRate, setHourlyRate] = useState<number | ''>(project.hourlyRate ? Number(project.hourlyRate) : '')
    const [estimatedHours, setEstimatedHours] = useState<number | ''>(project.estimatedHours ? Number(project.estimatedHours) : '')
    const [priority, setPriority] = useState<string>(project.priority || 'MEDIUM')
    const [newRequirement, setNewRequirement] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
    const [pdfError, setPdfError] = useState<string | undefined>(undefined)
    const [mounted, setMounted] = useState(false)

    // Ensure component is mounted (for SSR)
    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    // Calculate total price
    const totalPrice = useMemo(() => {
        const rate = typeof hourlyRate === 'number' ? hourlyRate : 0
        const hours = typeof estimatedHours === 'number' ? estimatedHours : 0
        return rate * hours
    }, [hourlyRate, estimatedHours])

    // Fetch requirements on mount
    useEffect(() => {
        fetchRequirements()
    }, [fetchRequirements])

    const handleSaveQuotation = async () => {
        setIsSaving(true)
        try {
            await onUpdate(project.id, {
                hourlyRate: typeof hourlyRate === 'number' ? hourlyRate : 0,
                estimatedHours: typeof estimatedHours === 'number' ? estimatedHours : 0,
                priority: priority as any
            })
            // Close modal after successful save
            onClose()
        } catch (error) {
            console.error('Error saving quotation:', error)
        } finally {
            setIsSaving(false)
        }
    }

    const handleAddRequirement = async () => {
        if (!newRequirement.trim()) return

        try {
            await createRequirement({
                description: newRequirement.trim(),
                order: requirements.length
            })
            setNewRequirement('')
        } catch (error) {
            console.error('Error adding requirement:', error)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddRequirement()
        }
    }

    const handleDownloadPDF = async () => {
        setIsGeneratingPDF(true)
        setPdfError(undefined)
        try {
            await generateQuotationPDF({
                project: {
                    ...project,
                    hourlyRate,
                    estimatedHours,
                    priority: priority as any
                } as any,
                requirements
            })
        } catch (error) {
            console.error('Error generating PDF:', error)
            setPdfError('Error al generar el PDF. Por favor, intenta de nuevo.')
        } finally {
            setIsGeneratingPDF(false)
        }
    }

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (mounted) {
            document.body.style.overflow = 'hidden'
            return () => {
                document.body.style.overflow = 'unset'
            }
        }
    }, [mounted])

    if (!mounted) return null

    const modalContent = (
        <div className="fixed inset-0 bg-(--bg-2)/30 backdrop-blur-xs flex items-center justify-center z-9999 p-4 sm:p-6">
            <div 
                className="absolute inset-0" 
                onClick={onClose}
                aria-hidden="true"
            />
            <div className="relative bg-(--bg-2) rounded-xl max-w-3xl w-full max-h-[90vh] sm:max-h-[85vh] overflow-hidden flex flex-col shadow-2xl">
                {/* Header */}
                <div className="p-4 sm:p-6 border-b border-(--bg-1)">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl sm:text-2xl font-bold text-(--text-1) truncate">{project.name}</h2>
                            {project.client && (
                                <p className="text-(--text-2) mt-1 text-sm sm:text-base truncate">Cliente: {project.client.name}</p>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-(--bg-1) rounded-lg transition-colors shrink-0"
                        >
                            <X size={20} className="text-(--text-3) sm:w-6 sm:h-6" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
                    {/* Quotation Section */}
                    <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-base sm:text-lg font-semibold text-(--text-1) flex items-center gap-2">
                            <DollarSign size={18} className="sm:w-5 sm:h-5" />
                            Cotización
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {/* Hourly Rate */}
                            <div>
                                <label className="block text-xs sm:text-sm text-(--text-2) mb-2">
                                    Precio por hora
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-2) text-sm sm:text-base">$</span>
                                    <input
                                        type="number"
                                        value={hourlyRate}
                                        onChange={(e) => setHourlyRate(e.target.value === '' ? '' : Number(e.target.value))}
                                        placeholder="0"
                                        className="w-full pl-8 pr-4 py-2 sm:py-2.5 border-none bg-(--bg-1) rounded-lg text-(--text-1) text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-(--btn-1)"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            </div>

                            {/* Estimated Hours */}
                            <div>
                                <label className="block text-xs sm:text-sm text-(--text-2) mb-2">
                                    Horas estimadas
                                </label>
                                <div className="relative">
                                    <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-2) sm:w-[18px] sm:h-[18px]" />
                                    <input
                                        type="number"
                                        value={estimatedHours}
                                        onChange={(e) => setEstimatedHours(e.target.value === '' ? '' : Number(e.target.value))}
                                        placeholder="0"
                                        className="w-full pl-10 pr-4 py-2 sm:py-2.5 border-none bg-(--bg-1) rounded-lg text-(--text-1) text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-(--btn-1)"
                                        min="0"
                                        step="0.5"
                                    />
                                </div>
                            </div>

                            {/* Total Price */}
                            <div className="sm:col-span-2 lg:col-span-1">
                                <label className="block text-xs sm:text-sm text-(--text-2) mb-2">
                                    Total
                                </label>
                                <div className="px-4 py-2 sm:py-2.5 bg-(--btn-2) rounded-lg">
                                    <p className="font-bold text-(--text-1) text-sm sm:text-base">
                                        ${totalPrice.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-xs sm:text-sm text-(--text-2) mb-2">
                                Prioridad
                            </label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full px-3 py-2 sm:py-2.5 border-none bg-(--bg-1) rounded-lg text-(--text-1) text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-(--btn-1)"
                            >
                                <option value="LOW">Baja</option>
                                <option value="MEDIUM">Media</option>
                                <option value="HIGH">Alta</option>
                                <option value="URGENT">Urgente</option>
                            </select>
                        </div>
                    </div>

                    {/* Requirements Section */}
                    <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-base sm:text-lg font-semibold text-(--text-1) flex items-center gap-2">
                            <FileText size={18} className="sm:w-5 sm:h-5" />
                            Requerimientos del Cliente
                        </h3>

                        {/* Requirements List */}
                        <div className="space-y-2">
                            {requirements.map((req) => (
                                <RequirementItem
                                    key={req.id}
                                    requirement={req}
                                    onUpdate={updateRequirement}
                                    onDelete={deleteRequirement}
                                />
                            ))}
                        </div>

                        {/* Add New Requirement */}
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="text"
                                value={newRequirement}
                                onChange={(e) => setNewRequirement(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Agregar nuevo requerimiento..."
                                className="flex-1 px-4 py-2 sm:py-2.5 border-none bg-(--bg-1) rounded-lg text-(--text-1) text-sm sm:text-base placeholder:text-(--text-3) focus:outline-none focus:ring-2 focus:ring-(--btn-1)"
                            />
                            <button
                                onClick={handleAddRequirement}
                                className="px-4 py-2 sm:py-2.5 bg-(--btn-1) text-white rounded-lg hover:bg-(--btn-2) transition-colors flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
                            >
                                <Plus size={18} className="sm:w-5 sm:h-5" />
                                <span className="hidden sm:inline">Agregar</span>
                                <span className="sm:hidden">Agregar</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 sm:p-6 border-t border-(--bg-1)">
                    {pdfError && (
                        <div className="mb-4 p-3 text-xs sm:text-sm text-red-500 bg-red-100 border border-red-200 rounded-md">
                            {pdfError}
                        </div>
                    )}
                    <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
                        <button
                            onClick={handleDownloadPDF}
                            disabled={isGeneratingPDF}
                            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 border border-(--btn-1) text-(--text-1) rounded-lg hover:bg-(--btn-1) hover:text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base order-3 sm:order-1"
                        >
                            <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                            {isGeneratingPDF ? 'Generando PDF...' : 'Descargar PDF'}
                        </button>
                        <div className="flex gap-2 sm:gap-3 order-1 sm:order-2">
                            <button
                                onClick={onClose}
                                className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 border border-(--text-3) text-(--text-1) rounded-lg hover:bg-(--bg-1) transition-colors text-sm sm:text-base"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSaveQuotation}
                                disabled={isSaving}
                                className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 bg-(--btn-1) text-white rounded-lg hover:bg-(--btn-2) transition-colors disabled:opacity-50 text-sm sm:text-base whitespace-nowrap"
                            >
                                {isSaving ? 'Guardando...' : 'Guardar'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return createPortal(modalContent, document.body)
}
