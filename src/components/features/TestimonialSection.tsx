import { testimonialsTop, testimonialsBottom } from "@/constants/testimonials";
import { InfiniteScroll } from "../ui/InfinityScroll";
import { TestimonialCard } from "../ui/TestimonialsCard";

const TestimonialsSection = () => {
    return (
        <section className="w-full py-20 overflow-hidden bg-(--bg-1)">
            <div className="mb-12 text-center px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-(--text-1) mb-4">
                    Confia en Tasklancer para crecer
                </h2>
                <p className="text-(--text-2)">
                    Miles de freelancer getionan su negocio con nuestra herramienta.
                </p>
            </div>

            <div className="flex flex-col gap-8">
                {/* Fila 1: Mueve a la izquierda */}
                <InfiniteScroll direction="left" speed={50}>
                    {testimonialsTop.map((item) => (
                        <TestimonialCard key={`top-${item.id}`} data={item} />
                    ))}
                </InfiniteScroll>

                {/* Fila 2: Mueve a la derecha */}
                <InfiniteScroll direction="right" speed={50}>
                    {testimonialsBottom.map((item) => (
                        <TestimonialCard key={`bottom-${item.id}`} data={item} />
                    ))}
                </InfiniteScroll>
            </div>
        </section>
    );
};

export default TestimonialsSection;
