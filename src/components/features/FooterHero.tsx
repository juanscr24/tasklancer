'use client'

import { motion } from "motion/react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const socialLinks = [
    {
        id: 1,
        name: "GitHub",
        icon: FaGithub,
        href: "#", // <--- Coloca tu link aquí
        color: "hover:text-gray-900 dark:hover:text-white"
    },
    {
        id: 2,
        name: "LinkedIn",
        icon: FaLinkedin,
        href: "#",
        color: "hover:text-[#0077b5]"
    },
    {
        id: 3,
        name: "Gmail",
        icon: FaEnvelope,
        href: "#",
        color: "hover:text-[#EA4335]"
    },
    {
        id: 4,
        name: "WhatsApp",
        icon: FaWhatsapp,
        href: "#",
        color: "hover:text-[#25D366]"
    }
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-(--bg-2) border-t border-(--border-1) py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    
                    {/* Sección Izquierda: Título y descripción */}
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold text-(--text-1) mb-2">
                            Contáctanos
                        </h3>
                        <p className="text-(--text-2) text-sm max-w-xs mx-auto md:mx-0">
                            ¿Tienes una idea o proyecto en mente? Estamos listos para ayudarte a construirlo.
                        </p>
                    </div>

                    {/* Sección Derecha: Redes Sociales */}
                    <div className="flex items-center gap-6">
                        {socialLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <motion.a
                                    key={link.id}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`text-(--text-2) transition-colors duration-300 text-2xl ${link.color}`}
                                    title={link.name}
                                >
                                    <Icon />
                                </motion.a>
                            );
                        })}
                    </div>
                </div>

                {/* Separador */}
                <div className="h-px w-full bg-(--border-1) my-8 opacity-50"></div>

                {/* Copyright y Links legales */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-(--text-2)">
                    <p>
                        © {currentYear} Tasklancer. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-(--text-1) transition-colors">
                            Privacidad
                        </Link>
                        <Link href="/terms" className="hover:text-(--text-1) transition-colors">
                            Términos
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
