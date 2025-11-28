'use client'

import { ServiceCard } from '@/components/ui/ServiceCard'
import { ServiceCategory } from '@/components/ui/ServiceCategory'
import { ServiceStats } from '@/components/ui/ServiceStats'
import {
    FileText,
    Clock,
    Calculator,
    FileSignature,
    Users,
    TrendingUp,
    Receipt,
    FileCheck,
    History,
    Bell,
    DollarSign,
    Percent,
    PieChart,
    FileEdit,
    Shield,
    Briefcase,
    BarChart3,
    Calendar,
    Wallet
} from 'lucide-react'

export const ServicesView = () => {
    // Stats data
    const stats = [
        {
            label: 'Facturas este mes',
            value: '12',
            icon: <Receipt className="w-5 h-5 text-(--btn-1)" />,
            trend: { value: '8%', isPositive: true }
        },
        {
            label: 'Horas registradas',
            value: '156h',
            icon: <Clock className="w-5 h-5 text-(--btn-1)" />,
            trend: { value: '12%', isPositive: true }
        },
        {
            label: 'Ingresos totales',
            value: '$8,450',
            icon: <DollarSign className="w-5 h-5 text-(--btn-1)" />,
            trend: { value: '15%', isPositive: true }
        },
        {
            label: 'Clientes activos',
            value: '8',
            icon: <Users className="w-5 h-5 text-(--btn-1)" />,
            trend: { value: '2', isPositive: true }
        }
    ]

    return (
        <div className="flex min-h-[calc(100vh-95px) bg-(--bg-1)">
            <div className="flex-1 flex flex-col">
                {/* Header */}

                <div className="px-8 py-6 bg-(--bg-1)">
                    <h1 className="text-3xl font-bold text-(--text-1)">Servicios para Freelancers</h1>
                    <p className="text-(--text-2) mt-2 text-sm">
                        Herramientas profesionales para gestionar tu negocio freelance
                    </p>
                </div>

                {/* Main Content */}
                <main className="flex-1 px-8 overflow-y-auto custom-scrollbar">
                    {/* Stats Overview */}
                    <ServiceStats stats={stats} />

                    {/* Invoicing & Finance Category */}
                    <ServiceCategory
                        title="Facturación y Finanzas"
                        description="Gestiona tus facturas, pagos e impuestos de manera profesional"
                        icon={<Receipt className="w-6 h-6 text-white" />}
                    >
                        <ServiceCard
                            title="Generador de Facturas"
                            description="Crea facturas profesionales con tu logo, detalles del cliente y conceptos personalizados"
                            icon={FileText}
                            badge="Popular"
                            onClick={() => console.log('Generador de Facturas')}
                        />
                        <ServiceCard
                            title="Plantillas de Facturas"
                            description="Accede a múltiples plantillas prediseñadas: simple, detallada, con términos y condiciones"
                            icon={FileCheck}
                            onClick={() => console.log('Plantillas')}
                        />
                        <ServiceCard
                            title="Historial de Facturas"
                            description="Visualiza todas tus facturas emitidas, filtra por estado: pagada, pendiente o vencida"
                            icon={History}
                            onClick={() => console.log('Historial')}
                        />
                        <ServiceCard
                            title="Recordatorios de Pago"
                            description="Configura notificaciones automáticas para facturas vencidas y próximas a vencer"
                            icon={Bell}
                            onClick={() => console.log('Recordatorios')}
                        />
                        <ServiceCard
                            title="Calculadora de Impuestos"
                            description="Calcula IVA, retenciones y otros impuestos según tu ubicación y tipo de servicio"
                            icon={Percent}
                            onClick={() => console.log('Impuestos')}
                        />
                        <ServiceCard
                            title="Dashboard Financiero"
                            description="Visualiza tus ingresos mensuales, anuales y proyecciones en gráficos interactivos"
                            icon={PieChart}
                            badge="Nuevo"
                            onClick={() => console.log('Dashboard')}
                        />
                    </ServiceCategory>

                    {/* Time Management Category */}
                    <ServiceCategory
                        title="Gestión de Tiempo"
                        description="Registra y optimiza tu tiempo de trabajo"
                        icon={<Clock className="w-6 h-6 text-white" />}
                    >
                        <ServiceCard
                            title="Time Tracker"
                            description="Registra las horas trabajadas por proyecto y cliente con inicio/pausa automático"
                            icon={Clock}
                            badge="Esencial"
                            onClick={() => console.log('Time Tracker')}
                        />
                        <ServiceCard
                            title="Reportes de Tiempo"
                            description="Genera reportes detallados de horas trabajadas por proyecto, cliente o período"
                            icon={BarChart3}
                            onClick={() => console.log('Reportes')}
                        />
                        <ServiceCard
                            title="Calculadora de Tarifas"
                            description="Convierte automáticamente horas trabajadas en montos a cobrar según tus tarifas"
                            icon={Calculator}
                            onClick={() => console.log('Calculadora Tarifas')}
                        />
                        <ServiceCard
                            title="Calendario de Proyectos"
                            description="Visualiza deadlines, reuniones y entregas en un calendario integrado"
                            icon={Calendar}
                            onClick={() => console.log('Calendario')}
                        />
                    </ServiceCategory>

                    {/* Calculators & Tools Category */}
                    <ServiceCategory
                        title="Calculadoras Financieras"
                        description="Herramientas para calcular precios y rentabilidad"
                        icon={<Calculator className="w-6 h-6 text-white" />}
                    >
                        <ServiceCard
                            title="Calculadora de Precio por Proyecto"
                            description="Calcula el precio ideal basado en horas estimadas, gastos y margen de ganancia deseado"
                            icon={Calculator}
                            onClick={() => console.log('Precio Proyecto')}
                        />
                        <ServiceCard
                            title="Calculadora de Tarifa por Hora"
                            description="Determina tu tarifa horaria considerando gastos operativos, impuestos y vacaciones"
                            icon={DollarSign}
                            onClick={() => console.log('Tarifa Hora')}
                        />
                        <ServiceCard
                            title="Calculadora de Rentabilidad"
                            description="Analiza qué proyectos y clientes son más rentables para tu negocio"
                            icon={TrendingUp}
                            badge="Pro"
                            onClick={() => console.log('Rentabilidad')}
                        />
                        <ServiceCard
                            title="Presupuesto de Gastos"
                            description="Planifica y controla tus gastos mensuales como freelancer"
                            icon={Wallet}
                            onClick={() => console.log('Presupuesto')}
                        />
                    </ServiceCategory>

                    {/* Contracts & Legal Category */}
                    <ServiceCategory
                        title="Contratos y Documentos Legales"
                        description="Protege tu trabajo con documentos profesionales"
                        icon={<FileSignature className="w-6 h-6 text-white" />}
                    >
                        <ServiceCard
                            title="Generador de Contratos"
                            description="Crea contratos personalizables para diferentes tipos de proyectos y servicios"
                            icon={FileSignature}
                            onClick={() => console.log('Contratos')}
                        />
                        <ServiceCard
                            title="Acuerdos de Confidencialidad (NDA)"
                            description="Plantillas de NDAs listas para personalizar y enviar a tus clientes"
                            icon={Shield}
                            onClick={() => console.log('NDA')}
                        />
                        <ServiceCard
                            title="Propuestas Comerciales"
                            description="Formato profesional para presentar proyectos y convencer a nuevos clientes"
                            icon={Briefcase}
                            onClick={() => console.log('Propuestas')}
                        />
                        <ServiceCard
                            title="Términos y Condiciones"
                            description="Templates de términos de servicio adaptables a tu tipo de trabajo"
                            icon={FileEdit}
                            onClick={() => console.log('Términos')}
                        />
                    </ServiceCategory>

                    {/* Client Management Category */}
                    <ServiceCategory
                        title="Gestión de Clientes"
                        description="Organiza y mantén relaciones con tus clientes"
                        icon={<Users className="w-6 h-6 text-white" />}
                    >
                        <ServiceCard
                            title="Base de Datos de Clientes"
                            description="Almacena información de contacto, proyectos asociados y notas importantes"
                            icon={Users}
                            onClick={() => console.log('Base Datos')}
                        />
                        <ServiceCard
                            title="Historial de Comunicaciones"
                            description="Registra emails, llamadas y reuniones con cada cliente"
                            icon={History}
                            onClick={() => console.log('Historial Comunicaciones')}
                        />
                        <ServiceCard
                            title="Plantillas de Emails"
                            description="Templates para seguimiento, propuestas, agradecimientos y más"
                            icon={FileText}
                            onClick={() => console.log('Plantillas Email')}
                        />
                    </ServiceCategory>
                </main>
            </div>
        </div>
    )
}
