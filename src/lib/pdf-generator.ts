'use client'

import jsPDF from 'jspdf'
import { Project } from '@/types/features/project'
import { ProjectRequirement } from '@/types/features/requirement'

interface QuotationData {
    project: Project & {
        client?: {
            id: string
            name: string
            email: string
            company?: string | null
        } | null
    }
    requirements: ProjectRequirement[]
}

export async function generateQuotationPDF(data: QuotationData): Promise<void> {
    const { project, requirements } = data
    const pdf = new jsPDF('p', 'mm', 'a4')

    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20
    const contentWidth = pageWidth - (2 * margin)
    let yPosition = margin

    // Helper function to check if we need a new page
    const checkPageBreak = (requiredSpace: number) => {
        if (yPosition + requiredSpace > pageHeight - margin) {
            pdf.addPage()
            yPosition = margin
            return true
        }
        return false
    }

    // Helper to add text with word wrap
    const addText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 10) => {
        pdf.setFontSize(fontSize)
        const lines = pdf.splitTextToSize(text, maxWidth)
        pdf.text(lines, x, y)
        return lines.length * (fontSize * 0.35) // Approximate line height
    }

    // === HEADER ===
    pdf.setFillColor(59, 130, 246) // Blue color
    pdf.rect(0, 0, pageWidth, 40, 'F')

    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(24)
    pdf.setFont('helvetica', 'bold')
    pdf.text('TaskLancer', margin, 20)

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Gestión Profesional de Proyectos Freelance', margin, 28)

    yPosition = 50

    // === DOCUMENT TITLE ===
    pdf.setTextColor(31, 41, 55)
    pdf.setFontSize(20)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Cotización de Proyecto', margin, yPosition)
    yPosition += 10

    // Date
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(107, 114, 128)
    const currentDate = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
    pdf.text(`Fecha: ${currentDate}`, margin, yPosition)
    yPosition += 15

    // === PROJECT INFORMATION ===
    checkPageBreak(40)
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(31, 41, 55)
    pdf.text('Información del Proyecto', margin, yPosition)
    yPosition += 8

    // Draw line under section title
    pdf.setDrawColor(229, 231, 235)
    pdf.setLineWidth(0.5)
    pdf.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 8

    // Project details in a grid-like layout
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')

    // Project Name
    pdf.setTextColor(107, 114, 128)
    pdf.text('NOMBRE DEL PROYECTO', margin, yPosition)
    yPosition += 5
    pdf.setTextColor(31, 41, 55)
    pdf.setFont('helvetica', 'bold')
    const nameHeight = addText(project.name, margin, yPosition, contentWidth, 12)
    yPosition += nameHeight + 5
    pdf.setFont('helvetica', 'normal')

    // Client info if available
    if (project.client) {
        checkPageBreak(15)
        pdf.setTextColor(107, 114, 128)
        pdf.text('CLIENTE', margin, yPosition)
        yPosition += 5
        pdf.setTextColor(31, 41, 55)
        pdf.text(project.client.name, margin, yPosition)
        yPosition += 5

        if (project.client.company) {
            pdf.setTextColor(107, 114, 128)
            pdf.text('EMPRESA', margin, yPosition)
            yPosition += 5
            pdf.setTextColor(31, 41, 55)
            pdf.text(project.client.company, margin, yPosition)
            yPosition += 5
        }

        if (project.client.email) {
            pdf.setTextColor(107, 114, 128)
            pdf.text('EMAIL', margin, yPosition)
            yPosition += 5
            pdf.setTextColor(31, 41, 55)
            pdf.text(project.client.email, margin, yPosition)
            yPosition += 5
        }
    }

    // Description if available
    if (project.description) {
        checkPageBreak(20)
        yPosition += 3
        pdf.setTextColor(107, 114, 128)
        pdf.text('DESCRIPCIÓN', margin, yPosition)
        yPosition += 5
        pdf.setTextColor(31, 41, 55)
        const descHeight = addText(project.description, margin, yPosition, contentWidth, 10)
        yPosition += descHeight + 5
    }

    // Priority
    if (project.priority) {
        const priorityLabels: Record<string, string> = {
            LOW: 'Baja',
            MEDIUM: 'Media',
            HIGH: 'Alta',
            URGENT: 'Urgente'
        }
        pdf.setTextColor(107, 114, 128)
        pdf.text('PRIORIDAD', margin, yPosition)
        yPosition += 5
        pdf.setTextColor(31, 41, 55)
        pdf.text(priorityLabels[project.priority] || project.priority, margin, yPosition)
        yPosition += 10
    }

    // === PRICING INFORMATION ===
    checkPageBreak(60)
    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(31, 41, 55)
    pdf.text('Detalles de Cotización', margin, yPosition)
    yPosition += 8

    pdf.setDrawColor(229, 231, 235)
    pdf.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 10

    // Pricing table
    const tableStartY = yPosition
    const col1X = margin
    const col2X = margin + 60
    const col3X = margin + 110
    const col4X = margin + 150

    // Table header
    pdf.setFillColor(243, 244, 246)
    pdf.rect(margin, tableStartY, contentWidth, 10, 'F')

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'bold')
    pdf.setTextColor(55, 65, 81)
    pdf.text('Concepto', col1X + 2, tableStartY + 7)
    pdf.text('Cantidad', col2X + 2, tableStartY + 7)
    pdf.text('Precio/Hora', col3X + 2, tableStartY + 7)
    pdf.text('Total', col4X + 2, tableStartY + 7)

    yPosition = tableStartY + 10

    // Table row
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(31, 41, 55)
    pdf.text('Desarrollo de Proyecto', col1X + 2, yPosition + 7)
    pdf.text(`${project.estimatedHours || 0} hrs`, col2X + 2, yPosition + 7)
    pdf.text(`$${Number(project.hourlyRate || 0).toFixed(2)}`, col3X + 2, yPosition + 7)

    const totalPrice = (Number(project.hourlyRate || 0) * Number(project.estimatedHours || 0))
    pdf.text(`$${totalPrice.toFixed(2)}`, col4X + 2, yPosition + 7)

    yPosition += 10

    // Draw table borders
    pdf.setDrawColor(229, 231, 235)
    pdf.line(margin, tableStartY + 10, pageWidth - margin, tableStartY + 10)
    pdf.line(margin, yPosition, pageWidth - margin, yPosition)

    // Total row
    yPosition += 5
    pdf.setFillColor(59, 130, 246)
    pdf.rect(margin, yPosition, contentWidth, 12, 'F')

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(12)
    pdf.setTextColor(255, 255, 255)
    pdf.text('TOTAL', col3X + 2, yPosition + 8)
    pdf.text(`$${totalPrice.toFixed(2)}`, col4X + 2, yPosition + 8)

    yPosition += 20

    // === REQUIREMENTS ===
    if (requirements.length > 0) {
        checkPageBreak(40)
        pdf.setFontSize(14)
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(31, 41, 55)
        pdf.text('Requerimientos del Cliente', margin, yPosition)
        yPosition += 8

        pdf.setDrawColor(229, 231, 235)
        pdf.line(margin, yPosition, pageWidth - margin, yPosition)
        yPosition += 8

        pdf.setFontSize(10)
        pdf.setFont('helvetica', 'normal')

        requirements.forEach((req, index) => {
            checkPageBreak(15)

            // Requirement box
            const boxHeight = 8
            pdf.setFillColor(249, 250, 251)
            pdf.rect(margin, yPosition, contentWidth, boxHeight, 'F')

            // Blue left border
            pdf.setFillColor(59, 130, 246)
            pdf.rect(margin, yPosition, 2, boxHeight, 'F')

            pdf.setTextColor(31, 41, 55)
            const reqText = `${index + 1}. ${req.description}`
            const reqHeight = addText(reqText, margin + 5, yPosition + 5, contentWidth - 10, 10)

            yPosition += Math.max(boxHeight, reqHeight + 3) + 3
        })
    }

    // === FOOTER ===
    yPosition = pageHeight - 30
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(107, 114, 128)

    const footerText1 = 'Este documento es una cotización y no constituye un contrato vinculante.'
    const footerText2 = 'Para proceder con el proyecto, se requiere la firma de un contrato formal.'
    const footerText3 = `TaskLancer © ${new Date().getFullYear()}`

    pdf.text(footerText1, pageWidth / 2, yPosition, { align: 'center' })
    pdf.text(footerText2, pageWidth / 2, yPosition + 5, { align: 'center' })
    pdf.text(footerText3, pageWidth / 2, yPosition + 12, { align: 'center' })

    // Save the PDF
    const filename = `cotizacion-${project.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`
    pdf.save(filename)
}
