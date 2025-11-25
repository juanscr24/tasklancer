// constants/testimonials.ts
export interface Testimonial {
    id: number;
    name: string;
    username: string;
    content: string;
    avatar: string; // URL de la imagen o iniciales
    platform: 'twitter' | 'instagram' | 'facebook';
    likes: string;
    comments: string;
    date: string;
}

const generateTestimonials = (count: number, startIndex: number): Testimonial[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: startIndex + i,
        name: `User ${startIndex + i}`,
        username: `@user${startIndex + i}`,
        content: "This platform has completely changed how I manage my freelance projects. The UI is incredibly intuitive! 🚀",
        avatar: `https://i.pravatar.cc/150?u=${startIndex + i}`, // Avatar aleatorio
        platform: i % 3 === 0 ? 'twitter' : i % 3 === 1 ? 'instagram' : 'facebook',
        likes: `${Math.floor(Math.random() * 50) + 1}k`,
        comments: `${Math.floor(Math.random() * 900) + 100}`,
        date: "08:10 PM | 23 Mar 2025"
    }));
};

export const testimonialsTop = generateTestimonials(10, 1);
export const testimonialsBottom = generateTestimonials(10, 11);
