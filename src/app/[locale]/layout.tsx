import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/utils/ThemeProvider";
import { getTheme } from "@/utils/theme";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Tasklancer",
    description: "Tasklancer es una plataforma de gestión de tareas que te permite crear, asignar y gestionar tus tareas de manera eficiente.",
};

export default async function LocaleLayout({
    children,
    params
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const initialTheme = await getTheme();
    const messages = await getMessages();

    return (
        <html lang={locale} data-scroll-behavior="smooth">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider initialTheme={initialTheme}>
                        {children}
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
