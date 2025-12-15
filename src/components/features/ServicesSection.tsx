'use client'

import { motion } from "motion/react";
import { servicesData } from "@/constants/services";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { useTranslations } from "next-intl";

export default function ServicesSection() {
    const t = useTranslations('hero');
    return (
        <section className="w-full py-20 max-md:py-10 px-4 sm:px-6 lg:px-8 bg-(--bg-1)">
            <div className="max-w-7xl mx-auto">
                
                <div className="text-center mb-16 space-y-4">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.8 }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-bold text-(--text-1)"
                    >
                        {t('title-services')}<span className="text-(--btn-1)">{t('title-services-blue')}</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-(--text-2) max-w-2xl mx-auto text-lg"
                    >
                        {t('parrafo-services')}
                    </motion.p>
                </div>

                {/* Grid de Servicios */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {servicesData.map((service, index) => (
                        <ServiceCard key={service.id} service={service} index={index} />
                    ))}
                </div>

            </div>
        </section>
    )
}

// Subcomponente de Tarjeta (Para mantener limpio el código)
const ServiceCard = ({ service, index }: { service: any, index: number }) => {
    const Icon = service.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative flex flex-col h-full p-6 rounded-2xl border border-(--border-1) bg-(--bg-2) transition-all duration-300 hover:border-(--btn-1) hover:shadow-lg hover:shadow-(--btn-1)/10"
        >
            {service.badge && (
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold bg-(--btn-1) text-white">
                    {service.badge}
                </div>
            )}

            {/* Icono */}
            <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-(--btn-1) text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-6 h-6" />
            </div>

            <div className="flex-1">
                <h3 className="text-xl font-bold text-(--text-1) mb-3 group-hover:text-(--btn-1) transition-colors">
                    {service.title}
                </h3>
                <p className="text-(--text-2) text-sm leading-relaxed mb-6">
                    {service.description}
                </p>
            </div>

            <div className="mt-auto pt-4 border-t border-(--border-1)/50 group-hover:border-(--btn-1)/30 transition-colors">
                <Link 
                    href={service.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-(--btn-1) group-hover:translate-x-2 transition-transform duration-300"
                >
                    Abrir herramienta <HiArrowRight />
                </Link>
            </div>
        </motion.div>
    );
};
