'use client'

import { AuthForm } from "@/components/features/AuthForm";
import { AuthImage } from "@/components/features/AuthImage";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/ui";

export const AuthView = () => {
    const t = useTranslations('auth');
    const [isLogin, setIsLogin] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const toggleForm = () => {
        setIsTransitioning(true);
        setIsLogin(!isLogin);
    };

    // Cuando termina la transición quitamos el blur
    const handleTransitionEnd = () => {
        setIsTransitioning(false);
    };

    return (
        <div
            className={`relative w-full h-screen overflow-hidden shadow-lg bg-(--bg-1) ${isLogin ? "login" : "register"
                }`}
        >
            {/* FORM SECTION */}
            <div
                className={`absolute w-1/2 h-full justify-center items-center flex flex-col top-0 z-20 transition-transform duration-1500 ease-in-out bg-(--bg-1) text-(--text-1) ${isLogin ? "translate-x-0" : "translate-x-full"
                    }`}
                onTransitionEnd={handleTransitionEnd}
            >
                <>
                    <Image className="w-14 h-14 bg-(--btn-1) rounded-md mb-6" src="/logo.png" alt="Logo" width={200} height={200} />
                    <h2 className="text-3xl font-bold text-(--text-1)">{isLogin ? t('welcomeBack') : t('welcome')}</h2>
                    <p className="text-lg text-(--text-2) mb-8">{isLogin ? t('loginSubtitle') : t('registerSubtitle')}</p>
                </>
                {/* FORM SECTION */}
                <AuthForm
                    isLogin={isLogin}
                />
                <div className="flex items-center gap-2 mt-5 w-fit">
                    <p className="text-(--text-2) w-fit">{isLogin ? t('dontHaveAccount') : t('alreadyHaveAccount')}</p>
                    <button
                        type="button"
                        onClick={toggleForm}
                        className="p-0 text-(--btn-1) cursor-pointer w-fit"
                    >
                        {isLogin ? t('signUp') : t('signIn')}
                    </button>
                </div>
                <LanguageSwitcher className="absolute top-3 right-3" />
            </div>

            {/* IMAGE SECTION */}
            <AuthImage
                handleTransitionEnd={handleTransitionEnd}
                isLogin={isLogin}
                isTransitioning={isTransitioning}
            />
        </div>
    )
}
