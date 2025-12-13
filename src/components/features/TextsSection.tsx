'use client';
import { FaMoneyBillWave } from "react-icons/fa6";
import { FaFileInvoice } from "react-icons/fa";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { HeroImages } from "./HeroImages";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const TextsSection = () => {
    const t = useTranslations('hero');
    return (
        <div className="max-w-8/10 mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-10 lg:py-20">

                <div className="flex flex-col gap-8">
                    {/* Títulos */}
                    <div className="space-y-4">
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9 }}
                            className="font-extrabold text-xl sm:text-5xl lg:text-6xl text-(--text-1) leading-[1.1]">
                            {t('title')}<br />
                            <span className="text-(--btn-1)">{t('title-2')}</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.3 }}
                            className="text-lg sm:text-xl text-(--text-2) max-w-lg leading-relaxed">
                            {t('parrafo')}
                        </motion.p>
                    </div>

                    {/* Lista de características */}
                    <div className="flex flex-col gap-4">
                        <motion.div
                            initial={{ opacity: 0, x: -70 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.6 }}
                            className="flex items-center gap-4 text-(--text-2) group"> {/* Group para hover effects opcionales */}
                            <div className="p-3 rounded-lg bg-(--bg-2) shrink-0 transition-colors group-hover:bg-(--btn-1)/10">
                                <FaMoneyBillWave className="w-5 h-5 text-(--text-1) group-hover:text-(--btn-1)" />
                            </div>
                            <h4 className="font-medium text-lg">{t('span')}</h4>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: -70 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.9 }}
                            className="flex items-center gap-4 text-(--text-2) group">
                            <div className="p-3 rounded-lg bg-(--bg-2) shrink-0 transition-colors group-hover:bg-(--btn-1)/10">
                                <RiDashboardHorizontalFill className="w-5 h-5 text-(--text-1) group-hover:text-(--btn-1)" />
                            </div>
                            <h4 className="font-medium text-lg">{t('span-2')}</h4>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -70 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 2.3 }}
                            className="flex items-center gap-4 text-(--text-2) group">
                            <div className="p-3 rounded-lg bg-(--bg-2) shrink-0 transition-colors group-hover:bg-(--btn-1)/10">
                                <FaFileInvoice className="w-5 h-5 text-(--text-1) group-hover:text-(--btn-1)" />
                            </div>
                            <h4 className="font-medium text-lg">{t('span-3')}</h4>
                        </motion.div>
                    </div>
                </div>
                <Link
                    href="/auth"
                    className="w-fit md:hidden px-6 py-2.5 rounded-lg bg-(--btn-1) text-white font-semibold text-sm shadow-sm hover:opacity-90 transition-all active:scale-95">
                    Start Now
                </Link>
                <div className="relative mt-10 lg:mt-0 flex justify-center lg:justify-end max-md:mt-0">
                    <HeroImages />
                </div>
            </div>
        </div>
    )
}

export default TextsSection
