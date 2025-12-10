'use client'
import { useTranslations } from 'next-intl'
import { PROJECT_ICONS, PROJECT_COLORS } from '@/constants/project'
import { ProjectFormData } from '../features/NewProjectModal'
import { StatusSelect } from '../ui/StatusSelect'

interface Client {
    id: string
    name: string
    company?: string | null
}

interface ProjectFormFieldsProps {
    formData: ProjectFormData
    errors: Partial<ProjectFormData>
    clients: Client[]
    mode: 'create' | 'edit'
    onChange: (field: keyof ProjectFormData, value: string | null | undefined) => void
}

export const ProjectFormFields = ({
    formData,
    errors,
    clients,
    mode,
    onChange
}: ProjectFormFieldsProps) => {
    const t = useTranslations('projectModal')
    return (
        <>
            {/* Project Name */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-(--text-1) mb-2">
                    {t('fields.name.label')} *
                </label>
                <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => onChange('name', e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-lg bg-(--bg-2) border ${errors.name ? 'border-red-500' : 'border-(--bg-2)'
                        } text-(--text-1) focus:outline-none focus:ring-2 focus:ring-(--btn-1) transition-all`}
                    placeholder={t('fields.name.placeholder')}
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{t('fields.name.required')}</p>
                )}
            </div>

            {/* Project Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-(--text-1) mb-2">
                    {t('fields.description.label')}
                </label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => onChange('description', e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-lg bg-(--bg-2) border border-(--bg-2) text-(--text-1) focus:outline-none focus:ring-2 focus:ring-(--btn-1) transition-all resize-none"
                    placeholder={t('fields.description.placeholder')}
                />
            </div>

            {/* Client & Status in two columns */}
            <div className="grid grid-cols-1 max-sm:grid-cols-1 gap-4">
                {/* Client Selection */}
                <div>
                    <label htmlFor="client" className="block text-sm font-medium text-(--text-1) mb-2">
                        {t('fields.client.label')}
                    </label>
                    <select
                        id="client"
                        value={formData.clientId || ''}
                        onChange={(e) => onChange('clientId', e.target.value || null)}
                        className="w-full px-4 py-2.5 rounded-lg bg-(--bg-2) border border-(--bg-2) text-(--text-1) focus:outline-none focus:ring-2 focus:ring-(--btn-1) transition-all"
                    >
                        <option value="">{t('fields.client.placeholder')}</option>
                        {clients.map((client) => (
                            <option key={client.id} value={client.id}>
                                {client.name} {client.company ? `(${client.company})` : ''}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status Selection - Only in Edit Mode */}
                {mode === 'edit' && (
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-(--text-1) mb-2">
                            {t('fields.status.label')}
                        </label>
                        <StatusSelect
                            value={formData.status || 'ACTIVE'}
                            onChange={(value) => onChange('status', value)}
                        />
                    </div>
                )}
            </div>

            {/* Icon & Color in two columns */}
            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
                {/* Icon Selection */}
                <div>
                    <label className="block text-sm font-medium text-(--text-1) mb-2">
                        {t('fields.icon.label')}
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                        {PROJECT_ICONS.map((icon) => (
                            <button
                                key={icon.value}
                                type="button"
                                onClick={() => onChange('icon', icon.value)}
                                className={`p-2 rounded-lg border-2 transition-all duration-200 ${formData.icon === icon.value
                                    ? 'border-(--btn-1) bg-(--btn-1)/10'
                                    : 'border-(--bg-2) hover:border-(--btn-1)/50'
                                    }`}
                                title={icon.label}
                            >
                                <div className="text-2xl text-center">{icon.value}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Color Selection */}
                <div>
                    <label className="block text-sm font-medium text-(--text-1) mb-2">
                        {t('fields.color.label')}
                    </label>
                    <div className="grid grid-cols-4 gap-4">
                        {PROJECT_COLORS.map((color) => (
                            <button
                                key={color}
                                type="button"
                                onClick={() => onChange('color', color)}
                                className={`w-full h-12 rounded-lg transition-all duration-200 ${formData.color === color
                                    ? 'ring-2 ring-offset-2 ring-(--btn-1)'
                                    : 'hover:scale-105'
                                    }`}
                                style={{ backgroundColor: color }}
                                aria-label={`Select color ${color}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
