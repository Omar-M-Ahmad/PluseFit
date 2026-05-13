'use client'

/**
 * Shared layout for Authentication pages (Sign In, Sign Up).
 * Features a split design with a form on the left and a motivational visual on the right.
 */

import { useEffect } from 'react'
import { Link, usePathname } from '@/i18n/routing'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

interface AuthLayoutProps {
  children: React.ReactNode
  image: string
  quote: string
  attribution: string
}

export function AuthLayout({ children, image, quote, attribution }: AuthLayoutProps) {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  /**
   * Ensure the page starts at the top when navigating between auth routes.
   */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-[100dvh] flex flex-col lg:flex-row">
      
      {/* Left Panel - Functional Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col bg-pf-bg">
        <div className="flex items-center justify-between px-6 lg:px-12 h-[72px]">
          <Link href="/" className="font-display text-2xl font-bold text-pf-text tracking-wide hover:text-pf-accent transition-colors">
            PULSEFIT
          </Link>
          
          {/* Minimalist Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-full text-pf-muted hover:text-pf-text hover:bg-pf-elevated transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        
        <div className="flex-1 flex items-center justify-center px-6 lg:px-12 py-12">
          <div className="w-full max-w-[420px]">
            {children}
          </div>
        </div>
      </div>

      {/* Right Panel - Immersive Motivational Visual (Visible on Desktop) */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img
          src={image}
          alt="Fitness motivation"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-10000 ease-linear hover:scale-110"
        />
        
        {/* Modern dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#070A0D]/80 via-[#070A0D]/40 to-[#FF4D1C]/20" />
        
        <div className="absolute bottom-12 left-12 right-12 z-10">
          <blockquote className="font-display text-3xl font-semibold text-white max-w-[400px] leading-tight">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <p className="text-caption text-white/70 mt-4 tracking-[0.1em] uppercase font-medium">
            {attribution}
          </p>
        </div>
        
        {/* Subtle decorative border element */}
        <div className="absolute top-12 right-12 w-24 h-24 border-t-2 border-r-2 border-white/20" />
      </div>
    </div>
  )
}
