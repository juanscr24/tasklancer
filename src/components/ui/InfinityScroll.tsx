'use client'
import { ReactNode } from "react";
import { motion } from "motion/react"; // Asegúrate de importar desde donde lo tengas instalado

interface InfiniteScrollProps {
    children: ReactNode;
    direction?: 'left' | 'right';
    speed?: number; // Duración en segundos de una vuelta completa
}

export const InfiniteScroll = ({
    children,
    direction = 'left',
    speed = 40
}: InfiniteScrollProps) => {
    
    return (
        <div className="relative w-full overflow-hidden">
            {/* Máscaras de degradado (opcionales, pero bonitas) */}
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-(--bg-1) to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-(--bg-1) to-transparent pointer-events-none" />

            {/* Contenedor Animado con Motion */}
            <motion.div
                className="flex w-max"
                // Estado inicial
                initial={{ x: direction === 'left' ? 0 : "-50%" }}
                // Animación continua
                animate={{ x: direction === 'left' ? "-50%" : 0 }}
                // Configuración de la transición (infinita y lineal)
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop" // Asegura que no vaya y vuelva, sino que haga loop
                }}
            >
                {/* Renderizamos múltiples veces para asegurar que cubra pantallas grandes */}
                {children}
                {children}
                {children} 
            </motion.div>
        </div>
    );
};
