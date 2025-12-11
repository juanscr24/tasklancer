// constants/testimonials.ts

export interface Testimonial {
    id: number;
    name: string;
    username: string;
    content: string;
    avatar: string;
    platform: 'twitter' | 'instagram' | 'facebook';
    likes: string;
    comments: string;
    date: string;
}

// Función auxiliar simple para generar números "aleatorios" fijos basados en un índice
// Así el ID 1 siempre tendrá los mismos likes, el ID 2 otros, etc.
const deterministicRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

const generateTestimonials = (count: number, startIndex: number): Testimonial[] => {
    return Array.from({ length: count }, (_, i) => {
        const currentId = startIndex + i;
        // Usamos el ID como "semilla" para que el valor siempre sea igual para ese usuario
        const randomValLikes = deterministicRandom(currentId);
        const randomValComments = deterministicRandom(currentId + 100); // +100 para variar

        return {
            id: currentId,
            name: `User ${currentId}`,
            username: `@user${currentId}`,
            content: "This platform has completely changed how I manage my freelance projects. The UI is incredibly intuitive! 🚀",
            avatar: `https://i.pravatar.cc/150?u=${currentId}`,
            platform: i % 3 === 0 ? 'twitter' : i % 3 === 1 ? 'instagram' : 'facebook',
            
            // Generamos valores fijos basados en el ID
            likes: `${Math.floor(randomValLikes * 50) + 1}k`, 
            comments: `${Math.floor(randomValComments * 900) + 100}`,
            
            date: "08:10 PM | 23 Mar 2025"
        };
    });
};

export const testimonialsTop = generateTestimonials(10, 1);
export const testimonialsBottom = generateTestimonials(10, 11);
