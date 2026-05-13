'use client'

/**
 * Stats Section component.
 * Displays key business metrics with animated count-up effects.
 */

import { useTranslations } from 'next-intl'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { StatCounter } from '@/components/ui/StatCounter'

export function StatsSection() {
  const t = useTranslations('HomePage.stats')
  const sectionRef = useScrollReveal<HTMLElement>({ y: 30, stagger: 0.1 })

  const STATS = [
    { end: 12, suffix: '+', label: t('coaches') },
    { end: 1800, suffix: '+', label: t('members') },
    { end: 35, suffix: '+', label: t('classes') },
    { end: 94, suffix: '%', label: t('satisfaction') },
  ]

  return (
    <section ref={sectionRef} className="space-section bg-pf-surface/50">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {STATS.map((stat, i) => (
            <div key={i} data-reveal className="relative">
              <StatCounter
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
              />
              {/* Divider visible only on desktop */}
              {i < STATS.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-pf-border rtl:left-0 rtl:right-auto" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
