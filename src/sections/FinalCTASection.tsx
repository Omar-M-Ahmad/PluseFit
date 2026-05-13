'use client'

/**
 * Final CTA Section component.
 * A high-conversion section at the bottom of the page to encourage final sign-ups.
 * Uses a bold design and compelling copy.
 */

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function FinalCTASection() {
  const t = useTranslations('HomePage.final')
  const sectionRef = useScrollReveal<HTMLElement>({ y: 30 })

  return (
    <section ref={sectionRef} className="bg-pf-accent py-24 md:py-32 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-[40px] border-white/10" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-white/5" />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center relative z-10">
        <h2 className="text-section text-white max-w-[700px] mx-auto leading-tight">
          {t('heading')}
        </h2>
        <p className="text-xl text-white/80 mt-6 max-w-[600px] mx-auto leading-relaxed">
          {t('subheading')}
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto px-10 py-5 bg-white text-pf-accent rounded-full font-display font-bold text-lg uppercase tracking-wider hover:bg-opacity-90 hover:scale-105 transition-all duration-300 shadow-xl active:scale-95"
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}
