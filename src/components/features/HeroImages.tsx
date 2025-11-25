import { HeroCard } from "../ui/HeroCard";

export const HeroImages = () => {
    return (
        <div className="relative w-full h-[350px] md:h-[400px] flex items-center justify-center max-w-[100vw] overflow-hidden md:overflow-visible py-10">

            {/* TARJETA 1 */}
            <HeroCard
                src="/images/hero-kanban.png"
                alt="Kanban Board"
                className="
                    z-12
                    w-[260px] top-12 -right-6 
                    md:w-[380px] md:top-10 md:right-0 
                    transform rotate-3 md:translate-x-4 
                    hover:z-50 hover:scale-105 transition-all duration-300
                "
            />

            {/* TARJETA 2: Medio (Tasks) */}
            <HeroCard
                src="/images/hero-tasks.png"
                alt="Tasks List"
                className="
                    z-12
                    w-[240px] top-24 right-8 
                    md:w-[380px] md:top-20 md:right-44 
                    transform -rotate-2 translate-y-4 md:translate-y-8 
                    hover:z-50 hover:scale-105 transition-all duration-300
                "
            />

            {/* TARJETA 3: Frente (Financial) */}
            <HeroCard
                src="/images/hero-financial.png"
                alt="Financial Snapshot"
                className="
                    z-11
                    w-[220px] top-4 -left-2 
                    md:w-[300px] md:top-0 md:left-4 
                    transform -rotate-3 
                    hover:z-50 hover:scale-105 transition-all duration-300
                "
            />
        </div>
    )
}
