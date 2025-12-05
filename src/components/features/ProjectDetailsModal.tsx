'use client'

import { useState, useEffect, useMemo } from 'react'
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

    const [hourlyRate, setHourlyRate] = useState<number>(project.hourlyRate ? Number(project.hourlyRate) : 0)
    const [estimatedHours, setEstimatedHours] = useState<number>(project.estimatedHours ? Number(project.estimatedHours) : 0)
    const [priority, setPriority] = useState<string>(project.priority || 'MEDIUM')
    const [newRequirement, setNewRequirement] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
    const [pdfError, setPdfError] = useState<string | undefined>(undefined)

    // Calculate total price
    const totalPrice = useMemo(() => {
        return hourlyRate * estimatedHours
    }, [hourlyRate, estimatedHours])

    // Fetch requirements on mount
    useEffect(() => {
        fetchRequirements()
    }, [fetchRequirements])

    const handleSaveQuotation = async () => {
        setIsSaving(true)
        try {
            await onUpdate(project.id, {
                hourlyRate,
                estimatedHours,
                priority: priority as any
            })
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

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-(--bg-2) rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-(--bg-1)">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-(--text-1)">{project.name}</h2>
                            {project.client && (
                                <p className="text-(--text-3) mt-1">Cliente: {project.client.name}</p>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-(--bg-1) rounded-lg transition-colors"
                        >
                            <X size={24} className="text-(--text-3)" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* Quotation Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-(--text-1) flex items-center gap-2">
                            <DollarSign size={20} />
                            Cotización
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Hourly Rate */}
                            <div>
                                <label className="block text-sm text-(--text-3) mb-2">
                                    Precio por hora
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-3)">$</span>
                                    <input
                                        type="number"
                                        value={hourlyRate}
                                        onChange={(e) => setHourlyRate(Number(e.target.value))}
                                        className="w-full pl-8 pr-4 py-2 bg-(--bg-1) border border-(--text-3) rounded-lg text-(--text-1) focus:outline-none focus:border-(--btn-1)"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            </div>

                            {/* Estimated Hours */}
                            <div>
                                <label className="block text-sm text-(--text-3) mb-2">
                                    Horas estimadas
                                </label>
                                <div className="relative">
                                    <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-3)" />
                                    <input
                                        type="number"
                                        value={estimatedHours}
                                        onChange={(e) => setEstimatedHours(Number(e.target.value))}
                                        className="w-full pl-10 pr-4 py-2 bg-(--bg-1) border border-(--text-3) rounded-lg text-(--text-1) focus:outline-none focus:border-(--btn-1)"
                                        min="0"
                                        step="0.5"
                                    />
                                </div>
                            </div>

                            {/* Total Price */}
                            <div>
                                <label className="block text-sm text-(--text-3) mb-2">
                                    Total
                                </label>
                                <div className="px-4 py-2 bg-(--btn-1) rounded-lg">
                                    <p className="text-2xl font-bold text-white">
                                        ${totalPrice.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-sm text-(--text-3) mb-2">
                                Prioridad
                            </label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full px-4 py-2 bg-(--bg-1) border border-(--text-3) rounded-lg text-(--text-1) focus:outline-none focus:border-(--btn-1)"
                            >
                                <option value="LOW">Baja</option>
                                <option value="MEDIUM">Media</option>
                                <option value="HIGH">Alta</option>
                                <option value="URGENT">Urgente</option>
                            </select>
                        </div>
                    </div>

                    {/* Requirements Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-(--text-1) flex items-center gap-2">
                            <FileText size={20} />
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
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newRequirement}
                                onChange={(e) => setNewRequirement(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Agregar nuevo requerimiento..."
                                className="flex-1 px-4 py-2 bg-(--bg-1) border border-(--text-3) rounded-lg text-(--text-1) placeholder:text-(--text-3) focus:outline-none focus:border-(--btn-1)"
                            />
                            <button
                                onClick={handleAddRequirement}
                                className="px-4 py-2 bg-(--btn-1) text-white rounded-lg hover:bg-(--btn-2) transition-colors flex items-center gap-2"
                            >
                                <Plus size={20} />
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-(--bg-1)">
                    {pdfError && (
                        <div className="mb-4 p-3 text-sm text-red-500 bg-red-100 border border-red-200 rounded-md">
                            {pdfError}
                        </div>
                    )}
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handleDownloadPDF}
                            disabled={isGeneratingPDF}
                            className="px-6 py-2 border border-(--btn-1) text-(--btn-1) rounded-lg hover:bg-(--btn-1) hover:text-white transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            <Download size={18} />
                            {isGeneratingPDF ? 'Generando PDF...' : 'Descargar PDF'}
                        </button>
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 border border-(--text-3) text-(--text-1) rounded-lg hover:bg-(--bg-1) transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSaveQuotation}
                                disabled={isSaving}
                                className="px-6 py-2 bg-(--btn-1) text-white rounded-lg hover:bg-(--btn-2) transition-colors disabled:opacity-50"
                            >
                                {isSaving ? 'Guardando...' : 'Guardar Cotización'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
