import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark'

interface ThemeState {
    theme: Theme
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: 'light',
            setTheme: (theme: Theme) => {
                set({ theme })
                // Apply theme class to document
                if (typeof window !== 'undefined') {
                    document.documentElement.classList.toggle('dark', theme === 'dark')
                }
            },
            toggleTheme: () => {
                const newTheme = get().theme === 'light' ? 'dark' : 'light'
                get().setTheme(newTheme)
            }
        }),
        {
            name: 'theme-storage',
            partialize: (state) => ({ theme: state.theme }),
            // Rehydrate and apply theme class on load
            onRehydrateStorage: () => (state) => {
                if (state && typeof window !== 'undefined') {
                    document.documentElement.classList.toggle('dark', state.theme === 'dark')
                }
            }
        }
    )
)
