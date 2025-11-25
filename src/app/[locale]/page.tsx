import Navbar from "@/components/features/Navbar";
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
                
                {/* 
                    CORRECCIÓN: 
                    Quité el section wrapper que tenía 'max-w-8xl'. 
                    Ahora TextsSection controla su propio ancho (max-w-7xl) igual que el Navbar.
                    Usamos flex min-h-[calc(100vh-80px)] para centrar verticalmente si quieres que ocupe toda la pantalla
                    restando la altura del header (aprox 80px).
                */}
                <div className="flex flex-col justify-center min-h-[calc(100vh-6rem)]">
                    <TextsSection />
                </div>

            </main>
        </>
    );
}
