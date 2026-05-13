'use client'

import { useTranslations } from 'next-intl'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { PricingCard } from '@/components/cards/PricingCard'

/**
 * PricingSection Component
 * 
 * Displays the available membership plans in a responsive grid.
 * Highlights the "Plus" plan as the most popular option.
 * 
 * Features:
 * - Internationalization for all plan details, features, and section headers.
 * - Responsive layout (1 column on mobile, 3 columns on desktop).
 * - Scroll reveal animations with stagger effect.
 * 
 * @returns {JSX.Element} The rendered Pricing section.
 */
export function PricingSection() {
  const t = useTranslations('Pricing')
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.12 })

  const planKeys = ['starter', 'plus', 'elite'] as const

  return (
    <section id="pricing" className="space-section">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          centered
        />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 items-start">
          {planKeys.map((key) => {
            const isHighlighted = key === 'plus'
            return (
              <div key={key} data-reveal className={isHighlighted ? 'md:-mt-4' : ''}>
                <PricingCard
                  name={t(`plans.${key}.name`)}
                  price={t(`plans.${key}.price`)}
                  description={t(`plans.${key}.desc`)}
                  features={t.raw(`plans.${key}.features`)}
                  highlighted={isHighlighted}
                  ctaText={t(`plans.${key}.cta`)}
                  period={t('month')}
                  mostPopularLabel={t('mostPopular')}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
