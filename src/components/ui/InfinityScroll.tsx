'use client'
import { ReactNode, useEffect, useRef, useState } from "react";

interface InfiniteScrollProps {
    children: ReactNode;
    direction?: 'left' | 'right';
    speed?: number; // Segundos para completar el ciclo
}

export const InfiniteScroll = ({
    children,
    direction = 'left',
    speed = 40
}: InfiniteScrollProps) => {
    const [contentWidth, setContentWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            // Medimos el ancho de un set de hijos para saber cuánto desplazar
            setContentWidth(containerRef.current.scrollWidth / 2);
        }
    }, [children]);

    return (
        <div className="relative w-full overflow-hidden group">
            {/* Máscaras de degradado a los lados para suavizar la entrada/salida */}
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-(--bg-1) to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-(--bg-1) to-transparent pointer-events-none" />

            <div
                ref={containerRef}
                className="flex w-max hover:[animation-play-state:paused]" // Pausa en hover
                style={{
                    animation: `scroll-${direction} ${speed}s linear infinite`
                }}
            >
                {/* Renderizamos DOS veces el contenido para el loop perfecto */}
                {children}
                {children}
            </div>

            {/* Definimos la animación keyframes localmente para este componente */}
            <style jsx>{`
                @keyframes scroll-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); } /* Movemos medio ancho */
                }
                @keyframes scroll-right {
                    0% { transform: translateX(-50%); } /* Empezamos desplazados */
                    100% { transform: translateX(0); }
                }
            `}</style>
        </div>
    );
};
