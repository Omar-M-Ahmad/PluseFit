'use client'

/**
 * Header component providing site navigation, theme switching, and language switching.
 * Stays fixed at the top of the page.
 */

import { useState, useEffect, useCallback } from 'react'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import { useTranslations, useLocale } from 'next-intl'
import { Menu, X, Sun, Moon, Languages } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export function Header() {
  const t = useTranslations('Common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme()
  
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  
  const isHome = pathname === '/'

  const NAV_LINKS = [
    { label: t('programs'), href: '#programs' },
    { label: t('trainers'), href: '#trainers' },
    { label: t('results'), href: '#results' },
    { label: t('pricing'), href: '#pricing' },
    { label: t('faq'), href: '#faq' },
  ]

  /**
   * Handle scroll to change header background transparency.
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /**
   * Observer for section intersection to highlight active navigation item.
   */
  useEffect(() => {
    if (!isHome) return
    const sections = NAV_LINKS.map((link) => link.href.slice(1))
    const observers: IntersectionObserver[] = []

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [isHome, locale]) // Re-run when locale changes because NAV_LINKS labels change

  /**
   * Smooth scroll to a specific section on the home page.
   */
  const scrollToSection = useCallback((href: string) => {
    const id = href.slice(1)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }, [])

  /**
   * Switch between English and Arabic.
   */
  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          scrolled
            ? 'bg-pf-glass/90 backdrop-blur-xl border-b border-pf-border shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-2xl font-bold text-pf-text tracking-wide"
          >
            PULSEFIT
          </Link>

          {/* Desktop Nav */}
          {isHome && (
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className={`relative text-caption transition-colors duration-200 cursor-pointer ${
                    activeSection === link.href.slice(1)
                      ? 'text-pf-accent'
                      : 'text-pf-muted hover:text-pf-text'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-1/2 h-px bg-pf-accent transition-all duration-300 ${
                      activeSection === link.href.slice(1)
                        ? 'w-full -translate-x-1/2'
                        : 'w-0 -translate-x-1/2'
                    }`}
                  />
                </button>
              ))}
            </nav>
          )}

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 text-caption text-pf-muted hover:text-pf-accent transition-colors px-3 py-1.5 rounded-full hover:bg-pf-elevated"
              title="Switch Language"
            >
              <Languages size={18} />
              <span className="uppercase">{locale === 'en' ? 'AR' : 'EN'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full text-pf-muted hover:text-pf-text hover:bg-pf-elevated transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link
              href="/signin"
              className="text-caption text-pf-muted hover:text-pf-text transition-colors"
            >
              {t('signIn')}
            </Link>

            <Link
              href="/signup"
              className="bg-pf-accent text-white text-caption px-6 py-2.5 rounded-full hover:bg-pf-accent-hover hover:scale-[1.02] transition-all duration-200"
            >
              {t('joinNow')}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleLocale}
              className="p-2 flex items-center gap-1 text-pf-muted"
            >
              <Languages size={18} />
              <span className="text-xs font-bold uppercase">{locale === 'en' ? 'AR' : 'EN'}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full text-pf-muted"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center text-pf-text"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-pf-glass/98 backdrop-blur-2xl lg:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
            {isHome &&
              NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="font-display text-3xl text-pf-text hover:text-pf-accent transition-colors"
                >
                  {link.label}
                </button>
              ))}

            {!isHome && (
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-3xl text-pf-text hover:text-pf-accent transition-colors"
              >
                {t('home')}
              </Link>
            )}

            <div className="flex flex-col items-center gap-4 mt-8">
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg text-pf-muted hover:text-pf-text transition-colors"
              >
                {t('signIn')}
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-pf-accent text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-pf-accent-hover transition-colors"
              >
                {t('joinNow')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
