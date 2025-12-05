import "./globals.css";
import "./fonts.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LocaleProvider } from "@/components/providers/LocaleProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        template: "%s",
        default: "TaskLancer",
    },
    description: "Tasklancer es una plataforma de gestión de tareas que te permite crear, asignar y gestionar tus tareas de manera eficiente."
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" data-scroll-behavior="smooth" suppressHydrationWarning>
            <head>
                {/* Blocking script to prevent flash of light mode */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    const stored = localStorage.getItem('theme-storage');
                                    if (stored) {
                                        const { state } = JSON.parse(stored);
                                        if (state && state.theme === 'dark') {
                                            document.documentElement.classList.add('dark');
                                        }
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <LocaleProvider>
                    {children}
                </LocaleProvider>
            </body>
        </html>
    );
}
