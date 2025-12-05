"use client"

import { HeroCard } from "../ui/HeroCard";
import { motion } from "motion/react";

const cardsData = [
    {
        src: "/images/ejemplo-3.png",
        alt: "Kanban Board",
        // 1. CLASES DE POSICIÓN PARA EL CONTENEDOR (Motion)
        // Movemos aquí: width, position (top/right), z-index
        wrapperClass: "absolute z-10 w-[260px] top-12 -right-6 md:w-[380px] md:top-10 md:right-0",
        cardClass: "w-full h-auto shadow-lg transform rotate-3 md:translate-x-4 hover:z-50 hover:scale-105 transition-all duration-300"
    },
    {
        src: "/images/ejemplo-1.png", 
        alt: "Tasks List",
        wrapperClass: "absolute z-30 w-[240px] top-24 right-8 md:w-[380px] md:top-20 md:right-44",
        cardClass: "w-full h-auto shadow-lg transform -rotate-2 translate-y-4 md:translate-y-8 hover:z-50 hover:scale-105 transition-all duration-300"
    },
    {
        src: "/images/ejemplo-2.png",
        alt: "Financial Snapshot",
        wrapperClass: "absolute z-20 w-[220px] top-4 -left-2 md:w-[300px] md:top-0 md:left-4",
        cardClass: "w-full h-auto shadow-lg transform -rotate-3 hover:z-50 hover:scale-105 transition-all duration-300"
    }
];

export const HeroImages = () => {
    return (
        <div className="relative w-full h-[350px] md:h-[400px] flex items-center justify-center max-w-[100vw] overflow-visible py-10">
            {cardsData.map((card, index) => (
                <motion.div
                    key={index}
                    className={card.wrapperClass}
                    initial={{ opacity: 0, x: 50 }} 
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                        duration: 0.8, 
                        delay: index * 0.3,
                        ease: "easeOut" 
                    }}
                >
                    <HeroCard
                        src={card.src}
                        alt={card.alt}
                        className={card.cardClass}
                    />
                </motion.div>
            ))}
        </div>
    )
}
