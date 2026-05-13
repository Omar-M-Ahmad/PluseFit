'use client'

/**
 * Default Layout component.
 * Wraps the main page content with Header and Footer.
 * Automatically scrolls to top on route change.
 */

import { useEffect } from 'react'
import { usePathname } from '@/i18n/routing'
import { Header } from './Header'
import { Footer } from './Footer'

export function DefaultLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  /**
   * Scroll to top whenever the pathname changes.
   */
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
