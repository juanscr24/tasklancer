'use client'
import { motion } from "motion/react"
import { testimonialsTop, testimonialsBottom } from "@/constants/testimonials";
import { InfiniteScroll } from "../ui/InfinityScroll";
import { TestimonialCard } from "../ui/TestimonialsCard";

const TestimonialsSection = () => {
    return (
        <section className="w-full py-20 max-md:py-10 overflow-hidden bg-(--bg-1)">
            <div className="mb-12 text-center px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.8 }}
                    transition={{ duration: 0.9 }}
                    className="text-3xl md:text-5xl font-bold text-(--text-1)"
                    >
                    Confia en Tasklancer para crecer
                </motion.h2>
                <motion.p 
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-(--text-2) max-w-2xl mx-auto text-lg"
                >
                    Miles de freelancer getionan su negocio con nuestra herramienta.
                </motion.p>
            </div>

            <div className="flex flex-col gap-8">
                <InfiniteScroll direction="left" speed={100}>
                    {testimonialsTop.map((item) => (
                        <TestimonialCard key={`top-${item.id}`} data={item} />
                    ))}
                </InfiniteScroll>

                <InfiniteScroll direction="right" speed={100}>
                    {testimonialsBottom.map((item) => (
                        <TestimonialCard key={`bottom-${item.id}`} data={item} />
                    ))}
                </InfiniteScroll>
            </div>
        </section>
    );
};

export default TestimonialsSection;
