'use client'

import Image from 'next/image';
import { AuthImageProps } from '@/types';
import { ButtonMode } from '@components'
import { useTranslations } from 'next-intl';
import { img_login, img_register } from '@public/images/img';

export const AuthImage = ({ handleTransitionEnd, isLogin, isTransitioning }: AuthImageProps) => {
    const t = useTranslations('auth');

    return (
        <div
            className={`hidden md:block absolute w-1/2 h-full top-0 transition-transform duration-1500 ease-in-out z-10 ${isLogin ? "translate-x-full" : "translate-x-0"
                }`}
            onTransitionEnd={handleTransitionEnd}
        >
            <div
                className={`relative w-full h-full transition-filter duration-700 ease-in-out ${isTransitioning ? "blur-md" : "blur-0"
                    }`}
            >
                <Image
                    src={isLogin ? (img_register) : (img_login)}
                    alt="Background"
                    className="w-full h-full object-cover"
                    style={{
                        objectPosition: isLogin ? 'center 50%' : 'center 37%'
                    }}
                    height={5000}
                    width={5000}
                />
                <div className="absolute bottom-0 left-0 w-full h-[40%] bg-linear-to-t from-black to-transparent z-10"></div>
                <p className="w-full text-center px-10 absolute bottom-10 left-1/2 transform -translate-x-1/2 text-2xl lg:text-3xl font-bold text-[#D9D9D9] z-20 shadow-lg">
                    {isLogin ? t('imageLoginText') : t('imageRegisterText')}
                </p>
                <ButtonMode className={`${isLogin ? 'right-0' : 'left-10'} absolute top-5 p-2 transform -translate-x-1/2 z-20 bg-(--btn-1) hover:bg-(--btn-1)/80`} />
            </div>
        </div>
    )
}

