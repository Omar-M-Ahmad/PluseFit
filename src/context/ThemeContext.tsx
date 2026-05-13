'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

interface ThemeContextValue {
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
})

/**
 * ThemeProvider — manages dark/light mode with localStorage persistence.
 * Uses mounted guard to prevent hydration mismatch.
 * Anti-flash: applies class before paint via inline script in layout.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('pulsefit-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const resolved = saved === 'light' || saved === 'dark' ? saved : (prefersDark ? 'dark' : 'dark')
    setTheme(resolved)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('pulsefit-theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
