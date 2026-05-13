'use client'

/**
 * Programs Section component.
 * Showcases different training paths available at PulseFit.
 */

import { useTranslations } from 'next-intl'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ProgramCard } from '@/components/cards/ProgramCard'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export function ProgramsSection() {
  const t = useTranslations('HomePage.programs')
  const commonT = useTranslations('Common')
  const gridRef = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.12 })

  const PROGRAMS = [
    {
      title: t('strength.title'),
      description: t('strength.desc'),
      image: '/images/program-strength.jpg',
      difficulty: commonT('advanced'),
      duration: '45-60 MIN',
    },
    {
      title: t('fatLoss.title'),
      description: t('fatLoss.desc'),
      image: '/images/program-fatloss.jpg',
      difficulty: commonT('intermediate'),
      duration: '50 MIN',
    },
    {
      title: t('hiit.title'),
      description: t('hiit.desc'),
      image: '/images/program-hiit.jpg',
      difficulty: commonT('beginner'),
      duration: '35 MIN',
    },
    {
      title: t('mobility.title'),
      description: t('mobility.desc'),
      image: '/images/program-mobility.jpg',
      difficulty: commonT('beginner'),
      duration: '40 MIN',
    },
  ]

  return (
    <section id="programs" className="space-section bg-pf-bg">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
        <SectionHeader
          eyebrow={t('eyebrow')}
          heading={t('heading')}
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        >
          {PROGRAMS.map((program, i) => (
            <div key={i} data-reveal>
              <ProgramCard {...program} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
