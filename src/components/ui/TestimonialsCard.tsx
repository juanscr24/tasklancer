import Image from "next/image";
import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import { FaRegHeart, FaRegComment } from "react-icons/fa6";
import { Testimonial } from "@/constants/testimonials";

export const TestimonialCard = ({ data }: { data: Testimonial }) => {
    const Icon =
        data.platform === 'twitter' ? FaTwitter :
            data.platform === 'instagram' ? FaInstagram : FaFacebook;

    const iconColor =
        data.platform === 'twitter' ? 'text-black dark:text-white' :
            data.platform === 'instagram' ? 'text-pink-600' : 'text-blue-600';

    return (
        <div className="w-[350px] md:w-[400px] shrink-0 p-6 rounded-2xl bg-(--bg-1) border border-(--text-2)/10 shadow-sm hover:shadow-md transition-shadow mx-4">
            {/* Header: Likes & Date */}
            <div className="flex justify-between items-center text-(--text-2) text-xs mb-4">
                <div className="flex gap-4">
                    <span className="flex items-center gap-1"><FaRegHeart /> {data.likes}</span>
                    <span className="flex items-center gap-1"><FaRegComment /> {data.comments}</span>
                </div>
                <span>{data.date}</span>
            </div>

            {/* Content */}
            <p className="text-(--text-1) text-sm leading-relaxed mb-6 font-medium">
                &quot;{data.content}&quot;
            </p>

            {/* Footer: User Info */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                        <Image
                            src={data.avatar}
                            alt={data.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h4 className="font-bold text-(--text-1) text-sm">{data.name}</h4>
                        <p className="text-(--text-2) text-xs">{data.username}</p>
                    </div>
                </div>
                <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
        </div>
    );
};
