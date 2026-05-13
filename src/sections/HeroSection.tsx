'use client'

/**
 * Hero Section - main headline, CTAs, and floating stat cards.
 * GSAP entrance animations + RTL-aware layout.
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export function HeroSection() {
  const t = useTranslations('HomePage.hero')
  const catT = useTranslations('HomePage.categories')
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const CATEGORIES = [
    catT('strength'), catT('fatLoss'), catT('mobility'), catT('hiit'), catT('nutrition'),
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-text]', {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.2,
      })
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.float-card')
        gsap.from(cards, {
          y: 20, opacity: 0, duration: 0.7, stagger: 0.3, ease: 'power3.out', delay: 0.6,
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex items-center overflow-hidden pt-[72px]">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-pf-accent/[0.03] animate-drift blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-pf-energy/[0.02] animate-drift blur-3xl" style={{ animationDelay: '-7s' }} />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-12 py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
          {/* Left — Text */}
          <div>
            <div data-hero-text className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map((cat) => (
                <span key={cat} className="text-caption bg-pf-surface text-pf-muted border border-pf-border px-3.5 py-1.5 rounded-full hover:border-pf-accent hover:text-pf-accent transition-colors cursor-default">
                  {cat}
                </span>
              ))}
            </div>

            <h1 data-hero-text className="text-hero text-pf-text rtl:font-display">
              {t('headline')}<span className="text-pf-accent">.</span>
            </h1>

            <p data-hero-text className="text-lg text-pf-muted mt-5 max-w-[520px] leading-relaxed">
              {t('subheadline')}
            </p>

            <div data-hero-text className="flex flex-wrap items-center gap-4 mt-8">
              <a
                href="#trial"
                className="inline-flex items-center gap-2 bg-pf-accent text-white rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-wide hover:bg-pf-accent-hover hover:scale-[1.03] hover:shadow-float transition-all duration-300 active:scale-[0.98]"
              >
                {t('ctaPrimary')}
                <ArrowRight size={16} className="rtl:rotate-180" />
              </a>
              <a
                href="#programs"
                className="inline-flex items-center gap-2 bg-transparent text-pf-text border border-pf-border rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-wide hover:border-pf-accent hover:text-pf-accent transition-all duration-300"
              >
                {t('ctaSecondary')}
              </a>
            </div>

            <p data-hero-text className="text-caption text-pf-muted/70 mt-6">
              {t('trustLine')}
            </p>
          </div>

          {/* Right — Visual */}
          <div ref={cardsRef} className="relative hidden lg:block">
            <div className="relative aspect-[3/4] max-h-[70vh] rounded-pf-lg overflow-hidden shadow-2xl">
              <img
                src="/images/hero.jpg"
                alt="Athlete in motion"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Card 1 */}
            <div className="float-card absolute -right-4 rtl:-left-4 rtl:right-auto top-8 bg-pf-surface border border-pf-border rounded-pf-md p-4 shadow-glass backdrop-blur-sm" style={{ animation: 'float 4s ease-in-out infinite' }}>
              <div className="text-3xl font-bold text-pf-energy leading-none">+42%</div>
              <div className="text-caption text-pf-muted mt-1">{t('strengthProgress')}</div>
            </div>

            {/* Floating Card 2 */}
            <div className="float-card absolute -left-6 rtl:-right-6 rtl:left-auto bottom-20 bg-pf-surface border border-pf-border rounded-pf-md p-4 shadow-glass backdrop-blur-sm" style={{ animation: 'float 4s ease-in-out infinite', animationDelay: '0.5s' }}>
              <div className="text-3xl font-bold text-pf-accent leading-none">1,800+</div>
              <div className="text-caption text-pf-muted mt-1">{t('activeMembers')}</div>
            </div>

            {/* Floating Card 3 */}
            <div className="float-card absolute -right-2 rtl:-left-2 rtl:right-auto top-1/2 bg-pf-surface border border-pf-border rounded-pf-md p-4 shadow-glass backdrop-blur-sm" style={{ animation: 'float 4s ease-in-out infinite', animationDelay: '1s' }}>
              <div className="text-3xl font-bold text-pf-energy leading-none">4.9/5</div>
              <div className="text-caption text-pf-muted mt-1">{t('coachRating')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-pf-muted/50">
        <span className="text-caption uppercase">SCROLL</span>
        <div className="animate-bounce-gentle">
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-pf-muted/50">
            <path d="M8 4V20M8 20L2 14M8 20L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  )
}
