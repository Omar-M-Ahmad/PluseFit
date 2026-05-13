'use client'

import { Layout, Users, TrendingUp, Calendar } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { BenefitCard } from '@/components/cards/BenefitCard'

/**
 * WhyPulseFitSection Component
 * 
 * Highlights the key benefits and unique selling points of PulseFit.
 * Displays a grid of BenefitCard components with icons.
 * 
 * Features:
 * - Full internationalization via next-intl.
 * - Responsive grid layout.
 * - Scroll reveal animations.
 * 
 * @returns {JSX.Element} The rendered WhyPulseFit section.
 */
export function WhyPulseFitSection() {
  const t = useTranslations('WhyPulseFit')
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.1 })

  const benefits = [
    {
      icon: Layout,
      title: t('benefits.smartPlans.title'),
      description: t('benefits.smartPlans.desc'),
    },
    {
      icon: Users,
      title: t('benefits.coachLed.title'),
      description: t('benefits.coachLed.desc'),
    },
    {
      icon: TrendingUp,
      title: t('benefits.tracking.title'),
      description: t('benefits.tracking.desc'),
    },
    {
      icon: Calendar,
      title: t('benefits.flexible.title'),
      description: t('benefits.flexible.desc'),
    },
  ]

  return (
    <section className="bg-pf-surface space-section">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={t('heading')}
        />

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {benefits.map((benefit) => (
            <div key={benefit.title} data-reveal>
              <BenefitCard {...benefit} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
