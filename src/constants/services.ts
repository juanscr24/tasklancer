// constants/services.ts
import { FaCalculator, FaUsers, FaClock, FaFileInvoice, FaChartLine, FaHistory } from "react-icons/fa";
// Nota: Asegúrate de tener react-icons instalado o usa iconos equivalentes de tu librería favorita (lucide-react, etc.)

export const servicesData = [
    {
        id: 1,
        icon: FaCalculator,
        title: "Calculadora de Precio por Proyecto",
        description: "Calcula el precio ideal basado en horas estimadas, gastos y margen de ganancia deseado.",
        link: "/tools/project-calculator",
        badge: null
    },
    {
        id: 2,
        icon: FaClock,
        title: "Calculadora de Tarifa por Hora",
        description: "Determina tu tarifa horaria considerando gastos operativos, impuestos y vacaciones.",
        link: "/tools/hourly-rate",
        badge: null
    },
    {
        id: 3,
        icon: FaUsers,
        title: "Gestión de Clientes",
        description: "Base de datos para almacenar contactos, proyectos asociados y notas importantes.",
        link: "/dashboard/clients",
        badge: "Esencial"
    },
    {
        id: 4,
        icon: FaHistory,
        title: "Historial de Comunicaciones",
        description: "Registra emails, llamadas y reuniones con cada cliente para no perder el hilo.",
        link: "/dashboard/history",
        badge: null
    },
    {
        id: 5,
        icon: FaChartLine, // Icono similar al Time Tracker
        title: "Time Tracker",
        description: "Registra las horas trabajadas por proyecto y cliente con inicio/pausa automático.",
        link: "/tools/tracker",
        badge: "Popular"
    },
    {
        id: 6,
        icon: FaFileInvoice,
        title: "Generador de Facturas",
        description: "Crea facturas profesionales con tu logo, detalles del cliente y conceptos personalizados.",
        link: "/tools/invoices",
        badge: null
    }
];
