'use client'
import { Moon, Sun } from 'lucide-react'
import { ButtonModeProps } from '@/types'
import { useTheme } from '@/utils/ThemeProvider'

export const ButtonMode = ({ className }: ButtonModeProps) => {
    const { toggleTheme, theme } = useTheme()
    return (
        <button
            className={`hover:scale-103 text-(--text-1) transition-all duration-200 cursor-pointer rounded-md ${className}`}
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}>
            {theme == 'light' ? <Moon /> : <Sun />}
        </button>
    )
}
