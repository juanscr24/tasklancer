import Navbar from "@/components/features/Navbar";

export default function Home() {
    return (
        <main className="min-h-screen bg-(--bg-1) text-(--text-1) transition-colors duration-300">
            <Navbar />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* contenido del Hero */}
            </section>
        </main>
    );
}
