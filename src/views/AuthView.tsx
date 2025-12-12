'use client'
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher, AuthForm, AuthImage } from "@components";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type AuthViewProps = {
  isVerified?: boolean;
};

export const AuthView = ({ isVerified }: AuthViewProps) => {
  const t = useTranslations('auth');
  const [isLogin, setIsLogin] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const toggleForm = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
    }, 500);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <div
      className={`relative w-full min-h-screen overflow-hidden shadow-lg bg-(--bg-1) ${
        isLogin ? "login" : "register"
      }`}
    >
      {/* FORM SECTION */}
      <div
        className={`absolute w-full md:w-1/2 h-full justify-center items-center flex flex-col top-0 z-20 transition-transform duration-1500 ease-in-out bg-(--bg-1) text-(--text-1) px-4 md:px-0 ${
          isLogin ? "translate-x-0" : "md:translate-x-full translate-x-0"
        }`}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className="w-full max-w-md flex flex-col items-center py-8 md:py-0">
          <Link href="/" className="mb-4 md:mb-6">
            <Image
              className="w-12 h-12 md:w-14 md:h-14 bg-(--btn-1) rounded-md"
              src="/logo/logo.png"
              alt="Logo"
              width={200}
              height={200}
            />
          </Link>
          <div
            className={`transition-all duration-500 ease-in-out ${
              isTransitioning
                ? "opacity-0 -translate-y-2"
                : "opacity-100 translate-y-0"
            }`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-(--text-1) text-center">
              {isLogin ? t("welcomeBack") : t("welcome")}
            </h2>
            <p className="text-base md:text-lg text-(--text-2) mb-6 md:mb-8 text-center">
              {isLogin ? t("loginSubtitle") : t("registerSubtitle")}
            </p>
          </div>

          {/* FORM SECTION */}
          <AuthForm
            isLogin={isLogin}
            isTransitioning={isTransitioning}
            isVerified={isVerified}
          />

          <div className="flex items-center gap-2 mt-5 w-fit flex-wrap justify-center">
            <p className="text-(--text-2) w-fit text-sm md:text-base">
              {isLogin ? t("dontHaveAccount") : t("alreadyHaveAccount")}
            </p>
            <button
              type="button"
              onClick={toggleForm}
              className="p-0 text-(--btn-1) cursor-pointer w-fit text-sm md:text-base font-medium hover:underline"
            >
              {isLogin ? t("signUp") : t("signIn")}
            </button>
          </div>
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
  );
};
