'use client'

import { useTranslations } from 'next-intl'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { TransformationCard } from '@/components/cards/TransformationCard'

/**
 * TransformationsSection Component
 * 
 * Displays a grid of transformation stories (success stories) from members.
 * Includes an eyebrow, heading, and subtext, followed by a responsive grid
 * of TransformationCard components.
 * 
 * Features:
 * - Internationalization support via next-intl.
 * - Scroll reveal animations for the grid items.
 * - Responsive layout (1 column on mobile, 3 columns on desktop).
 * 
 * @returns {JSX.Element} The rendered Transformations section.
 */
export function TransformationsSection() {
  const t = useTranslations('Transformations')
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.15 })

  // Define keys for the transformations to fetch from i18n
  const transformationKeys = ['alex', 'sarah', 'james'] as const

  return (
    <section id="results" className="space-section">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={t('heading')}
          subtext={t('subtext')}
        />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {transformationKeys.map((key) => (
            <div key={key} data-reveal>
              <TransformationCard
                name={t(`items.${key}.name`)}
                goal={t(`items.${key}.goal`)}
                duration={t(`items.${key}.duration`)}
                metric={t(`items.${key}.metric`)}
                metricLabel={t(`items.${key}.metricLabel`)}
                quote={t(`items.${key}.quote`)}
              />
            </div>
          ))}
        </div>

        <p className="text-caption text-pf-muted/50 text-center mt-8">
          {t('note')}
        </p>
      </div>
    </section>
  )
}
