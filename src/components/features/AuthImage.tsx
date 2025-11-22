import Image from 'next/image';
import { ButtonMode } from '../ui';
import { img_login, img_register } from '../../../public/images/img';

export interface ImageAuthProps {
    handleTransitionEnd: () => void;
    isLogin: boolean;
    isTransitioning: boolean;
}

export const AuthImage = ({ handleTransitionEnd, isLogin, isTransitioning }: ImageAuthProps) => {
    return (
        <div
            className={`absolute w-1/2 h-full top-0 transition-transform duration-1500 ease-in-out z-10 ${isLogin ? "translate-x-full" : "translate-x-0"
                }`}
            onTransitionEnd={handleTransitionEnd}
        >
            <div
                className={`relative w-full h-full transition-filter duration-700 ease-in-out ${isTransitioning ? "blur-md" : "blur-0"
                    }`}
            >
                <Image
                    src={isLogin ? (img_login) : (img_register)}
                    alt="Background"
                    className="w-full h-full object-cover"
                    height={5000}
                    width={5000}
                />
                <div className="absolute bottom-0 left-0 w-full h-[40%] bg-linear-to-t from-black to-transparent z-10"></div>
                <p className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-[#D9D9D9] z-20 shadow-lg">
                    {/* aqui una frase para registro y otra ya de login */}
                    {isLogin ? "Frase de login" : "Frase de registro"}
                </p>
                <ButtonMode className={`${isLogin ? 'right-0' : 'left-10'} absolute top-5 p-2 transform -translate-x-1/2 z-20`} />
            </div>
        </div>
    )
}
