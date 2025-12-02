import Navbar from "@/components/features/Navbar";
import ServicesSection from "@/components/features/ServicesSection";
import TestimonialsSection from "@/components/features/TestimonialSection";
import TextsSection from "@/components/features/TextsSection";

export default function Home() {
    return (
        <>
            {/* Header fijo */}
            <header className="sticky top-0 z-50">
                <Navbar />
            </header>

            {/* Contenido principal */}
            <main className="min-h-screen bg-(--bg-1) text-(--text-1) transition-colors duration-300">
                <div className="flex flex-col justify-center min-h-[calc(100vh-6rem)]">
                    <TextsSection />
                </div>
                <div id="services" className="scroll-mt-24"> 
                    <ServicesSection />
                </div>
                <div className="relative z-10 pb-20">
                    <TestimonialsSection />
                </div>
            </main>
        </>
    );
}
