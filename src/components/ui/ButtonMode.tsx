'use client'
import { useTheme } from '@/utils/ThemeProvider'
import { Moon, Sun } from 'lucide-react'

export const ButtonMode = ({ className }: { className?: string }) => {
    const { toggleTheme, theme } = useTheme()
    return (
        <button
            className={`bg-(--btn-1) text-white rounded-md ${className}`}
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}>
            {theme == 'light' ? <Moon /> : <Sun />}
        </button>
    )
}
